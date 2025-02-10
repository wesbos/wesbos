import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs/promises';
import PQueue from 'p-queue';
import { createInterface } from 'readline';
import chalk from 'chalk';

// Set this to false to automatically accept all prompts
const PROMPT = false;

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = async (query: string): Promise<string> => {
  if (!PROMPT) {
    // Log what we're auto-accepting
    console.log(`${chalk.dim(query)}${chalk.green('y')} ${chalk.dim('(auto-accepted)')}`);
    return 'y';
  }
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

interface SavingsLog {
  file: string;
  originalSize: number;
  newSize: number;
  format: string;
  savings: number;
}

interface CompressionResult {
  format: string;
  size: number;
  buffer: Buffer;
}

async function updateImageReferences(oldPath: string, newPath: string): Promise<void> {
  const oldRelativePath = path.relative(process.cwd(), oldPath);
  const newRelativePath = path.relative(process.cwd(), newPath);

  // Find all files that might contain references to the image
  const filesToSearch = await glob('**/*.{ts,tsx,js,jsx,md,mdx,html,css,scss}', {
    ignore: ['node_modules/**', 'dist/**', '.git/**', '.*/**'],
    absolute: true
  });

  for (const file of filesToSearch) {
    try {
      const content = await fs.readFile(file, 'utf8');
      // Check for both relative and absolute paths
      const oldBasename = path.basename(oldPath);
      const hasReference = content.includes(oldRelativePath) ||
                         content.includes(oldBasename) ||
                         content.includes(`image: ${oldBasename}`) ||
                         content.includes(`./${oldBasename}`) ||
                         content.includes(`/${oldBasename}`);

      if (hasReference) {
        const relativeFile = path.relative(process.cwd(), file);
        console.log(`${chalk.blue('Found')} reference in ${chalk.cyan(relativeFile)}`);
        const answer = await askQuestion(`Update reference in ${relativeFile}? (y/n): `);

        if (answer.toLowerCase() === 'y') {
          // Replace both relative paths and just filenames
          const newContent = content
            .replace(new RegExp(oldRelativePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newRelativePath)
            .replace(new RegExp(path.basename(oldPath).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), path.basename(newPath));

          await fs.writeFile(file, newContent);
          console.log(`${chalk.green('✓')} Updated references in ${chalk.cyan(relativeFile)}`);
        }
      }
    } catch (error) {
      console.error(`${chalk.red('Error')} processing ${chalk.cyan(file)}:`, error);
    }
  }
}

async function processImage(inputPath: string, savingsLog: SavingsLog[]): Promise<void> {
  const relativeInputPath = path.relative(process.cwd(), inputPath);
  console.log(`${chalk.blue('Processing')} ${chalk.cyan(relativeInputPath)}...`);
  const originalSize = (await fs.stat(inputPath)).size;
  const image = sharp(inputPath);
  const originalMetadata = await image.metadata();

  const compressionOptions = [
    { format: 'jpeg', quality: 75 },
    { format: 'webp', quality: 75 },
    { format: 'png', compressionLevel: 9 }
  ];

  const results: CompressionResult[] = [];

  for (const option of compressionOptions) {
    try {
      let processedImage = image.clone();

      if (option.format === 'jpeg') {
        processedImage = processedImage.jpeg({ quality: option.quality });
      } else if (option.format === 'webp') {
        processedImage = processedImage.webp({ quality: option.quality });
      } else if (option.format === 'png') {
        processedImage = processedImage.png({ compressionLevel: option.compressionLevel });
      }

      const buffer = await processedImage.toBuffer();
      results.push({
        format: option.format,
        size: buffer.length,
        buffer
      });
    } catch (error) {
      console.error(`Error processing ${inputPath} to ${option.format}:`, error);
    }
  }

  // Find the smallest file
  const bestResult = results.reduce((prev, current) =>
    current.size < prev.size ? current : prev
  );

  if (bestResult.size < originalSize) {
    const savings = ((originalSize - bestResult.size) / originalSize * 100).toFixed(2);
    const newPath = path.join(
      path.dirname(inputPath),
      `${path.basename(inputPath, path.extname(inputPath))}.${bestResult.format}`
    );

    const answer = await askQuestion(
      `${chalk.green('Found')} smaller version of ${chalk.cyan(relativeInputPath)}:\n` +
      `Original: ${chalk.yellow((originalSize / 1024).toFixed(2))}KB\n` +
      `New (${chalk.blue(bestResult.format)}): ${chalk.green((bestResult.size / 1024).toFixed(2))}KB\n` +
      `${chalk.green('Savings')}: ${chalk.yellow(savings)}%\n` +
      `Save as ${path.relative(process.cwd(), newPath)}? (y/n): `
    );

    if (answer.toLowerCase() === 'y') {
      await fs.writeFile(newPath, bestResult.buffer);
      
      // Verify the file was written correctly
      try {
        const writtenFile = await fs.readFile(newPath);
        if (!writtenFile.equals(bestResult.buffer)) {
          throw new Error('File verification failed - content mismatch');
        }
      } catch (error) {
        console.error(`${chalk.red('Error')} Failed to verify written file: ${error.message}`);
        await fs.unlink(newPath).catch(() => {});
        return;
      }
      
      const relativeNewPath = path.relative(process.cwd(), newPath);
      console.log(`${chalk.green('✓')} Saved ${chalk.cyan(relativeNewPath)}`);

      // Log the savings
      savingsLog.push({
        file: relativeNewPath,
        originalSize,
        newSize: bestResult.size,
        format: bestResult.format,
        savings: parseFloat(savings)
      });

      // Update references in codebase
      const updateRefs = await askQuestion('Would you like to update references to this image in the codebase? (y/n): ');
      if (updateRefs.toLowerCase() === 'y') {
        await updateImageReferences(inputPath, newPath);
      }

      // Delete original file
      const deleteOriginal = await askQuestion(`Delete original file ${chalk.cyan(relativeInputPath)}? (y/n): `);
      if (deleteOriginal.toLowerCase() === 'y') {
        try {
          await fs.unlink(inputPath);
          console.log(`${chalk.green('✓')} Deleted ${chalk.cyan(relativeInputPath)}`);
        } catch (error) {
          console.error(`${chalk.red('Error')} Failed to delete ${chalk.cyan(relativeInputPath)}: ${error.message}`);
        }
      }
    }
  } else {
    console.log(`${chalk.yellow('ℹ')} No smaller version found for ${chalk.cyan(relativeInputPath)}`);
  }
}

function formatBytes(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)}${units[unitIndex]}`;
}

function logSavingsSummary(savings: SavingsLog[]): void {
  if (savings.length === 0) {
    console.log(chalk.yellow('\nNo images were compressed.'));
    return;
  }

  const totalOriginal = savings.reduce((sum, item) => sum + item.originalSize, 0);
  const totalNew = savings.reduce((sum, item) => sum + item.newSize, 0);
  const totalSavings = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(2);

  console.log(chalk.blue('\n📊 Compression Summary:'));
  console.log(chalk.dim('─'.repeat(50)));

  savings.forEach(item => {
    console.log(
      `${chalk.cyan(item.file)}:\n` +
      `  ${chalk.dim('→')} ${chalk.yellow(formatBytes(item.originalSize))} → ${chalk.green(formatBytes(item.newSize))} ` +
      `(${chalk.blue(item.format)}) ${chalk.yellow(item.savings.toFixed(2))}% saved`
    );
  });

  console.log(chalk.dim('─'.repeat(50)));
  console.log(
    `${chalk.blue('Total Savings:')}\n` +
    `${chalk.yellow(formatBytes(totalOriginal))} → ${chalk.green(formatBytes(totalNew))}\n` +
    `${chalk.blue('Overall Reduction:')} ${chalk.yellow(totalSavings)}%\n` +
    `${chalk.blue('Files Compressed:')} ${chalk.yellow(savings.length)}`
  );
}

async function main() {
  const directory = process.argv[2];
  if (!directory) {
    console.error(chalk.red('Please provide a directory path'));
    process.exit(1);
  }

  const savingsLog: SavingsLog[] = [];
  const queue = new PQueue({ concurrency: 4 }); // Process 4 images at a time
  const files = await glob('**/*.{jpg,jpeg,png,webp}', {
    cwd: directory,
    absolute: true,
    nodir: true,
    ignore: ['node_modules/**', '.*/**']
  });

  console.log(`${chalk.blue('Found')} ${chalk.yellow(files.length)} images to process`);

  try {
    await Promise.all(
      files.map(file => queue.add(() => processImage(file, savingsLog)))
    );

    // Log the summary
    logSavingsSummary(savingsLog);
  } finally {
    rl.close();
  }
}

main().catch(console.error);

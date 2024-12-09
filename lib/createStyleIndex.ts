'use server';

// This is a function that creates a file with every .module.css file imported into it.
// I do this so that Next.js knows about all the css files in the project, and the auto-imports work.
import watch from 'glob-watcher';
import fg from 'fast-glob';
import path from 'path';
import { writeFile } from 'fs/promises';

const outputFile = path.resolve('./styles/styleIndex.ts');
const outputDir = path.dirname(outputFile);
const globs = ['./styles/**/*.module.css', './app/**/*.module.css', './components/**/*.module.css'];
const watcher = watch(globs, {
  ignoreInitial: true,
});

export async function cssModuleIndexMaker() {
  await generateStyleIndex();
  watcher.on('add', (filePath) => {
    generateStyleIndex();
  });
}

async function generateStyleIndex() {
  const files = await fg(globs);
  const importStatements = files.map((file, index) => {
    const relativePath = path.relative(outputDir, file);
    return `import z_${index}_ from '${relativePath.startsWith('.') ? '' : './'}${relativePath}';`;
  });
  const styleIndex = `${importStatements.join('\n')}`;
  await writeFile(outputFile, styleIndex);
  console.log('Style index generated');
}

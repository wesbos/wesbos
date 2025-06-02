'use server';

import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';
// This is a function that creates a file with every .module.css file imported into it.
// I do this so that Next.js knows about all the css files in the project, and the auto-imports work.
import watch from 'glob-watcher';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputFile = path.resolve(__dirname, '../styles/styleIndex.ts');
const outputDir = path.dirname(outputFile);
const globs = ['./src/styles/**/*.module.css', './components/**/*.module.css'];

export async function watchForStyleChanges() {
  await generateStyleIndex(); // Generate the initial style index

  const watcher = watch(globs, {
    ignoreInitial: true,
  });

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
  console.log(`🎉 Style index generated. Wrote ${files.length} file imports to ${outputFile}`);
}

generateStyleIndex(); // run on import

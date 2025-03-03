// https://raw.githubusercontent.com/hadeeb/vite-plugin-wasm/refs/heads/main/wasm-plugin.js
// @ts-check
import * as path from 'path';
import * as fs from 'fs';

/**
 * Vite plugin to import `.wasm` file as a `WebAssembly.Module`
 * @param {Object} options
 * @param {"cloudflare"|"vercel"} [options.target]
 * @returns {import("vite").Plugin}
 */
export default function wasmEdgeModule({ target = 'cloudflare' } = {}) {
  const postfix = '.wasm?module';
  let isDev = false;

  return {
    name: 'vite:wasm-helper',
    enforce: 'pre',
    configResolved(config) {
      console.log(`CONFIG`, config);
      isDev = config.command === 'serve';
    },
    config(config, env) {
      return { build: { rollupOptions: { external: /.+\.wasm$/i } } };
    },
    renderChunk(code, chunk, opts) {
      if (isDev) return;
      if (!/__WASM_ASSET__/g.test(code)) return;

      const regex = /__WASM_ASSET__/g;
      let match;
      const importPostfix = target === 'vercel' ? '?module' : '';

      const final = code.replaceAll(/__WASM_ASSET__([a-z\d]+)\.wasm/gi, (s, assetId) => {
        const fileName = this.getFileName(assetId);
        const relativePath = path.relative(path.dirname(chunk.fileName), fileName);
        console.log(`GOING TO REPLACE WASM ASSET`, `./${relativePath}${importPostfix}`);
        return `./${relativePath}${importPostfix}`;
      });

      return { code: final };
    },
    load(id, opts) {
      if (!id.endsWith(postfix)) {
        return;
      }

      const filePath = id.slice(0, -1 * '?module'.length);

      if (isDev) {
        return `
        import fs from "fs"

        const wasmModule= new WebAssembly.Module(fs.readFileSync("${filePath}"));
        export default wasmModule;
        `;
      }

      const name = path.basename(filePath);

      const assetId = this.emitFile({
        type: 'asset',
        name,
        source: fs.readFileSync(filePath),
      });

      console.log(`EMITTED FILE`, { name, assetId, filePath });

      return `
      import init from "__WASM_ASSET__${assetId}.wasm"
      export default init
      `;
    },
  };
}

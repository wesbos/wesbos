import assert from 'node:assert';
import * as fs from "node:fs";
import * as path from "node:path";
import MagicString from "magic-string";
import { normalizePath, Plugin } from 'vite'

// https://github.com/cloudflare/workers-sdk/blob/main/packages/vite-plugin-cloudflare/src/index.ts
// Plugin to support `CompiledWasm` modules
const ROUTER_WORKER_NAME = "__router-worker__";
const ASSET_WORKER_NAME = "__asset-worker__";
const ASSET_WORKERS_COMPATIBILITY_DATE = "2024-10-04";
// TODO: add `Text` and `Data` types (resolves https://github.com/cloudflare/workers-sdk/issues/8022)
const MODULE_TYPES = ["CompiledWasm"] as const;
type ModuleType = (typeof MODULE_TYPES)[number];
export const MODULE_PATTERN = `__CLOUDFLARE_MODULE__(${MODULE_TYPES.join("|")})__(.*?)__`;

function createModuleReference(type: ModuleType, id: string) {
  return `__CLOUDFLARE_MODULE__${type}__${id}__`;
}

export function cloudflareWasm(pluginConfig: PluginConfig = {}): Plugin {
  return {
    name: "vite-plugin-cloudflare:modules",
    // We set `enforce: "pre"` so that this plugin runs before the Vite core plugins.
    // Otherwise the `vite:wasm-fallback` plugin prevents the `.wasm` extension being used for module imports.
    enforce: "pre",
    applyToEnvironment(environment) {
      // Note that this hook does not get called in preview mode.
      // return getWorkerConfig(environment.name) !== undefined;
      return true;
    },
    async resolveId(source, importer) {
      if (!source.endsWith(".wasm")) {
        return;
      }
      console.log(`source!!!!`, source);
      const resolved = await this.resolve(source, importer);
      assert(
        resolved,
        `Unexpected error: could not resolve Wasm module ${source}`
      );

      return {
        external: true,
        id: createModuleReference("CompiledWasm", resolved.id),
      };
    },
    renderChunk(code, chunk) {
      const moduleRE = new RegExp(MODULE_PATTERN, "g");
      let match: RegExpExecArray | null;
      let magicString: MagicString | undefined;

      while ((match = moduleRE.exec(code))) {
        magicString ??= new MagicString(code);
        const [full, moduleType, modulePath] = match;

        assert(
          modulePath,
          `Unexpected error: module path not found in reference ${full}.`
        );

        let source: Buffer;

        try {
          source = fs.readFileSync(modulePath);
        } catch (error) {
          throw new Error(
            `Import ${modulePath} not found. Does the file exist?`
          );
        }

        const referenceId = this.emitFile({
          type: "asset",
          name: path.basename(modulePath),
          originalFileName: modulePath,
          source,
        });

        const emittedFileName = this.getFileName(referenceId);
        const relativePath = normalizePath(
          path.relative(path.dirname(chunk.fileName), emittedFileName)
        );
        const importPath = relativePath.startsWith(".")
          ? relativePath
          : `./${relativePath}`;

        magicString.update(
          match.index,
          match.index + full.length,
          importPath
        );
      }

      if (magicString) {
        return {
          code: magicString.toString(),
          map: this.environment.config.build.sourcemap
            ? magicString.generateMap({ hires: "boundary" })
            : null,
        };
      }
    },
  }
}

// Forked from https://github.com/andrelandgraf/openimg/blob/main/packages/core/src/vite.ts
import type { Plugin } from "vite";
import { readFileSync } from "node:fs";
import { imageSizeFromFile } from "image-size/fromFile";

export function imgDimensions(): Plugin {
  return {
    name: "vite-plugin-img-dimensions",
    enforce: "pre",
    async load(importStr) {
      const [path, search] = importStr.split("?");
      if (!search || !path) {
        return null;
      }
      if (search !== "meta") {
        return null;
      }
      const formats = ["png", "jpg", "jpeg", "webp", "avif"];
      if (!formats.some((format) => path.endsWith(`.${format}`))) {
        // ignore files that are not images
        return null;
      }
      const { width, height } = imageSizeFromFile(path);

      return `import src from '${path}?url';
export default {
src,
width: ${width},
height: ${height}
}
`;
    },
  };
}

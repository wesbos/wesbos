import { headingRank as rank } from 'hast-util-heading-rank';
import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';
import { name as isIdentifierName } from 'estree-util-is-identifier-name'
import { valueToEstree } from 'estree-util-value-to-estree'


// MDX script to convert the TOC to an export on the MDX file
export function rehypeWesBosMdx({ name = 'wesbos' } = {}) {
  if (!isIdentifierName(name)) {
    throw new Error(
      `The name should be a valid identifier name, got: ${JSON.stringify(
        name,
      )}`,
    )
  }

  return function transformer(tree, vfile) {
    console.dir(tree, { depth: null });
    // visit(tree, 'element', onHeading);
    vfile.data.wesbos = 'TEST wesbos rehype plugin';
    tree.children.unshift({
      type: 'mdxjsEsm',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ExportNamedDeclaration',
              source: null,
              specifiers: [],
              declaration: {
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name },
                    init: valueToEstree(vfile.data.wesbos),
                  },
                ],
              },
            },
          ],
        },
      },
    })
  }
}

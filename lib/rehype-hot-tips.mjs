import { name as isIdentifierName } from 'estree-util-is-identifier-name';
import { headingRank } from 'hast-util-heading-rank';
import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';
import { EXIT, visitParents } from 'unist-util-visit-parents';
import { toJs } from 'estree-util-to-js';

export const rehypeMdxTitle = ({ maxRank = 1, name = 'title' } = {}) => {
  if (!isIdentifierName(name)) {
    throw new Error(`The name should be a valid identifier name, got: ${JSON.stringify(name)}`, {
      cause: name,
    });
  }

  return (ast) => {
    let heading;
    let bestRank = maxRank + 1;

    visitParents(ast, 'element', (node) => {
      const rank = headingRank(node);
      if (rank && rank < bestRank) {
        bestRank = rank;
        heading = node;
      }

      if (rank === 1) {
        return EXIT;
      }
    });

    if (heading) {
      ast.children.unshift({
        type: 'mdxjsEsm',
        value: '',
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
                      init: { type: 'Literal', value: toString(heading) },
                    },
                  ],
                },
              },
            ],
          },
        },
      });
    }
  };
};

/**
 * This plugin will extract links to twitter, tiktok, youtube, etc and provide them as exports in the mdx file
 */
export const rehypeHotTips = ({ maxRank = 1 } = {}) => {
  return (ast) => {
    let links = ['https://twitter.com/wesbos/status/1187745700320337920'];
    visit(ast, (node, index, parent) => {
      if (node.tagName === 'a' && node.properties.href) {
        links.push(node.properties.href);
      }
      // This is some unholy hack to get the frontmatter into an object, so I can export the image or images frontmatter data from the mdx file. Don't do this - use exports instead.
      if (node.type === 'mdxjsEsm' && node.data.estree.body.at(0).type === 'ExportNamedDeclaration') {
        const declarationName = node.data.estree.body.at(0).declaration.declarations.at(0).id.name;
        if (declarationName === 'frontmatter') {
          // convert the estree to a string, remove the export const frontmatter =, and parse the json
          const obj = toJs(node.data.estree).value.replace('export const frontmatter = ', '').replaceAll('\n', '').replace(/;$/gm, '').trim();
          try {
            const frontmatter = JSON.parse(obj);
            const images = [...(frontmatter.image ? [frontmatter.image] : []), ...(frontmatter.images?.length ? frontmatter.images : [])].map((image) => {
              // Some of the images dont have a leading ./ as they should.
              if (!image.startsWith('./')) {
                return `./${image}`;
              }
              return image;
            });
            if (!images.length) return;

            // Import the images image0, image1, image2, etc.
            // This adds something like 'import image0 from "image0"' to the mdx file
            const imports = images.map((image, index) => {
              return {
                // type: 'ExportNamedDeclaration',
                type: 'ImportDeclaration',
                source: { type: 'Literal', value: `"${image}"`, raw: `"${image}"` },
                specifiers: [
                  {
                    // type: 'ExportSpecifier',
                    type: 'ImportDefaultSpecifier',
                    local: { type: 'Identifier', name: `image${index}` },
                    exported: { type: 'Identifier', name: `image${index}` },
                  },
                ],
              };
            });
            // then Export an array of the images
            // This adds something like 'export const images = [image0, image1, image2, etc]' to the mdx file
            const exports = {
              type: 'ExportNamedDeclaration',
              source: null,
              specifiers: [],
              declaration: {
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: 'images' },
                    init: {
                      type: 'ArrayExpression',
                      elements: images.map((image, index) => { return { type: 'Literal', value: `image${index}`, raw: `image${index}` } })
                    },
                  },
                ],
              },
            };

            if (imports.length) {
              ast.children.unshift({
                type: 'mdxjsEsm',
                value: '',
                data: {
                  estree: {
                    type: 'Program',
                    sourceType: 'module',
                    body: [...imports, exports],
                  },
                },
              });
            }
            return false; // Stop the visit
          } catch (e) {
            console.log(`Error parsing frontmatter: ${obj}`);
          }
        }
      }
    });

    ast.children.unshift({
      type: 'mdxjsEsm',
      value: '',
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
                    id: { type: 'Identifier', name: 'foundLinks' },
                    init: { type: 'Literal', value: links },
                  },
                ],
              },
            },
          ],
        },
      },
    });
  };
};

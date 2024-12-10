import { headingRank as rank } from 'hast-util-heading-rank';
import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';
import { name as isIdentifierName } from 'estree-util-is-identifier-name'
import { valueToEstree } from 'estree-util-value-to-estree'


// MDX script to convert the TOC to an export on the MDX file
export function mdxToc({ name = 'tableOfContents' } = {}) {
  if (!isIdentifierName(name)) {
    throw new Error(
      `The name should be a valid identifier name, got: ${JSON.stringify(
        name,
      )}`,
    )
  }

  return function transformer(tree, vfile) {
    if (vfile.data.toc == null) {
      return;
    }
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
                    init: valueToEstree(vfile.data.toc),
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

// Rehype plugin to create a table of contents
export function tocAttacher() {
  return function transformer(tree, vfile) {
    const headings = []

    visit(tree, 'element', onHeading)

    vfile.data.toc = createTree(headings) || []

    function onHeading(node) {
      const level = rank(node)

      if (level != null) {
        const heading = {
          depth: level,
          value: toString(node),
        }
        if (node.properties !== undefined && node.properties.id != null) {
          heading.id = node.properties.id
        }
        headings.push(heading)
      }
    }

    function createTree(headings) {
      const root = { depth: 0, children: [] }
      const parents = []
      let previous = root

      headings.forEach((heading) => {
        if (heading.depth > previous.depth) {
          if (previous.children === undefined) {
            previous.children = []
          }
          parents.push(previous)
        } else if (heading.depth < previous.depth) {
          while (parents[parents.length - 1].depth >= heading.depth) {
            parents.pop()
          }
        }

        parents[parents.length - 1].children.push(heading)
        previous = heading
      })

      return root.children
    }
  }
}

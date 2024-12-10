import { headingRank as rank } from 'hast-util-heading-rank';
import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';
import { name as isIdentifierName } from 'estree-util-is-identifier-name'
import { valueToEstree } from 'estree-util-value-to-estree'
import { createVisitors } from 'estree-util-scope';
import path from 'path';
// import { walk} from 'estree-walker';

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
    // // console.dir(tree, { depth: null });
    // const visitors = createVisitors();

    // walk(tree, {
    //   enter(node, parent, prop, index) {
    //     visitors.enter(node);
    //     console.info(node.type, { node, parent, prop, index });
    //     if (node.type === 'mdxjsEsm' || node.type === 'Identifier') {
    //       console.info('mdxjsEsm or Identifier', { node, parent, prop, index });
    //       // this.skip();
    //       // visitors.exit(node); // Call the exit handler manually.
    //     }
    //   },
    //   leave: visitors.exit,
    // });

    // console.log(visitors.scopes.at(-1));

    /*
    I need to get the frontmatter and then check if the slug + other properties are set.
    declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: 'frontmatter' },
    */
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
                  {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: 'filePath' },
                    init: valueToEstree(path.relative(process.cwd(), vfile.path)),
                  },
                ],
              },
            },
          ],
        },
      },
    });
  }
}

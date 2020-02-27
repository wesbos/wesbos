const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

async function makePostsFromMdx({ graphql, actions }) {
  const blogPost = path.resolve('./src/templates/post.js');
  const { errors, data } = await graphql(
    `
      {
        allMdx(filter: { fields: { collection: { eq: "post" } } }) {
          edges {
            node {
              fields {
                slug
              }
              body
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );
  if (errors) {
    throw new Error('There was an error');
  }
  const posts = data.allMdx.edges;
  posts.forEach(post => {
    actions.createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
      },
    });
  });
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  await makePostsFromMdx({ graphql, actions });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    // if my posts have a slug in the frontmatter, it means I've specified what I want it to be. Otherwise I want to create one automatically

    // This is where we add our own custom fields to each node
    const generatedSlug = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value: node.frontmatter.slug
        ? `/${node.frontmatter.slug}/`
        : generatedSlug,
    });

    // Add it to a collection
    createNodeField({
      name: `collection`,
      node,
      value: getNode(node.parent).sourceInstanceName,
    });
  }
};

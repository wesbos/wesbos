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
    console.log('errors');
    throw new Error('There was an error');
  }
  const posts = data.allMdx.edges;
  posts.forEach(post => {
    // console.log(`Post:`, post.node.fields.slug);
    actions.createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
      },
    });
  });
}

async function makeTipsFromMdx({ graphql, actions }) {
  const tipTemplate = path.resolve('./src/templates/tip.js');
  const { errors, data } = await graphql(
    `
      {
        allMdx(filter: { fields: { collection: { eq: "tip" } } }) {
          edges {
            node {
              fields {
                slug
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
  const tips = data.allMdx.edges;
  tips.forEach(tip => {
    // console.log(`Tip:`, tip.node.fields.slug);
    actions.createPage({
      path: `/tip${tip.node.fields.slug}`,
      component: tipTemplate,
      context: {
        slug: tip.node.fields.slug,
      },
    });
  });
}

async function paginate({ graphql, actions, collection }) {
  const tipsPage = path.resolve('./src/pages/tips.js');
  const { errors, data } = await graphql(
    `
      {
        allMdx(filter: { fields: { collection: { eq: "${collection}" } } }) {
          totalCount
        }
      }
    `
  );

  const { totalCount } = data.allMdx;
  const pages = Math.ceil(totalCount / 10);

  Array.from({ length: pages }).forEach((_, i) => {
    // for each page, use the createPages api to dynamically create that page
    actions.createPage({
      path: `/tips/${i + 1}`,
      component: tipsPage,
      context: {
        skip: i * 10,
        currentPage: i + 1,
      },
    });
  });
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  await Promise.all([
    makePostsFromMdx({ graphql, actions }),
    makeTipsFromMdx({ graphql, actions }),
    paginate({ graphql, actions, collection: 'tip' }),
  ]);
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

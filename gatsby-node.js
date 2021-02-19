require('dotenv').config();
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

// This surfaces backend env variables to the front end by prefixing them with GATSBY_
process.env.GATSBY_DEPLOY_PRIME_URL = process.env.DEPLOY_PRIME_URL;
process.env.GATSBY_URL = process.env.URL;
process.env.GATSBY_COMMIT_REF = process.env.COMMIT_REF;
process.env.GATSBY_REPOSITORY_URL = process.env.REPOSITORY_URL;
process.env.GATSBY_DEPLOY_URL = process.env.DEPLOY_URL;
process.env.GATSBY_CONTEXT = process.env.CONTEXT;

async function makePostsFromMdx({ graphql, actions }) {
  const blogPost = path.resolve('./src/templates/post.js');
  const { errors, data } = await graphql(
    `
      {
        allMdx(
          filter: { fields: { collection: { eq: "post" } } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              body
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
    console.log(errors);
    throw new Error('There was an error');
  }
  const posts = data.allMdx.edges;
  posts.forEach((post, i) => {
    const prev = posts[i - 1];
    const next = posts[i + 1];
    actions.createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        collection: 'post',
        prev,
        next,
        pathPrefix: '',
      },
    });
  });
}

async function makeTipsFromMdx({ graphql, actions }) {
  const tipTemplate = path.resolve('./src/templates/tip.js');
  const { errors, data } = await graphql(
    `
      {
        allMdx(
          filter: { fields: { collection: { eq: "tip" } } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              body
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
    console.log(errors);
    throw new Error('There was an error');
  }
  const tips = data.allMdx.edges;
  tips.forEach((tip, i) => {
    // figure out if there is a prev and next tip
    const prev = tips[i - 1];
    const next = tips[i + 1];
    actions.createPage({
      path: `/tip${tip.node.fields.slug}`,
      component: tipTemplate,
      context: {
        slug: tip.node.fields.slug,
        prev,
        collection: 'tip',
        next,
        pathPrefix: '/tip',
      },
    });
  });
}

async function paginate({
  graphql,
  actions,
  collection,
  pathPrefix,
  component,
}) {
  const { errors, data } = await graphql(
    `
      {
        allMdx(filter: { fields: { collection: { eq: "${collection}" } } }) {
          totalCount
        }
      }
    `
  );
  if (errors) {
    console.log(errors);
    throw new Error('There was an error');
  }
  const { totalCount } = data.allMdx;
  const pages = Math.ceil(totalCount / 10);

  Array.from({ length: pages }).forEach((_, i) => {
    // for each page, use the createPages api to dynamically create that page
    actions.createPage({
      path: `${pathPrefix}${i + 1}`,
      component,
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
    paginate({
      graphql,
      actions,
      collection: 'tip',
      pathPrefix: '/tips/',
      component: path.resolve('./src/pages/tips.js'),
    }),
    paginate({
      graphql,
      actions,
      collection: 'post',
      pathPrefix: '/blog/',
      component: path.resolve('./src/pages/blog.js'),
    }),
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

exports.onCreatePage = async ({ page, actions, loadNodeContent, ...rest }) => {
  const { createPage } = actions;
  if (page.path.match(/merch/)) {
    page.context.layoutClasses = 'wiiiiiiiiiide';
  }
  if (page.path.match(/thumbnail/)) {
    page.context.layout = 'thumbnail';
    createPage(page);
  }
};

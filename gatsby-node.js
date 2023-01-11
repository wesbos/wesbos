require('dotenv').config({ path: './.env.development' });
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

// This surfaces backend env variables to the front end by prefixing them with GATSBY_
process.env.GATSBY_DEPLOY_PRIME_URL = process.env.DEPLOY_PRIME_URL;
process.env.GATSBY_URL = process.env.URL;
process.env.GATSBY_COMMIT_REF = process.env.COMMIT_REF;
process.env.GATSBY_REPOSITORY_URL = process.env.REPOSITORY_URL;
process.env.GATSBY_DEPLOY_URL = process.env.DEPLOY_URL;
process.env.GATSBY_CONTEXT = process.env.CONTEXT;

// We don't want to pass the entire blog post because this can be really big, but something we need to for the tips. So this passes only the data required in ContentNav.js
function getOnlyTheDataWeNeed(node) {
  return node;
  // TODO fix this
  // possible there is no next/prev
  if (!node) {
    return;
  }
  // possible we have the title we need
  if (node.frontmatter) {
    return {
      node: {
        fields: {
          slug: node.fields.slug,
        },
        frontmatter: {
          title: node.frontmatter.title,
        },
      },
    };
  }
  // otherwise we need the body (usually a tip)
  return {
    body: node.body,
  };
  /* eslint-enable no-unreachable */
}

async function makePostsFromMdx({ graphql, actions }) {
  const blogPost = path.resolve('./src/templates/post.js');
  const { errors, data } = await graphql(/* GraphQL */ `
    {
      allMdx(filter: { fields: { collection: { eq: "post" } } }, sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            body
            fields {
              slug
            }
            frontmatter {
              title
            }
            parent {
              ... on File {
                absolutePath
              }
            }
          }
        }
      }
    }
  `);
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
      component: `${blogPost}?__contentFilePath=${post.node.parent.absolutePath}`,
      context: {
        slug: post.node.fields.slug,
        collection: 'post',
        prev: getOnlyTheDataWeNeed(prev),
        next: getOnlyTheDataWeNeed(next),
        pathPrefix: '',
      },
    });
  });
}

async function makeTipsFromMdx({ graphql, actions }) {
  const tipTemplate = path.resolve('./src/templates/tip.js');
  const { errors, data } = await graphql(/* graphql */ `
    {
      allMdx(filter: { fields: { collection: { eq: "tip" } } }, sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            body
            fields {
              slug
            }
            parent {
              ... on File {
                absolutePath
              }
            }
          }
        }
      }
    }
  `);
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
      component: `${tipTemplate}?__contentFilePath=${tip.node.parent.absolutePath}`,
      context: {
        slug: tip.node.fields.slug,
        prev: getOnlyTheDataWeNeed(prev),
        collection: 'tip',
        next: getOnlyTheDataWeNeed(next),
        pathPrefix: '/tip',
      },
    });
  });
}

async function makeJavaScriptFromMdx({ graphql, actions }) {
  const javascriptPage = path.resolve('./src/templates/javascript.js');
  const { errors, data } = await graphql(/* GraphQL */ `
    {
      allMdx(filter: { fields: { collection: { eq: "javascript" } } }, sort: { frontmatter: { tocTitle: ASC } }) {
        edges {
          node {
            body
            fields {
              slug
            }
            frontmatter {
              title
            }
            parent {
              ... on File {
                absolutePath
              }
            }
          }
        }
      }
    }
  `);
  if (errors) {
    console.log(errors);
    throw new Error('There was an error');
  }
  const javascriptPosts = data.allMdx.edges;

  javascriptPosts.forEach((post, i) => {
    const prev = javascriptPosts[i - 1];
    const next = javascriptPosts[i + 1];

    actions.createPage({
      path: `/javascript${post.node.fields.slug}`,
      component: `${javascriptPage}?__contentFilePath=${post.node.parent.absolutePath}`,
      context: {
        slug: post.node.fields.slug,
        collection: 'javascript',
        prev: getOnlyTheDataWeNeed(prev),
        next: getOnlyTheDataWeNeed(next),
        pathPrefix: '/javascript',
      },
    });
  });
}

async function paginate({ graphql, actions, collection, pathPrefix, component }) {
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
  await Promise.all([
    makePostsFromMdx({ graphql, actions }),
    makeTipsFromMdx({ graphql, actions }),
    makeJavaScriptFromMdx({ graphql, actions }),
    paginate({
      graphql,
      actions,
      collection: 'javascript',
      pathPrefix: '/javascript/',
      component: path.resolve('./src/pages/javascript.js'),
    }),
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
      value: node.frontmatter.slug ? `/${node.frontmatter.slug}/` : generatedSlug,
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

  if (page.path.match(/javascript/)) {
    page.context.layoutClasses = 'ultra-wide';
  }

  if (page.path.match(/thumbnail/)) {
    page.context.layout = 'thumbnail';
    createPage(page);
  }
};

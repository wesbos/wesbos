exports.handler = async (event, context) => ({
  statusCode: 200,
  body: JSON.stringify({
    NETLIFY: process.env.NETLIFY,
    BUILD_ID: process.env.BUILD_ID,
    CONTEXT: process.env.GATSBY_CONTEXT,
    NODE_VERSION: process.env.NODE_VERSION,
    URL: process.env.URL,
    DEPLOY_URL: process.env.DEPLOY_URL,
  }),
});

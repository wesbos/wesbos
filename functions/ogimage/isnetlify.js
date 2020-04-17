exports.handler = async (event, context) => ({
  statusCode: 200,
  body: process.env.NETLIFY,
  isBase64Encoded: true,
});

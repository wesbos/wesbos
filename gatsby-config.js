const prism = require('@mapbox/rehype-prism')
const mdxFeed = require("gatsby-mdx/feed");


module.exports = {
  siteMetadata: {
    title: 'Wes Bos',
    author: 'Wes Bos',
    description: 'The Personal Website of Wes Bos',
    siteUrl: 'https://wesbos.com',
  },
  // ??? what is this
  pathPrefix: '/gatsby-starter-blog',

  // Plugins are run concurrently so order does not matter
  plugins: [
    {
      // This tells us where the plugin lives
      // this one is in our node_modules
      resolve: `gatsby-source-filesystem`,
      // these are plugin-specific options - see docs for each plugin if you want to know what the options are
      options: {
        path: `${__dirname}/src/pages`,
        name: 'page',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: 'post',
      },
    },
    {
      resolve: 'gatsby-mdx',
      options: {
        root: __dirname,
        hastPlugins: [[prism, { ignoreMissing: true }]],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `TODO ADD YOUR TRACKING ID HERE`,
      },
    },
    // RSS Feed
    {
      resolve: `gatsby-plugin-feed`,
      options: mdxFeed
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
}

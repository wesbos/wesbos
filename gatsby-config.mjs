import { config } from 'dotenv';
import remarkVSCode from 'gatsby-remark-vscode';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const { remarkPlugin } = remarkVSCode;

config({ path: `.env.development` });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  flags: {
    FAST_DEV: true,
  },
  trailingSlash: 'never',
  siteMetadata: {
    title: 'Wes Bos',
    author: 'Wes Bos',
    description: 'Fullstack Web Developer',
    siteUrl: process.env.DEPLOY_PRIME_URL,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-styled-components`,
    // Removed during dev as its slow to build
    // {
    //   resolve: `gatsby-plugin-prettier-build`,
    //   options: {
    //     types: ['html'],
    //     concurrency: 20,
    //     verbose: true,
    //   },
    // },
    // Pages
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'page',
      },
    },
    // Posts
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: 'post',
      },
    },
    // Tips
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/tips`,
        name: 'tip',
      },
    },
    // beginner javascript Guide
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/javascript`,
        name: 'javascript',
      },
    },
    // Images
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        mdxOptions: {
          remarkPlugins: [
            [
              remarkPlugin,
              {
                theme: `Cobalt2`,
                extensions: [`theme-cobalt2`],
              },
            ],
          ],
        },
        gatsbyRemarkPlugins: [
          // `gatsby-remark-embedder`,
          `gatsby-remark-copy-linked-files`,
          // {
          //   resolve: 'gatsby-remark-vscode',
          //   options: {
          //     theme: `Cobalt2`,
          //     extensions: [`theme-cobalt2`],
          //   },
          // },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1500,
              linkImagesToOriginal: false,
              withWebp: true,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              maintainCase: false,
              icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              offsetY: `100`,
              className: `hash-anchor`,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // `gatsby-remark-embedder`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          // 'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-176517-1`,
      },
    },

    `gatsby-plugin-react-helmet`,
  ],
};

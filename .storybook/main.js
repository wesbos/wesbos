module.exports = {
  stories: ["../src/**/*.stories.{js,jsx}"],
  addons: ["@storybook/addon-docs", "@storybook/addon-actions", '@storybook/addon-a11y', '@storybook/addon-viewport'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      // Config for js and jsx files
      test: /\.(js|jsx)$/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              // use @babel/preset-react for JSX and env (instead of staged presets)
              require.resolve("@babel/preset-react"),
              require.resolve("@babel/preset-env"),
            ],
            plugins: [
              // use @babel/plugin-proposal-class-properties for class arrow functions
              require.resolve("@babel/plugin-proposal-class-properties"),
              // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
              require.resolve("babel-plugin-remove-graphql-queries"),
              // use babel-plugin-react-docgen to ensure PropTables still appear
              require.resolve("babel-plugin-react-docgen"),
            ],
          },
        },
      ],
      exclude: [/node_modules\/(?!(gatsby)\/)/],
    });

    return config;
  },
};

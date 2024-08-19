const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {

      webpackConfig.plugins.forEach(plugin => {
        if (plugin instanceof InlineChunkHtmlPlugin) {
          plugin.tests = [/.+[.]js/]
        }
      })

      const oneOfRuleIdx = webpackConfig.module.rules.findIndex(rule => !!rule.oneOf);
      webpackConfig.module.rules[oneOfRuleIdx].oneOf.forEach(loader => {
        if (loader.test && loader.test.test && (loader.test.test("test.module.css") || loader.test.test("test.module.scss"))) {
          loader.use.forEach(use => {
            if (use.loader && use.loader.includes('mini-css-extract-plugin')) {
              use.loader = require.resolve('style-loader');
            }
          })
        }
      })

      webpackConfig.resolve.fallback = {
        process: require.resolve('process/browser'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert'),
        buffer: require.resolve('buffer'),
        util: require.resolve('util'),
        vm: require.resolve("vm-browserify"),
      };
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        }),
      );

      return webpackConfig
    }
  },
}

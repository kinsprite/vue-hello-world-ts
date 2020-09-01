// vue.config.js

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const isClient = process.env.VUE_SSR !== 'true';
console.log('process.env.VUE_SSR', process.env.VUE_SSR);
console.log('isClient', isClient);

const getClientWebpackConfig = () => ({
  plugins: [
    new VueSSRClientPlugin(),
  ],
  optimization: {
    minimize: false,
  },
});

const getServerWebpackConfig = () => ({
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new VueSSRServerPlugin(),
  ],
  optimization: {
    minimize: false,
    runtimeChunk: false,
    splitChunks: false,
  },
});

module.exports = {
  pages: {
    index: {
      entry: isClient ? ['src/entry-client', 'src/registerServiceWorker'] : 'src/entry-server',
    },
  },
  configureWebpack: isClient ? getClientWebpackConfig() : getServerWebpackConfig(),
};

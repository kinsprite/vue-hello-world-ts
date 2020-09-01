// vue.config.js

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: 'src/entry-client',
    },
  },
  configureWebpack: {
    plugins: [
      new VueSSRClientPlugin(),
    ],
  },
};

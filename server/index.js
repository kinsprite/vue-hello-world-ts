/* eslint-disable  @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const { createBundleRenderer } = require('vue-server-renderer');
const server = require('express')();

const serverBundle = require('../dist-ssr/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  // template, // （可选）页面模板
  clientManifest, // （可选）客户端构建 manifest
});

server.get('*', (req, res) => {
  const context = { url: req.url };
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (err, html) => {
    // 处理异常……
    res.end(html);
  });
});

server.listen(8080);

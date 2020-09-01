import { createApp } from './app';
import { AsyncDataComponent } from './views/aysncParam';

export interface Context {
  url: string,
  title: 'Vue App',
  metas: `<meta name="keyword" content="vue,ssr">
          <meta name="description" content="vue srr demo">`,
  state: {
    [key: string]: any,
  },
}

export interface RespStatusCodeError extends Error {
  code: number;
  message: string;
}

export class PageNotFoundError extends Error implements RespStatusCodeError {
  code: number;

  message: string;

  constructor(...args: []) {
    super(...args);
    this.code = 404;
    this.message = 'Page not found';
  }
}

export default (context: Context) => new Promise((resolve, reject) => {
  const { app, router, store } = createApp();

  // 设置服务器端 router 的位置
  router.push(context.url);

  // 等到 router 将可能的异步组件和钩子函数解析完
  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents() as AsyncDataComponent[];
    // 匹配不到的路由，执行 reject 函数，并返回 404
    if (!matchedComponents.length) {
      reject(new PageNotFoundError());
      return;
    }

    Promise.all(matchedComponents.map((Component) => {
      if (Component.asyncData) {
        return Component.asyncData({
          store,
          route: router.currentRoute,
        });
      }

      return undefined;
    })).then(() => {
      // 在所有预取钩子(preFetch hook) resolve 后，
      // 我们的 store 现在已经填充入渲染应用程序所需的状态。
      // 当我们将状态附加到上下文，
      // 并且 `template` 选项用于 renderer 时，
      // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
      context.state = store.state;

      resolve(app);
    }).catch(reject);
  }, reject);
});

import { createApp } from './app';

export interface Context {
  title: 'Vue App',
  metas: `<meta name="keyword" content="vue,ssr">
          <meta name="description" content="vue srr demo">`,
}

export default (context: Context) => {
  const { app } = createApp();
  return app;
};

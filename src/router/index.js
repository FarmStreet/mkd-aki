import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

export const pages = {
  HOME: 'home',
};

const routes = [
  { name: pages.HOME, path: '/' },
];

export const initialize = () => {
  const router = createRouter(routes, { defaultRoute: pages.HOME });

  router.usePlugin(browserPlugin());

  router.start();

  return router;
};
import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

export const pages = {
  HOME: 'home',
  GROUP_ADD: 'group_add',
  GROUP_SETTINGS: 'group_settings',
  NEWS_ADD: 'news_add',
  GROUP: 'group',
  FRIEND_LIST: 'friend_list'
};

const routes = [
  { name: pages.HOME, path: '/' },
  { name: pages.GROUP_ADD, path: '/group_add' },
  { name: pages.GROUP_SETTINGS, path: '/group_settings' },
  { name: pages.NEWS_ADD, path: '/news_add' },
  { name: pages.GROUP, path: '/group' },
  { name: pages.FRIEND_LIST, path: '/friend_list' },
];

export const initialize = () => {
  const router = createRouter(routes, { defaultRoute: pages.HOME });

  router.usePlugin(browserPlugin());

  router.start();

  return router;
};
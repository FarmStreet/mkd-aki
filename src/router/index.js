import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

export const pages = {
  HOME: 'home',
  GROUP_ADD: 'group_add',
  GROUP_SETTINGS: 'group_settings',
  EVENT_ADD: 'event_add',
  GROUP_MAIN: 'group_main',
  FRIEND_LIST: 'friend_list',
  NEW_ITEM: 'new_item',
  QUESTION_ITEM: 'question_item',
  VOTING_ITEM: 'voting_item',
  WORK_ITEM: 'work_item',
  ENTER_SCREEN: 'enter_screen',
  ASK_QUESTION: 'ask_question',
};

const routes = [
  { name: pages.HOME, path: '/' },
  { name: pages.GROUP_ADD, path: '/group_add' },
  { name: pages.GROUP_SETTINGS, path: '/group_settings' },
  { name: pages.EVENT_ADD, path: '/event_add/:groupId' },
  { name: pages.GROUP_MAIN, path: '/group_main/:groupId' },
  { name: pages.FRIEND_LIST, path: '/friend_list' },
  { name: pages.NEW_ITEM, path: '/new_item/:newId' },
  { name: pages.QUESTION_ITEM, path: '/question_item/:questionId' },
  { name: pages.VOTING_ITEM, path: '/voting_item/:votingId' },
  { name: pages.WORK_ITEM, path: '/work_item/:workId' },
  { name: pages.ASK_QUESTION, path: '/ask_question/:groupId' },
  { name: pages.ENTER_SCREEN, path: '/enter_screen' },
];

export const initialize = () => {
  const router = createRouter(routes, { defaultRoute: pages.HOME });

  router.usePlugin(browserPlugin());

  router.start();

  return router;
};
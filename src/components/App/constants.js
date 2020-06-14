export const APP_ID = 7509087;
export const API_URL =  'https://keylordworkshop.ru/api/';

export const AJAX_CONFIG = {
  headers: {
    "content-type": "application/json",
  }
};

export const VOTE_LIST = [
  {
    vk_id: 171138541,
    id: 2,
    groupId: 0,
    name: "Александр Муратов",
    isAgree: 1,
  },
  {
    vk_id: 232938817,
    id: 2,
    groupId: 0,
    name: "Руслан Канчурин",
    isAgree: 0,
  }
];

export const GROUP_LIST = [
  {
    id: 0,
    name: 'дом №5',
    count: 2,
    isLeader: 1
  },
  {
    id: 1,
    name: 'дом №4',
    count: 2,
    isLeader: 0
  }
];


// ТИПЫ ИВЕНТОВ
// 1 - новости
// 2 - вопросы
// 3 - голосования
// 4 - работы

export const STATUS_LIST = {
  0: 'Все',
  1: 'Новости',
  2: 'Вопросы',
  3: 'Голосования',
  4: 'Работы',
};

export const EVENT_LIST = [
  {
    id: 0,
    type: 2,
    from: 232938817,
    groupId: 0,
    name: 'Замечательный вопрос',
    question: 'У меня был вопрос и я бы хотел услышать на него ответ. Разве я этого не заслуживаю?',
    answer: '',
    date: '13.06.2020'
  },
  {
    id: 1,
    type: 1,
    groupId: 0,
    name: 'Вот такая новость',
    message: 'Эта новость покорит весь мир Эта новость покорит весь мир Эта новость покорит весь мир Эта новость покорит весь мир Эта новость покорит весь мир Эта новость покорит весь мир Эта новость покорит весь мир',
    date: '13.06.2020'
  },
  {
    id: 2,
    groupId: 0,
    type: 3,
    name: 'Мы пришли голосовать',
    description: 'Предлагаем сделать из нашего замечательного дома огромного трансформера',
    date: '13.06.2020',
    members: [
      {
        id: 232938817,
        name: 'Руслан Канчурин',
        agree: 1,
      },
    ],
  },
];

export const FRIEND_LIST = [
  {
    id: 171138541,
    name: 'Александр Муратов'
  },
  {
    id: 232938817,
    name: 'Руслан Канчурин'
  },
];
export const APP_ID = 7509087;
export const URI_PATH = '';

export const GROUP_LIST = [
  {
    id: 0,
    name: 'дом №5',
    memberList: [
      {
        id: 171138541,
        name: 'Александр Муратов'
      },
      {
        id: 232938817,
        name: 'Руслан Канчурин'
      },
    ],
    isLeader: 1
  },
  {
    id: 1,
    name: 'дом №4',
    memberList: [
      {
        id: 171138541,
        name: 'Александр Муратов'
      },
      {
        id: 232938817,
        name: 'Руслан Канчурин'
      },
    ],
    isLeader: 0
  }
];

// ТИПЫ ИВЕНТОВ
// 0 - новости
// 1 - вопросы
// 2 - голосования
// 3 - работы

export const EVENT_LIST = {
  0: {
    id: 0,
    type: 0,
    name: 'Замечательный вопрос',
    question: 'У меня был вопрос и я бы хотел услышать на него ответ. Разве я этого не заслуживаю?'
  },
};

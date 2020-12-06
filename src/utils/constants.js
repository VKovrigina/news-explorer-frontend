const NEWS_API_OPTIONS = {
  getSevenDaysAgoDate: () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 7);
    const sevenDaysAgo = currentDate.toISOString().split('T')[0];
    return sevenDaysAgo;
  },
  getCurrentDate: () => {
    const currentFullDate = new Date();
    const currentDate = currentFullDate.toISOString().split('T')[0];
    return currentDate;
  },
};

const MAIN_API_OPTIONS = {
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
};

const MONTH_NAMES = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

const SERVER_ERROR_MESSAGE = 'Упс! Кажется, что-то поломалось :(';
const DEFAULT_IMG_URL = 'https://images.unsplash.com/photo-1607178289618-21847c3f7cc0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80';
const NEWS_SERVER_ERROR_MESSAGE = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
const COUNT_NEW_ARTICLES = 3;

export {
  NEWS_API_OPTIONS,
  MONTH_NAMES,
  MAIN_API_OPTIONS,
  SERVER_ERROR_MESSAGE,
  DEFAULT_IMG_URL,
  NEWS_SERVER_ERROR_MESSAGE,
  COUNT_NEW_ARTICLES,
};

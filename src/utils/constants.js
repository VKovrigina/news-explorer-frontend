const newsApiOptions = {
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

const mainApiOptions = {
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
};

const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

const serverErrorMessage = 'Упс! Кажется, что-то поломалось :(';
const defaultImgUrl = 'https://images.unsplash.com/photo-1607178289618-21847c3f7cc0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80';

export {
  newsApiOptions,
  monthNames,
  mainApiOptions,
  serverErrorMessage,
  defaultImgUrl,
};

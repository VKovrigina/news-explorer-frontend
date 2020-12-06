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

export {
  newsApiOptions,
  monthNames,
  mainApiOptions,
  serverErrorMessage,
};

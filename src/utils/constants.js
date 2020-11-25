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

export default newsApiOptions;

const generateCalendarData = (classes) => {
  const currentDate = new Date();
  const weeks = 1;
  const days = weeks * 6;
  // When proper weekly view is needed ...
  // const days = weeks * 7;
  const calendarData = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + i);
    const dateString = date.toISOString().slice(0, 10);
    const dayClasses = classes.filter(
      (classItem) => classItem.date === dateString,
    );
    calendarData.push({ date, dayClasses });
  }

  return calendarData;
};

export default generateCalendarData;

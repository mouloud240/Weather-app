
const DayOfWeekComponent = ({ dateString }) => {
  const getDayOfWeek = (dateString) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayOfWeekIndex = date.getDay();
    return daysOfWeek[dayOfWeekIndex];
  };

  const dayOfWeek = getDayOfWeek(dateString);

  return (
    <div>
      <p className="font-semibold text-lg">{dayOfWeek}</p>
    </div>
  );
};

export default DayOfWeekComponent;

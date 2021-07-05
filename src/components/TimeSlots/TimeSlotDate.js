const TimeSlotDate = (props) => {
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();
  const hour = props.date.getHours();
  const minute = props.date.getMinutes();

  return (
        <div>
          {props.title}: {day} {month} {year}, {hour}:{minute}
        </div>
  );
};

export default TimeSlotDate;

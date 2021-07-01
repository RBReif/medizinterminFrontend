import TimeSlotDateItem from "./TimeSlotDateItem";


const TimeSlotDateList = (props) => {
  if (props.items.length === 0) {
    return <h2>Found no timeslots.</h2>;
  }

  return (
    <ul>
      {props.items.map((timeslotdate) => (
        <TimeSlotDateItem
          key={timeslotdate.id}
          date={timeslotdate.date}
        />
      ))}
    </ul>
  );
};

export default TimeSlotDateList;
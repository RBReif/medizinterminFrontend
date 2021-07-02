import TimeSlotDateItem from "./TimeSlotDateItem";


const TimeSlotDateList = (props) => {
  const timeslotitems = props.items;

  if (timeslotitems.length === 0) {
    return <h2>Found no timeslots.</h2>;
  }

  return (
    <ul>
      {props.items.map((item) => (
        <TimeSlotDateItem
          id={item.id}
          date={item.date}
        />
      ))}
    </ul>
  );
};

export default TimeSlotDateList;
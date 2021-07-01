import TimeSlotDateItem from "./TimeSlotDateItem";


const TimeSlotDateList = (props) => {
  console.log("TimeSLotDateList " , props.items);
  const timeslotitems = props.items;
  console.log("TimeSlotDateList timeslotitems: " , timeslotitems);

  if (timeslotitems.length === 0) {
    return <h2>Found no timeslots.</h2>;
  }

  console.log("Timeslotlist: " + props.items);


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
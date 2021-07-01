import TimeSlotDateList from "./TimeSlotDateList";

function TimeSlots(props) {
  return (
    <div>
      <TimeSlotDateList items={props.items}/>
    </div>
  );
}

export default TimeSlots;

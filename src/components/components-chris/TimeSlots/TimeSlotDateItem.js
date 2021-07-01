import React from "react";
import TimeSlotDate from "./TimeSlotDate";
import Card from "../UI/Card";

const TimeSlotDateItem = (props) => {
  // const deleteHandler = () => {
  //   props.onDelete(props.id);
  // }; 

  return (
    <Card>
        <TimeSlotDate date={props.id} />
        <div>
          <p>{props.date}</p>
        </div>
        </Card>
  );
};

export default TimeSlotDateItem;

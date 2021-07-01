import React from "react";
import TimeSlotDate from "./TimeSlotDate";

const TimeSlotDateItem = (props) => {
  return (
    <li>
        <TimeSlotDate date={props.date} />
    </li>
  );
};

export default TimeSlotDateItem;

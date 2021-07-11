import React from "react";
import TimeSlotDate from "./TimeSlotDate";


const TimeSlotDateItem = (props) => {
  return (
    <center>
          <TimeSlotDate title="Start" date={props.startdate} />
          <br />
          <TimeSlotDate title="End" date={props.enddate} />
          <br/>
    </center>
  );
};


export default TimeSlotDateItem;

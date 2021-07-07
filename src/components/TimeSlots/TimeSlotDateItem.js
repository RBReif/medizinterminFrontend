import React from "react";
import TimeSlotDate from "./TimeSlotDate";
import DynamicCard from "../UI/DynamicCard";
import { Link } from "react-router-dom";

const TimeSlotDateItem = (props) => {
  // const deleteHandler = () => {
  //   props.onDelete(props.id);
  // };

  return (
    <center>
    <DynamicCard
      id={props.id}
      variant="body2"
      content={
        <div>
          <TimeSlotDate title="Start" date={props.startdate} />
          <br />
          <TimeSlotDate title="End" date={props.enddate} />
          <br/>
          <Link onClick={console.log("Remove")}>Remove</Link>
        </div>
      }
    />
    </center>
  );
};

export default TimeSlotDateItem;

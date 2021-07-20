import React from "react";
import TimeSlotDate from "./TimeSlotDate";
import { Link } from "react-router-dom";


const TimeSlotDateItem = (props) => {

  const deleteHandler = (item) => {
    props.onClick(props)
  }

  return (
    <center>
          <TimeSlotDate title="Start" date={props.startdate} />
          <br />
          <TimeSlotDate title="End" date={props.enddate} />
          <br/>
          <Link id={props.id} onClick={deleteHandler}>Remove</Link>
    </center>
  );
};


export default TimeSlotDateItem;

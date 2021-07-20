import TimeSlotDateItem from "./TimeSlotDateItem";
import { Link
 } from "react-router-dom";
 import React, {useState} from "react";
 import DynamicCard from "../UI/DynamicCard";


 const TimeSlotDateList = (props) => {
  const timeslotitems = props.items;

  if (timeslotitems.length === 0) {
    return <h5>Found no timeslots.</h5>;
  }

  const deleteHandler = (item) => {
    props.onDeleteTimeSlotHandler(item)
  }

  // console.log("Timeslots: ", timeslotitems);

  return (
    <center>
      {timeslotitems.map((item) => (
        <DynamicCard
        key={item.id}
        id={item.id}
        variant="body2"
        content={
          <div>
          <TimeSlotDateItem
            key={item.id}
            id={item.id}
            startdate={item.startdate}
            enddate={item.enddate}
            onClick={deleteHandler}
          />
          </div>
        }/>
      ))}    
    </center>
  );
};

export default TimeSlotDateList;
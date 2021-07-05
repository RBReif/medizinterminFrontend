import React from "react";
import { ListGroup } from "react-bootstrap";
import TimeSlotDate from "./TimeSlotDate";
import DynamicCard from "../UI/DynamicCard";

const TimeSlotDateItem = (props) => {
  // const deleteHandler = () => {
  //   props.onDelete(props.id);
  // };

  return (
    <DynamicCard variant="body2" content={<div><TimeSlotDate title="Start" date={props.startdate}/><br/><TimeSlotDate title="End" date={props.enddate}/></div>}/>
  );
};

export default TimeSlotDateItem;

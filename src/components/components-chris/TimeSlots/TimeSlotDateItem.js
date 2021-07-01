import React from "react";
import { ListGroup } from "react-bootstrap";
import TimeSlotDate from "./TimeSlotDate";

const TimeSlotDateItem = (props) => {
  // const deleteHandler = () => {
  //   props.onDelete(props.id);
  // };

  return (
    <ListGroup.Item>
        {/* <TimeSlotDate date={props.date.toString()} /> */}
        <div>
          <TimeSlotDate date={props.date}/>
          {/* {props.date.toString()} */}
        </div>
    </ListGroup.Item>
  );
};

export default TimeSlotDateItem;

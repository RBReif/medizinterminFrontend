import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Card from "../UI/Card";

const TimeSlotDateItem = (props) => {
  // const deleteHandler = () => {
  //   props.onDelete(props.id);
  // };

  console.log("NewLog", props.id);
  console.log("NewLog date", props.date);

  return (
    <ListGroup.Item>
        {/* <TimeSlotDate date={props.date.toString()} /> */}
        <div>
          {props.date.toString()}
        </div>
    </ListGroup.Item>
  );
};

export default TimeSlotDateItem;

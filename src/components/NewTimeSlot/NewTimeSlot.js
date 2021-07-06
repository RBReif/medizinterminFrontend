import React, { useState } from "react";
import { Button } from "react-bootstrap";
import TimeSlotForm from "./TimeSlotForm"

const NewTimeSlot = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const saveTimeSlotDataHandler = (enteredTimeSlotData) => {
    const timeSlotData = {
      ...enteredTimeSlotData,
      id: Math.random().toString(),
    };
    
    props.onAddTimeSlot(timeSlotData);
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {!isEditing && (
        <Button onClick={startEditingHandler}>Add Time Slot</Button>
      )}
      {isEditing && (
        <TimeSlotForm
          onSaveTimeSlotData={saveTimeSlotDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewTimeSlot;
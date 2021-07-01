import React, { useState } from "react";
import AddTimeSlotForm from "./AddTimeSlotForm";
import { Button } from "react-bootstrap";

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
        <AddTimeSlotForm
          onSaveExpenseData={saveTimeSlotDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewTimeSlot;
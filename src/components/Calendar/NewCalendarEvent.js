import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CalendarEventForm from "./CalendarEventForm";

const NewCalendarEvent = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const saveCalendarEventHandler = (enteredCalendarEventData) => {
    const calendarEvent = {
      ...enteredCalendarEventData,
      id: Math.random().toString(),
    };
    
    props.onAddTimeSlot(calendarEvent);
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
        <center><Button onClick={startEditingHandler}>Add Time Slot</Button></center>
      )}
      {isEditing && (
        <CalendarEventForm
          onSaveTimeSlotData={saveCalendarEventHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewCalendarEvent;
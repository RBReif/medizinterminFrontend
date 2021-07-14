import React, { useState } from "react";
import { Button } from "@material-ui/core";
import CalendarEventForm from "./CalendarEventForm";
import Component from "./Calendar";

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
        <center><Button color="primary" onClick={startEditingHandler}>Add Time Slot</Button></center>
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
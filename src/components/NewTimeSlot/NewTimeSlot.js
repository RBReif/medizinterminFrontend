import React, { useState } from "react";
import TimeSlotForm from "./TimeSlotForm";
import { ThemeProvider } from "@material-ui/styles";
import { Theme } from "../UI/Theme";
import { Button } from "@material-ui/core";

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
    <ThemeProvider theme={Theme}>
      <div>
        {!isEditing && (
          <center>
            <Button
              variant="contained"
              color="primary"
              menuAlign="right"
              onClick={startEditingHandler}
            >
              Add Time Slot
            </Button>
          </center>
        )}
        {isEditing && (
          <TimeSlotForm
            onSaveTimeSlotData={saveTimeSlotDataHandler}
            onCancel={stopEditingHandler}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default NewTimeSlot;

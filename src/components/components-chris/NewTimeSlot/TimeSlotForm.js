import React, { useState } from "react";
import NewTimeSlot from "./NewTimeSlot";
import { Button } from "react-bootstrap";

const AddTimeSlotForm = (props) => {
  const [enteredDate, setEnteredDate] = useState("");

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
    console.log(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const timeSlotData = {
      date: new Date(enteredDate),
    };

    props.onSaveExpenseData(timeSlotData);
    setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <div>
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div>
        <Button type="primary" onClick={props.onCancel}>
          Cancel
        </Button>
        <button type="submit">Add Date</button>
      </div>
    </form>
  );
};

export default AddTimeSlotForm;

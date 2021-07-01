import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

const TimeSlotForm = (props) => {
  const [enteredDate, setEnteredDate] = useState("");

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
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
    <Container>
      <Row>
        <Col>
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
          </form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button type="primary" onClick={props.onCancel}>
            Cancel
          </Button>
        </Col>
        <Col>
        <form onSubmit={submitHandler}>
          <Button type="submit">Add Date</Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default TimeSlotForm;

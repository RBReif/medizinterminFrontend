import "date-fns";
import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function TimeSlotFormTest(props) {
   // The first commit of Material-UI
   const [selectedDate, setSelectedDate] = React.useState(new Date());

   const handleDateChange = (date) => {
     setSelectedDate(date);
   };

   const submitHandler = (event) => {
    event.preventDefault();

    const timeSlotData = {
      date: new Date(selectedDate),
    };

    props.onSaveExpenseData(timeSlotData);
    setSelectedDate("");
  };

  return (
    <Container>
      <Row>
        <Col>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
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
}

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

const TimeSlotNew = (props) => {
   // The first commit of Material-UI
   const [selectedStartDate, setselectedStartDate] = React.useState(new Date());
   const [selectedEndDate, setselectedEndDate] = React.useState(new Date());

   const handleStartDateChange = (date) => {
     setselectedStartDate(date);
   };

   const handleEndDateChange = (date) => {
    setselectedEndDate(date);
  };

   const submitHandler = (event) => {
    event.preventDefault();

    const timeSlotData = {
      startdate: new Date(selectedStartDate),
      enddate: new Date(selectedEndDate),
    };

    props.onSaveTimeSlotData(timeSlotData);
    setselectedStartDate("");
    setselectedEndDate("");
  };

  const alertHandler = (event) => {
      event.preventDefault();
      console.log("Invalid input");
      alert("Invalid input. Please choose a end date and end time greater than start date and start time");
  }

  return (
    <Container>
      <Row>
        <Col>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                variant="inline"
                id="date-picker-startdate"
                label="Please select start date"
                format="dd/MM/yyyy"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                variant="inline"
                id="time-picker-starttime"
                todayLabel="now"
                label="Please select start time"
                minutesStep={10}
                ampm={false}
                value={selectedStartDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
               <KeyboardDatePicker
                margin="normal"
                variant="inline"
                id="date-picker-enddate"
                label="Please select end date"
                format="dd/MM/yyyy"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                variant="inline"
                todayLabel="now"
                id="time-picker-endtime"
                ampm={false}
                disableToolbar={false}
                label="Please select end time"
                value={selectedEndDate}
                minutesStep={10}
                onChange={handleEndDateChange}
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
          <form onSubmit={selectedEndDate > selectedStartDate ? selectedStartDate > new Date() ? selectedEndDate > new Date() ? submitHandler : alertHandler : alertHandler: alertHandler}>
            <Button type="submit">Add Date</Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default TimeSlotNew;

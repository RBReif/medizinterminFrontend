import "date-fns";
import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DynamicDatePicker from "../Forms/DynamicDatePicker";
import DynamicTimePicker from "../Forms/DynamicTimePicker";

const TimeSlotForm = (props) => {
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
    alert(
      "Invalid input. Please choose a end date and end time greater than start date and start time"
    );
  };

  console.log("Form : ", selectedStartDate);
  return (
    <Container>
      <Row>
        <Col>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <DynamicDatePicker
                selected={selectedStartDate}
                changehandler={handleStartDateChange}
                label="Please select start time"
                id="date-picker-startdate"
              />
              <DynamicTimePicker
                selected={selectedStartDate}
                changehandler={handleStartDateChange}
                label="Please select start time"
                id="date-picker-starttime"
              />
              <DynamicDatePicker
                selected={selectedEndDate}
                changehandler={handleEndDateChange}
                label="Please select end date"
                id="date-picker-enddate"
              />
              <DynamicTimePicker
                selected={selectedEndDate}
                changehandler={handleEndDateChange}
                label="Please select end time"
                id="date-picker-endtime"
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
          <form
            onSubmit={
              selectedEndDate > selectedStartDate
                ? selectedStartDate > new Date()
                  ? selectedEndDate > new Date()
                    ? submitHandler
                    : alertHandler
                  : alertHandler
                : alertHandler
            }
          >
            <Button type="submit">Add Date</Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default TimeSlotForm;

import "date-fns";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DynamicDatePicker from "../Forms/DynamicDatePicker";
import DynamicTimePicker from "../Forms/DynamicTimePicker";
import { Button } from "@material-ui/core";

const TimeSlotForm = (props) => {
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
    alert(
      "Invalid input. Please choose a end date and end time greater than start date and start time"
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <Col>
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
              </Col>
              <Col>
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
              </Col>
            </Grid>
          </MuiPickersUtilsProvider>
        </Col>
      </Row>
      <Row>
        <Col>
          <center><Button variant="contained"
      menuAlign="right" onClick={props.onCancel}>
            Cancel
          </Button></center>
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
            <center><Button variant="contained"
      color="primary"
      menuAlign="right" type="submit">Add Date</Button></center>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default TimeSlotForm;

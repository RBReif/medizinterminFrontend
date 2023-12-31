import "date-fns";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DynamicDatePicker from "../Forms/DynamicDatePicker";
import DynamicTimePicker from "../Forms/DynamicTimePicker";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DynamicDropdown from "../Forms/DynamicDropdown";
import DynamicCard from "../UI/DynamicCard";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import AppointmentService from "../../services/AppointmentService";
import DoctorService from "../../services/DoctorService";
import moment from "moment";

const getColor = (status) => {
  switch (status) {
    case "AVAILABLE":
      return "#41b23d";
    case "FAILED":
      return "#b23d49";
    case "SCHEDULED":
      return "#ffc107";
    case "SUCCESSFUL":
      return "#185619";
    default:
      return "#473db2";
  }
};

const appointmenttype = [
  { displayname: "SUCCESSFUL" },
  { displayname: "SCHEDULED" },
  //   REQUESTED: "REQUESTED",
  { displayname: "FAILED" },
  { displayname: "AVAILABLE" },
];

//material-ui styles
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function roundTimeHalfHour(time) {
  var timeToReturn = new Date(time);

  timeToReturn.setMilliseconds(Math.round(timeToReturn.getMilliseconds() / 1000) * 1000);
  timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
  timeToReturn.setMinutes(Math.round(timeToReturn.getMinutes() / 30) * 30);
  return timeToReturn;
}

/**
 * For register new users
 * @param {props} props
 */

const CalendarEventForm = (props) => {
  let doctorID = DoctorService.getCurrentUser().id;
  // This form will create a new calendar event with the following properties
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const classes = useStyles();
  const [selectedStartDate, setSelectedStartDate] = React.useState(roundTimeHalfHour(new Date()));
  const [selectedEndDate, setSelectedEndDate] = React.useState(roundTimeHalfHour(new Date()));
  const [appointmentType, setAppointmentType] = React.useState("");


  //changeHandler
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleAppointmentChange = (event) => {
    setAppointmentType(event.target.value);
  };

  const handleTitleChange = (string) => {
    setTitle(string.target.value);
  };

  const handleDescriptionChange = (string) => {
    setDescription(string.target.value);
  };

  //submitHandler, will create a new event onSubmit
  const submitHandler = async (event) => {

    event.preventDefault(); 

 let testDate = moment(new Date(selectedStartDate)).toDate();

    let newEvent = await AppointmentService.createAppointment(doctorID, selectedStartDate, selectedEndDate, appointmentType, description, title)

    const calendarEvent = {
      startDate: new Date(selectedStartDate),
      endDate: new Date(selectedEndDate),
      title: title,
      appointmentStatus: appointmentType,
      notes: description,
      color: getColor(appointmentType),
      
    };

    props.onSaveTimeSlotData(calendarEvent);
    setSelectedStartDate("");
    setSelectedEndDate("");
    setTitle("");
    setDescription("");
  };

  //alertHandler. Will set an alert if input is invalid. STARTDATE has to be before ENDDATE. BOTH DATES have to be in the future
  const alertHandler = (event) => {
    event.preventDefault();
    alert(
      appointmentType === "AVAILABLE" || appointmentType === "SCHEDULED?"
        ? "Invalid input. 'AVAILABLE' and 'SCHEDULED' timeslots can only occur in the future. If this is the case, please check if the end date/time is after the start date/time."
        : appointmentType === "SUCCESSFUL" || appointmentType === "FAILED"
        ? "Invalid input. 'SUCCESSFUL' and 'FAILED' timeslots can only occur in the past. If this is the case, please check if the end date/time is after the start date/time."
        : "Invalid input. Please check your parameters again."
    );
  };

  return (
    <Container>
      <DynamicCard
        content={
          <div>
            <Row>
              <Col>
                <Row>
                  <Grid>
                    <Box p={2}>
                      <TextField
                        fullWidth="true"
                        id="outlined-basic"
                        label="Add Title..."
                        onChange={handleTitleChange}
                        variant="outlined"
                      />
                    </Box>
                  </Grid>
                </Row>
                <Row>
                  <Box p={2}>
                    <DynamicDropdown
                      items={appointmenttype}
                      onChange={handleAppointmentChange}
                      label="Type"
                    ></DynamicDropdown>
                  </Box>
                </Row>
                <Row>
                  <Box p={1} mx="auto">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="space-around">
                        <Col>
                          <DynamicDatePicker
                            selected={selectedStartDate}
                            changehandler={handleStartDateChange}
                            label="Please select start date"
                            id="date-picker-startdate"
                          />
                          <DynamicTimePicker
                            selected={roundTimeHalfHour(selectedStartDate)}
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
                            selected={roundTimeHalfHour(selectedEndDate)}
                            changehandler={handleEndDateChange}
                            label="Please select end time"
                            id="date-picker-endtime"
                          />
                        </Col>
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Box>
                </Row>
                <Row>
                  <Grid xs={12}>
                    <Box p={2}>
                      <TextField
                        fullWidth="true"
                        id="outlined-multiline-flexible"
                        label="Description"
                        multiline
                        rows={7}
                        defaultValue={""}
                        variant="outlined"
                        onChange={handleDescriptionChange}
                      />
                    </Box>
                  </Grid>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onClick={props.onCancel}>Cancel</Button>
              </Col>
              <Col>
                <form
                  onSubmit={
                    appointmentType === "AVAILABLE" ||
                    appointmentType === "SCHEDULED"
                      ? selectedEndDate > selectedStartDate
                        ? selectedStartDate > new Date()
                          ? selectedEndDate > new Date()
                            ? submitHandler
                            : alertHandler
                          : alertHandler
                        : alertHandler
                      : appointmentType === "FAILED" ||
                        appointmentType === "SUCCESSFUL"
                      ? selectedEndDate > selectedStartDate
                        ? selectedStartDate < new Date()
                          ? selectedEndDate < new Date()
                            ? submitHandler
                            : alertHandler
                          : alertHandler
                        : alertHandler
                      : alertHandler
                  }
                >
                  <Button color="primary" type="submit">
                    Add Date
                  </Button>
                </form>
              </Col>
            </Row>
          </div>
        }
      ></DynamicCard>
    </Container>
  );
};

export default CalendarEventForm;

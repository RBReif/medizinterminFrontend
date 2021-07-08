import "date-fns";
import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
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

const appointmenttype = [
  { id: "1", displayname: "Out of Office" },
  { id: "2", displayname: "Occupied" },
  { id: "3", displaynem: "Other" },
];

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

const CalendarEventForm = (props) => {
  // The first commit of Material-UI
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const classes = useStyles();
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleTitleChange = (string) => {
    setTitle(string.target.value);
  };

  const handleDescriptionChange = (string) => {
    setDescription(string.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const calendarEvent = {
      from: new Date(selectedStartDate),
      to: new Date(selectedEndDate),
      title: title,
      color: "#3694DF",
      // description: description
    };

    console.log(calendarEvent);

    props.onSaveTimeSlotData(calendarEvent);
    setSelectedStartDate("");
    setSelectedEndDate("");
    setTitle("");
    setDescription("");
  };

  const alertHandler = (event) => {
    event.preventDefault();
    console.log("Invalid input");
    alert(
      "Invalid input. Please choose a end date and end time greater than start date and start time"
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
                      />
                    </Box>
                  </Grid>
                </Row>
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
          </div>
        }
      ></DynamicCard>
    </Container>
  );
};

export default CalendarEventForm;

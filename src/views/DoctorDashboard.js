import MyCalendar from "../components/Calendar/Calendar";
import Page from "../components/Page";
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import NewCalendarEvent from "../components/Calendar/NewCalendarEvent";
import DynamicCard from "../components/UI/DynamicCard";
import { Box } from "@material-ui/core";
import { Theme } from "../components/UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import AppointmentService from "../services/AppointmentService";
import moment from "moment";
import { Link } from "react-router-dom";
import PatientService from "../services/PatientService";
import DoctorService from "../services/DoctorService";
import UserService from "../services/UserService";
import CEV from "../components/Calendar/CalendarEventForm";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const DoctorDashboard = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
 // const [appointmentID, setAppointmentID] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let doctorID = DoctorService.getCurrentUser().id;
  const [doctor, setDoctor] = useState({});
  const [appointments, setAppointments] = useState([]);

  const [patients, setPatients] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(async () => {
    const getDoctor = async () => {
      const doctor = await DoctorService.getDoctor(doctorID);
      console.log("DOCTOR RECEIVED: ", doctor);
      setDoctor(doctor);
    };
    getDoctor();

    const getAppointments = async () => {
      const appointments = await AppointmentService.getAppointmentsDoctor(
        doctorID
      );
      console.log("APPOINTMENTS RECEIVED: ", appointments);
      setAppointments(appointments?.map((item) => item));
      let patientIDs = [];
      appointments?.forEach((a) => {
        if (a.hasOwnProperty("patient")) {
          if (!patientIDs.some((e) => e === a.patient)) {
            patientIDs = [...patientIDs, a.patient];
          }
        }
      });

      console.log("PATIENT IDS EXTRACTED: ", patientIDs);
      for (const a1 of patientIDs) {
        const patient = await PatientService.getPatient(a1);
        console.log("RECEIVED PATIENT", patient);
        setPatients([...patients, patient]);
      }
    };
    const a = getAppointments();
  }, []);

  const getPatient = (id) => {
    const patient = patients.find((e) => e._id === id);
    return patient;
  };


  useEffect(async () => {
    setCalendarEvents(
      appointments?.map((item) => {
        // console.log("PATIENTS STORED: ", patients);
        // console.log(
        //   "HAS PATIENT:",
        //   item.hasOwnProperty("patient") ? item.patient : ""
        // );
        return {
          color: getColor(item.appointmentStatus),
          startDate: new Date(item.startPoint),
          endDate: moment(new Date(item.startPoint)).add(30, "m").toDate(),
          title: item.appointmentTitle,
          appointmentStatus: item.appointmentStatus,
          notes: item.appointmentDetails,
          patient: getPatient(item.patient),
          
        };
      })
    );

  }, [patients, appointments]);

  const addCalendarEventHandler = async (calendarevent) => {
    setCalendarEvents((prevCalendarEvents) => {
          return [calendarevent, ...prevCalendarEvents];
    //   let receivedResults = await AppointmentService.createAppointment(doctorID,st)
    });
  };

  return (
    <ThemeProvider theme={Theme}>
      <Page>
      <Tabs
              orientation="horizontal"
              variant="scrollable"
              value={value}
              indicatorColor="primary"
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}
              centered
            >
              <Tab label="Calendar" {...a11yProps(0)} />
              <Tab label="Daily Plan" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
        <Container fluid>
          <Row>
            <Col>
              <center>
                <h4>Manage My Timeslots</h4>
              </center>
            </Col>
          </Row>
          <Row>
            <Col>
              <DynamicCard
                variant="outlined"
                content={
                  <div>
                    <Row>
                      <Box p={2}>
                        <h5>Add a new timeslot</h5>
                      </Box>
                    </Row>
                    <Row>
                      <Box p={2}>
                        <NewCalendarEvent
                          onAddTimeSlot={addCalendarEventHandler}
                        ></NewCalendarEvent>
                      </Box>
                    </Row>
                  </div>
                }
              ></DynamicCard>
            </Col>
            <Col xs={8} xl={8}>
              <DynamicCard
                variant="outlined"
                content={
                  <div>
                    <Row>
                      <Box p={2}>
                        <h5>
                          The Calendar of {doctor.firstname} {doctor.lastname} (
                          {doctor.area_of_expertise})
                        </h5>
                      </Box>
                    </Row>
                    <div>
                    <MyCalendar events={calendarEvents} />
                    </div>
                  </div>
                }
              ></DynamicCard>
            </Col>
          </Row>
        </Container>
        </TabPanel>
        <TabPanel value={value} index={0}>
          </TabPanel>
      </Page>
    </ThemeProvider>

  );
};
export default DoctorDashboard;

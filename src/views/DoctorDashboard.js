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
import PatientService from "../services/PatientService";
import DoctorService from "../services/DoctorService";

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


const DoctorDashboard = () => {
  const [value, setValue] = React.useState(0);

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
      // console.log("---DOCTOR RECEIVED---: ", doctor);
      setDoctor(doctor);
    };
    getDoctor();

    const getAppointments = async () => {
      const appointments = await AppointmentService.getAppointmentsDoctor(
        doctorID
      );
      // console.log("---APPOINTMENTS RECEIVED---: ", appointments);
      setAppointments(appointments?.map((item) => item));
      let patientIDs = [];
      appointments?.forEach((a) => {
        if (a.hasOwnProperty("patient")) {
          if (!patientIDs.some((e) => e === a.patient)) {
            patientIDs = [...patientIDs, a.patient];
          }
        }
      });

      for (const a1 of patientIDs) {
        if (a1 !=null) {
          const patient = await PatientService.getPatient(a1);
          // console.log("---PATIENT RECEIVED---: ", patient);
          setPatients([...patients, patient]);
        }
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
    });
  };

  return (
    <ThemeProvider theme={Theme}>
      <Page>
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
                    <MyCalendar events={calendarEvents} patients={patients} />
                    </div>
                  </div>
                }
              ></DynamicCard>
            </Col>
          </Row>
        </Container>
      </Page>
    </ThemeProvider>

  );
};
export default DoctorDashboard;

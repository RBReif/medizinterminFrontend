import MyCalendar from "../components/Calendar/Calendar";
import Page from "../components/Page";
import {Container, Row, Col} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import NewCalendarEvent from "../components/Calendar/NewCalendarEvent";
import DynamicCard from "../components/UI/DynamicCard";
import {Box} from "@material-ui/core";
import {Theme} from "../components/UI/Theme";
import {ThemeProvider} from "@material-ui/styles";
import AppointmentService from "../services/AppointmentService";
import moment from "moment";
import {Link} from "react-router-dom";
import PatientService from "../services/PatientService";
import DoctorService from "../services/DoctorService";

const events = [
    {
        id: 1,
        color: "#fd3153",
        from: new Date(),
        to: new Date(),
        title: <Link to="/">Hello</Link>,
        body: "ugsjjgjsidjgjsdiugjsdgjsd",
        type: "Out of Office",
    },
    {
        id: 2,
        color: "#1ccb9e",
        from: "2019-05-01T13:00:00+00:00",
        to: "2019-05-05T14:00:00+00:00",
        title: "This is another event",
        type: "Out of Office",
    },
    {
        id: 3,
        color: "#3694DF",
        from: "2019-05-05T13:00:00+00:00",
        to: "2019-05-05T20:00:00+00:00",
        title: "This is also another event",
        type: "Out of Office",
    },
    {
        id: 4,
        color: "#ffc107",
        from: "2021-07-02T18:00:00+00:00",
        to: "2021-07-05T19:00:00+00:00",
        title: "This is an event",
        type: "Out of Office",
    },
    {
        id: 5,
        color: "#fd3153",
        from: "2021-07-05T18:00:00+00:00",
        to: "2021-07-05T19:00:00+00:00",
        title: "This is an aoifsiosfa",
        type: "Out of Office",
    },
    {
        id: 6,
        color: "#fd3153",
        to: new Date(),
        title: "This is an aifjejffjewjgwejgjewigoifsiosfa",
        from: new Date(),
        type: "Out of Office",
    },
];

const DoctorDashboard = () => {
    let doctorID = "60e70bc72c79d33ed899b25f"
    const [doctor, setDoctor] = useState({})
    const [appointments, setAppointments] = useState([])
    const [name, setName] =useState("")

    //here we declare 'patients' with useState
    const [patients, setPatients] = useState([])


    const [calendarEvents, setCalendarEvents] = useState([]);

    useEffect(async () => {
        const getDoctor = async () => {
            const doctor = await DoctorService.getDoctor(doctorID)
            console.log("DOCTOR RECEIVED: ", doctor)
            setDoctor(doctor)
        }
        getDoctor()

   //here we want to return the name of a patient based on its ID
    const  getNamePatient = async (id) => {
            console.log("Here are all stored patients (in getNamePatient): ", patients)

        const patient = await patients.some(e => e._id === id)
        console.log("PATIENT FOUND: ",patient)
        //here we get the error indicating that 'patient' is undefined. Because it is not yet stored in patients
        return  patient.name
    }

    const getAppointments = async () => {
        const appointments = await AppointmentService.getAppointmentsDoctor(doctorID)
        console.log("APPOINTMENTS RECEIVED: " ,appointments)
        setAppointments(appointments.map((item) => item))
        let patientIDs = [];
        appointments.forEach(a => {
            if (a.hasOwnProperty("patient")){
            if (!patientIDs.some(e => e === a.patient)) {
                patientIDs = [...patientIDs, a.patient]
            }}
        })

        console.log("PATIENT IDS EXTRACTED: ", patientIDs)
        let promises = [];
        for (const a1 of patientIDs) {
            const patient = await PatientService.getPatient(a1)
            console.log("RECEIVED PATIENT", patient)
          setPatients([...patients,patient])
        }

        Promise.all(promises).then (async e =>{
          setCalendarEvents(appointments.map( (item) => {
             console.log("PATIENTS STORED: ",patients)
             console.log("HAS PATIENT:", item.hasOwnProperty("patient")? item.patient:"")
         return {
            "color": "#fd3153",
            "from": new Date(item.startPoint),
            "to": moment(new Date(item.startPoint)).add(30, 'm').toDate(),
            "title":item.appointmentStatus ,
            "description":item.hasOwnProperty("patient")?  item.patient:"",
          //"description":item.hasOwnProperty("patient")?  getNamePatient(item.patient):"",

         }}
         )) })


    }
    const a = getAppointments()


    /*
        console.log("KalenderEvents: ", calendarEvents);

      const addCalendarEventHandler = (calendarevent) => {
        setCalendarEvents((prevCalendarEvents) => {
          return [calendarevent, ...prevCalendarEvents];
        });

     */

}, [])

/*
  useEffect( (id) => {
    const getProfsAppointments = async () => {
      const appointments = await AppointmentService.getAppointmentsDoctor("60f02f5677b8151174bbd388")
      console.log("Received appointments: ", appointments)
      setCalendarEvents(appointments.map((item) => {return {
        "color": "#fd3153",
        "from": new Date(item.startpoint),
        "to": moment(new Date(item.startpoint)).add(30, 'm').toDate(),
        "title":item.appointmentStatus,
      }}))
    }
    getProfsAppointments()

 */

    console.log("KalenderEvents: ", calendarEvents);

    const addCalendarEventHandler = (calendarevent) => {
            setCalendarEvents((prevCalendarEvents) => {
             //   if calendarevent
                return [calendarevent, ...prevCalendarEvents];
            });}
    console.log("Here are all stored patients (later in the code/time): ", patients)
return (
    <ThemeProvider theme={Theme}>
        <Page>
            <Container fluid>
                <Row>
                    <Col>1 of 2</Col>
                    <Col>2 of 2</Col>
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
                                            <h5>My Calendar</h5>
                                        </Box>
                                    </Row>
                                    <MyCalendar events={calendarEvents}/>
                                </div>
                            }
                        ></DynamicCard>
                    </Col>
                </Row>
            </Container>
        </Page>
    </ThemeProvider>
);
}
;

export default DoctorDashboard;

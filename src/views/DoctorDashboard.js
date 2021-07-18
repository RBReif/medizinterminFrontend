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
import UserService from "../services/UserService"
import CEV from "../components/Calendar/CalendarEventForm"

const getColor = (status) => {
    switch (status){
        case "AVAILABLE": return "#41b23d"
        case "FAILED": return "#b23d49"
        case "SCHEDULED": return "#ffc107"
        case "SUCCESSFUL": return "#185619"
        default: return "#473db2"
    }
}
const DoctorDashboard = () => {
    let doctorID =  DoctorService.getCurrentUser().id//"60e70bc72c79d33ed899b25f"
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
        for (const a1 of patientIDs) {
            const patient = await PatientService.getPatient(a1)
            console.log("RECEIVED PATIENT", patient)
          setPatients([...patients,patient])
        }



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

        const  getNamePatient =
            (id) => {

            const patient =  patients.find(e => e._id === id)
            return  patient.name
        }
    useEffect(() => {
        setCalendarEvents(appointments.map( (item) => {
            console.log("PATIENTS STORED: ",patients)
            console.log("HAS PATIENT:", item.hasOwnProperty("patient")? item.patient:"")
            return {
                "color": getColor(item.appointmentStatus),
                "from": new Date(item.startPoint),
                "to": moment(new Date(item.startPoint)).add(30, 'm').toDate(),
                "title":item.appointmentStatus ,
                "description":item.hasOwnProperty("patient")?  "Your appointment is with " +getNamePatient(item.patient):"",

            }}
        ))
    }, [patients])

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


return (
    <ThemeProvider theme={Theme}>
        <Page>
            <Container fluid>
                <Row>
                    <Col><center><h4>Manage My Timeslots</h4></center></Col>
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
                                            <h5>The Calendar of {doctor.firstname} {doctor.lastname} ({doctor.area_of_expertise})</h5>
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

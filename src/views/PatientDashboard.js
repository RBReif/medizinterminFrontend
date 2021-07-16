import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import NewsList from "../components/NewsList";
import CheckupList from "../components/CheckupList";
import AppointmentCard from "../components/AppointmentCard";
import Page from "../components/Page";
import { withRouter } from "react-router-dom";
import UserService from "../services/UserService";
import { getPatients, getPatient } from "../redux/actions";
import {useIsUserInteractionMode} from "react-md";
import ConfigService from "../services/ConfigService";
import PatientService from "../services/PatientService";
import AppointmentService from "../services/AppointmentService";
import DoctorService from "../services/DoctorService";
import {forEach} from "react-bootstrap/ElementChildren";


const PatientDashboard = () => {


  let patientId = UserService.getCurrentUser().id
  console.log(patientId)
  const [patient, setPatient] = useState({})
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])

  useEffect(  async() => {
    const getPatient = async () => {
      const patient = await PatientService.getPatient(patientId)
      console.log(patient)
      setPatient(patient)
    }
    getPatient()

    const getAppointments = async () => {
      const appointments = await AppointmentService.getAppointmentsPatient(patientId)
      console.log(appointments)
      setAppointments(appointments.map((item) =>  item))
      console.log("finished with getAppointments ", appointments)
      console.log("length: ", appointments.length)
      let doctorIDs = []
      appointments.forEach(a => {
        if (!doctorIDs.some(e => e===a.doctor)){
          doctorIDs=[...doctorIDs,a.doctor]
        }
    })
      console.log(doctorIDs)

      doctorIDs.forEach(async a => {
          const doctor = await DoctorService.getDoctor(a)
          console.log("RECEIVED DOCTOR", doctor)

          setDoctors([...doctors, doctor])

      })
    }
   const a = getAppointments()

    //a.then(console.log("finally",appointments))


  }, [])

  return (
      <Page>
    <Container>
      <Row>
        <Col xs={8} md={3}>
          {" "}
        </Col>
      </Row>
      <br />
      <Row>
        <Col></Col>
        <Col>
          <h2>Hello {patient.name} </h2>
        </Col>
        <Col></Col>
      </Row>
      <br />
      <Row>
        <Col>
          <h3>News Center</h3>
        </Col>
        <Col>
          <h3>Upcoming Appointments</h3>
        </Col>
        <Col>
          <h3>Previous Appointments</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <NewsList></NewsList>
          </Form>
          <br />
          <h3>Recommended Checkup</h3>
          <CheckupList />
        </Col>
        <Col>
          <Form>
            <AppointmentCard />
            <br />
            <AppointmentCard />
            <br />
            <AppointmentCard />
          </Form>
        </Col>
        <Col>
          <AppointmentCard />
        </Col>
      </Row>
    </Container>
    </Page>
  );
};
// connect() establishes allows the usage of redux functionality
// here the function getMovie, changeMovie and addMovie are mentionend
// this is an alternative way of calling connecting them with redux
// another way is shown in MovieListView.js
export default connect(null, { getPatient })(
    PatientDashboard
);

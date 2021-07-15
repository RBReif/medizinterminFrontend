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


function PatientDashboard (props) {
  // props can be deconstructed into single variables, so you do not need to write "props." all the time
  let { match, getPatient } = props;

  // from redux store
  const selectedPatient = useSelector((state) => state.selectedPatient);
  const user = useSelector((state) => state.user);

  // state variable of this functional component
  //const [newMovie, setNewMovie] = React.useState(false);

 /* useEffect(() => {
    // get id of patient from URL
    let patientId = match.params._id;
    getPatient(patientId);
    //console.log(getPatient(patientId));
  }, [match.params]);*/

  let patientId = UserService.getCurrentUser().id
  console.log(getPatient(patientId))


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
          <h2>Hello Max Mustermann</h2>
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

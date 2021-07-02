import React, {useState} from "react";
import {Form, Container, Row, Col, Image, ListGroup} from "react-bootstrap";
import NewsList from "../../components/NewsList";
import CheckupList from "../../components/CheckupList";
import AppointmentCard from "../../components/AppointmentCard";
import App from "../../App";

const PatientDashboard = () => {

    return (<Container>
            <Row>
                <Col xs={8} md={3}> </Col>
            </Row>
            <br/>
            <Row>
                <Col></Col>
                <Col><h2>Hello Max Mustermann</h2></Col>
                <Col></Col>
            </Row>
            <br/>
            <Row>
                <Col><h3>News Center</h3></Col>
                <Col><h3>Upcoming Appointments</h3></Col>
                <Col><h3>Previous Appointments</h3></Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <NewsList></NewsList>
                    </Form>
                    <br/>
                    <h3>Recommended Checkup</h3>
                    <CheckupList/>
                </Col>
                <Col>
                    <Form>
                        <AppointmentCard/>
                        <br/>
                        <AppointmentCard/>
                        <br/>
                        <AppointmentCard/>
                    </Form>
                </Col>
                <Col>
                    <AppointmentCard/>
                </Col>
            </Row>
        </Container>
    );
};
export default PatientDashboard;

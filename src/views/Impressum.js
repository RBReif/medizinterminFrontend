import {Col, Container, Form, Image, Row} from "react-bootstrap";
import DynamicDropdown from "../components/Forms/DynamicDropdown";
import DynamicSwitch from "../components/Forms/DynamicSwitch";
import NewTimeSlot from "../components/NewTimeSlot/NewTimeSlot";
import React from "react";
const ImpressumView = (props) => {

    return (
        <Container>
            <h2><strong>Impressum</strong></h2>

            <p>Welcome to medizintermin!</p>

           We are Chris, Max, Mehul and Roland and we created this WebApplication during the course "Software Engineering for business applications (Webapplication) master
            course.
             We are reachable via medizintermin@tum.de

        </Container>
    );
};

export default ImpressumView;

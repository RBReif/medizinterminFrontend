import {Container} from "react-bootstrap";
import React from "react";
import Page from "../components/Page";


const ImpressumView = (props) => {
    return (
        <Page>
        <Container>
            <h2><strong>Impressum</strong></h2>

            <p>Welcome to medizintermin!</p>

           We are Chris, Max, Mehul and Roland and we created this WebApplication during the course "Software Engineering for business applications (Webapplication) master
            course.
             We are reachable via medizintermin@tum.de

        </Container>
        </Page>
    );
};

export default ImpressumView;

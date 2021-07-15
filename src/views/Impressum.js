import {Container} from "react-bootstrap";
import React from "react";
import Page from "../components/Page";
import {ThemeProvider} from "@material-ui/styles";
import {Theme} from "../components/UI/Theme"


const ImpressumView = (props) => {
    return (
        <ThemeProvider theme={Theme}>
        <Page>
        <Container>
            <h2><strong>Impressum</strong></h2>

            <p>Welcome to medizintermin!</p>

           We are Chris, Max, Mehul and Roland and we created this WebApplication during the course "Software Engineering for business applications (Webapplication) master
            course.
             We are reachable via medizintermin@tum.de

        </Container>
        </Page>
    </ThemeProvider>
    );
};

export default ImpressumView;

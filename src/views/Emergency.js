import {Container} from "react-bootstrap";
import React from "react";
import Page from "../components/Page";

const EmergencyView = (props) => {

    return (
        <Page>
        <Container>
            <h2><strong>In case of an emergency, call 112</strong></h2>
            <p>
            Further information can be found <a href=" https://www.malteser.de/aware/hilfreich/notrufnummern-in-deutschland-das-musst-du-wissen.html" target="_blank">here</a>.
            </p>

        </Container>
        </Page>
    );
};

export default EmergencyView;

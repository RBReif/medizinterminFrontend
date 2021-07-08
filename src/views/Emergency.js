import {Col, Container, Form, Image, Row} from "react-bootstrap";
import React from "react";
const EmergencyView = (props) => {

    return (
        <Container>
            <h2><strong>In case of an emergency, call 112</strong></h2>
            <p>
            Further information can be found <a href=" https://www.malteser.de/aware/hilfreich/notrufnummern-in-deutschland-das-musst-du-wissen.html" target="_blank">here</a>.
            </p>

        </Container>
    );
};

export default EmergencyView;

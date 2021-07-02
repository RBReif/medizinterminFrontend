import {Col, Row, Container} from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup'
import React from "react";
import GenericButton from "./GenericButton";


const CheckupList = (props) => {
    return (
        <ListGroup>
            <ListGroup.Item>
                <Container>
                    <Row>
                        <Col sm={7}>
                            <h6>Full Body Checkup</h6> Due in August '21
                        </Col>
                        <Col sm={5}>
                            <GenericButton variant="outline-primary" title="Book an Appointment" size="sm"
                                           path="/"></GenericButton>
                        </Col>
                    </Row>
                </Container>
            </ListGroup.Item>
            <ListGroup.Item>
                <Container>
                    <Row>
                        <Col sm={7}>
                            <h6>Teeth Cleaning</h6> Due in September '21
                        </Col>
                        <Col sm={5}>
                            <GenericButton variant="outline-primary" title="Book an Appointment" size="sm"
                                           path="/"></GenericButton>
                        </Col>
                    </Row>
                </Container>
            </ListGroup.Item>
            <ListGroup.Item>
                <Container>
                    <Row>
                        <Col sm={7}>
                            <h6>Cancer Screening</h6> Due in December '21
                        </Col>
                        <Col sm={5}>
                            <GenericButton variant="outline-primary" title="Book an Appointment" size="sm"
                                           path="/"></GenericButton>
                        </Col>
                    </Row>
                </Container>
            </ListGroup.Item>
        </ListGroup>
    )
};

export default CheckupList;

import {Form, Button, Container, Col, Row} from "react-bootstrap";
import DynamicDropdown from "../components/Forms/DynamicDropdown";
import React from "react";

const healthinsurancelist = [
    {displayname: "Public"},
    {displayname: "Private"},
];


const Register = () => {
    return (
        <Container>
            <h2>Sign-up for patients</h2>
            <Form>
                <Row>
                    <Col>
                        <Form.Label> First name </Form.Label>
                        <Form.Control placeholder="Fresh"/>
                    </Col>
                    <Col>
                        <Form.Label> Last name </Form.Label>
                        <Form.Control placeholder="Hermann"/>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="fresh.hermann@tum.de"/>
                    </Col>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password"/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="Boltzmanstraße 3"/>
                    </Col>

                    <Col>
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control placeholder=""/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col> <Form.Label>City</Form.Label>
                        <Form.Control placeholder="Garching"/>
                    </Col>
                    <Col>
                        <Form.Label>Zip</Form.Label>
                        <Form.Control placeholder="85748"/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <DynamicDropdown
                            label="Health insurance"
                            items={healthinsurancelist}
                        ></DynamicDropdown>
                    </Col>
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Age</Form.Label>
                        <Form.Control placeholder="35"/>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Agree to terms and conditions"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default Register;
import {Form, Button, Container, Col, Row} from "react-bootstrap";
import DynamicDropdown from "../../components/components-chris/forms/DynamicDropdown";
import React from "react";
import DynamicSwitch from "../../components/components-chris/forms/DynamicSwitch";

const languagelist = [{displayname: "none"}, { displayname: "French" }, { displayname: "Turkish" }, {displayname: "Spanish"}];
const doctorlist = [
    { id: "1", displayname: "Dentist" },
    { id: "2", displayname: "Cardiologist" },
    { id: "2", displayname: "Something" },
    { id: "2", displayname: "More" },
];

const RegisterProfessionals = () => {
    return (
        <Container>
            <h2>Sign-up for medical professionals</h2>
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
                        <Form.Label>Office address</Form.Label>
                        <Form.Control placeholder="Boltzmanstraße 3"/>
                    </Col>

                    <Col>
                        <Form.Label>Office address (2nd line)</Form.Label>
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
                <br/>
                <br/>
                <Row>
                    <Col>
                        <DynamicDropdown
                            label="What is your area of expertise?"
                            items={doctorlist}
                        ></DynamicDropdown>
                    </Col>
                </Row>
                <Row>
                        <Col>
                        <DynamicSwitch
                            id="custom-switch-1"
                            label="Wheel chair availability provided"
                        />
                        <DynamicSwitch id="custom-switch-2" label="Elevator available" />
                        </Col>
                        <Col>
                        <DynamicSwitch id="custom-switch-3" label="Car parking nearby" />
                        <DynamicSwitch
                            id="custom-switch-4"
                            label="Public transport station nearby"
                        />
                            </Col>
                        <Col>
                            <DynamicSwitch id="custom-switch-5" label="I speak English fluently" />
                            <DynamicSwitch id="custom-switch-6" label="I speak German fluently" />

                        </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                    <Col>
                <DynamicDropdown
                    label="Further language capability (I)"
                    items={languagelist}
                ></DynamicDropdown>
                    </Col>
                    <Col>
                        <DynamicDropdown
                            label="Further language capability (II)"
                            items={languagelist}
                        ></DynamicDropdown>
                    </Col>
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

export default RegisterProfessionals;
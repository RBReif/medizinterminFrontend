import {Form, Button, Container, Col, Row} from "react-bootstrap";
import DynamicDropdown from "../components/Forms/DynamicDropdown";
import React from "react";
import DynamicSwitch from "../components/Forms/DynamicSwitch";
import Page from "../components/Page";
import MultiSelectDropdown from "../components/Forms/MultiSelectDropdown";

const languagelist = [
    { displayname: "German" },
    { displayname: "English" },
    { displayname: "Russian"},
    { displayname: "Turkish"},
    { displayname: "French"}
];
const doctorlist = [
    { id: "1", displayname: "Dentist" },
    { id: "2", displayname: "Cardiologist" },
    { id: "2", displayname: "Something" },
    { id: "2", displayname: "More" },
];

const RegisterProfessionals = () => {
    return (
        <Page>
        <Container>
            <h2>Sign-up for medical professionals</h2>
            <Form>
                <h4>Login information</h4>
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
                <h4>Address information</h4>
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

                <h4>What do you offer your patients?</h4>
                <Row>
                    <Col>
                        <DynamicDropdown
                            label="What is your area of expertise?"
                            items={doctorlist}
                        ></DynamicDropdown>
                    </Col>
                    <Col>

                            <label htmlFor="img">Profile picture:</label>
                            <br/>

                        <Form.File
                            id="img"
                            label="Select your profile picture"
                            accept="image/*"
                            custom
                        />
                        <Form.Text className="text-muted">
                            You can upload a profile picture to leave a good first impression
                        </Form.Text>
                    </Col>
                </Row>
                <Row>
                    <br/>
                    <Col>
                        <MultiSelectDropdown
                            label="Please choose your preferred language"
                            items={languagelist}
                        ></MultiSelectDropdown>
                    </Col>
                        <Col>
                        <DynamicSwitch
                            id="custom-switch-1"
                            displayname="Wheel chair availability provided"
                        />
                        <DynamicSwitch id="custom-switch-2" displayname="Elevator available" />
                        </Col>
                        <Col>
                        <DynamicSwitch id="custom-switch-3" displayname="Car parking nearby" />
                        <DynamicSwitch
                            id="custom-switch-4"
                            displayname="Public transport station nearby"
                        />
                        </Col>
                </Row>
                <br/>
                <br/>
                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Agree to terms and conditions"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
        </Page>
    );
};

export default RegisterProfessionals;
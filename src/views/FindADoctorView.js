import React, { useState } from "react";
import DynamicDropdown from "../components/Forms/DynamicDropdown";
import DynamicSwitch from "../components/Forms/DynamicSwitch";
import { Form, Container, Row, Col, Image} from "react-bootstrap";
import NewTimeSlot from "../components/NewTimeSlot/NewTimeSlot";
import TimeSlots from "../components/TimeSlots//TimeSlots";
import Button from "react-bootstrap/esm/Button";
import {Link} from "react-router-dom";

const healthinsurancelist = [
  { displayname: "Public" },
  { displayname: "Private" },
];
const languagelist = [{ displayname: "German" }, { displayname: "English" }];
const doctorlist = [
  { id: "1", displayname: "Dentist" },
  { id: "2", displayname: "Cardiologist" },
  { id: "2", displayname: "Something" },
  { id: "2", displayname: "More" },
];

const toggles = [{id: "1", displayname: "Wheelchair availability needed?"}, {id: "2", displayname: "Elevator needed"}, {id: "3", displayname: "Car parking nearby"}, {id: "4", displayname: "Public transportation station nearby"}];

const FindADoctorView = () => {
  const [timeslots, setTimeSlots] = useState("");

  const addTimeSlotHandler = (timeslot) => {
    setTimeSlots((prevTimeSlots) => {
      return [timeslot, ...prevTimeSlots];
    });
  };

  return (
    <Container>
      <Row>
        <Col xs={6} md={3}>
        <Image src="https://cdn.wallpapersafari.com/50/89/0v7Nyc.jpg/" responsive /></Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <DynamicDropdown
              label="Please choose the type of doctor you need"
              items={doctorlist}
            ></DynamicDropdown>
          </Form>
        </Col>
        <Col>
          <DynamicDropdown
            label="Please choose your preferred language"
            items={languagelist}
          ></DynamicDropdown>
          <DynamicDropdown
            label="Please choose your health insurance"
            items={healthinsurancelist}
          ></DynamicDropdown>
          <div>
          {toggles.map((toggle) => {
            return <DynamicSwitch id={toggle.id} displayname={toggle.displayname}></DynamicSwitch>;
          })}
          </div>
          {/* <LocationSetter/> */}
        </Col>
        <Col>
          <Col>When are you usually free?</Col>
          <Col>
            <NewTimeSlot onAddTimeSlot={addTimeSlotHandler} />
            <TimeSlots items={timeslots} />
          </Col>
        </Col>
      </Row>
      <Row>
        <Col>Lorem</Col>
        <Col>
          <br/>
          <br/>
          <Button variant="outline-primary"><Link to="/results">Find an appointment</Link></Button>{''}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default FindADoctorView;

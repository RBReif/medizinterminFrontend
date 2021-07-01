import React, { useState } from "react";
import DynamicDropdown from "../../components/components-chris/forms/DynamicDropdown";
import DynamicSwitch from "../../components/components-chris/forms/DynamicSwitch";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import NewTimeSlot from "../../components/components-chris/NewTimeSlot/NewTimeSlot";
import TimeSlots from "../../components/components-chris/TimeSlots/TimeSlots";

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

const DUMMY_DATE = [
  {
    id: "1",
    date: new Date(2021, 2, 28),
  },
];

const FindADoctorView = () => {
  const [timeslots, setTimeSlots] = useState(DUMMY_DATE);

  const addTimeSlotHandler = (timeslot) => {
    setTimeSlots(prevTimeSlots => {
      return [timeslot, ...prevTimeSlots];
    });
  };

  return (
    <Container>
      <Row>
        <Col>Lorem Ipsum</Col>
        <Col>2 of 2</Col>
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
            <DynamicSwitch
              id="custom-switch-1"
              label="Wheel chair availability needed"
            />
            <DynamicSwitch id="custom-switch-2" label="Elevator needed" />
            <DynamicSwitch id="custom-switch-3" label="Car parking nearby" />
            <DynamicSwitch
              id="custom-switch-4"
              label="Public transport station nearby"
            />
          </div>
          {/* <LocationSetter/> */}
        </Col>
        <Col>
          <div>When are you usually free?</div>
          <div>
            <NewTimeSlot onAddTimeSlot={addTimeSlotHandler} />
            {/* <TimeSlots items={timeslots}/> */}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>Lorem</Col>
        <Col>Ipsum</Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default FindADoctorView;

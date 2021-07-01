import DynamicDropdown from "../../components/components-chris/forms/DynamicDropdown";
import DynamicSwitch from "../../components/components-chris/forms/DynamicSwitch";
import { Form, Container, Row, Col } from "react-bootstrap";
import LocationSetter from "../../components/components-chris/forms/LocationSetter";

const FindADoctorView = (props) => {
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
              label="What Doctor Do You Need?"
              items={doctorlist}
            ></DynamicDropdown>
          </Form>
        </Col>
        <Col>
          <DynamicDropdown
            label="What Language Should The Doctor Speak?"
            items={languagelist}
          ></DynamicDropdown>
          <DynamicDropdown
            label="Please Choose Your Health Insurance"
            items={healthinsurancelist}
          ></DynamicDropdown>
          <div>
            <DynamicSwitch id="custom-switch-1" label="Wheel chair availability needed"/>
            <DynamicSwitch id="custom-switch-2" label="Elevator needed" />
            <DynamicSwitch id="custom-switch-3" label="Car parking nearby" />
            <DynamicSwitch id="custom-switch-4" label="Public transport station nearby"/>
          </div>
          {/* <LocationSetter/> */}
        </Col>
        <Col>When are you usually free?</Col>
      </Row>
    </Container>
  );
};

export default FindADoctorView;

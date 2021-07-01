import FindADoctorForm from "../../components/components-chris/forms/FindADoctorForm";
import LanguageForm from "../../components/components-chris/forms/LanguageForm";
import HealthInsuranceForm from "../../components/components-chris/forms/HealthInsuranceForm";
import DisabilitySwitches from "../../components/components-chris/forms/DisabilitySwitches";
import { Form, Container, Row, Col } from "react-bootstrap";

const FindADoctorView = (props) => {
  return (
    <Container>
      <Row>
        <Col>Lorem Ipsum</Col>
        <Col>2 of 2</Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <div>
              <FindADoctorForm />
            </div>
          </Form>
        </Col>
        <Col>
            <LanguageForm />
            <HealthInsuranceForm/>
            <DisabilitySwitches/>
        </Col>
      </Row>
    </Container>
  );
};

export default FindADoctorView;

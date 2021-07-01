import { Form, FormCheck } from "react-bootstrap";
import Card from "../UI/Card";

const DynamicSwitch = (props) => {
  return (
    <Card>
    <Form>
      <Form.Check type="switch" id={props.id} label={props.label} />
    </Form>
    </Card>
  );
};

export default DynamicSwitch;

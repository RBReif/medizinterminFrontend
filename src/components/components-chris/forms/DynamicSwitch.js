import { Form, FormCheck } from "react-bootstrap";
import Card from "../UI/Card";

const DynamicSwitch = (props) => {
  return (
    <Form>
      <Form.Check type="switch" id={props.id} label={props.label} />
    </Form>
  );
};

export default DynamicSwitch;

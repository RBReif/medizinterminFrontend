import { Form } from "react-bootstrap";

const DynamicSwitch = (props) => {
  return (
    <Form>
      <Form.Check type="switch" id={props.id} label={props.label} />
    </Form>
  );
};

export default DynamicSwitch;

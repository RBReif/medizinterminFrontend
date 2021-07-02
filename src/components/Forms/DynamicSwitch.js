import { Form } from "react-bootstrap";
import { useState } from "react";

const DynamicSwitch = (props) => {
  const [done, setDone] = useState(false);

  function handleClick() {
    setDone(!done);
}

console.log(done);

  return (
    <div>
    <Form>
      <Form.Label>{props.displayname}</Form.Label>
      <Form.Check onClick={handleClick} type="switch" id={props.id} label={done ? "Yes" : "No"}></Form.Check>
    </Form>
    </div>
  );
};

export default DynamicSwitch;

import { Form } from "react-bootstrap";


const DynamicDropdown = (props) => {
  return (
    <Form>
      <Form.Group controlId={props.id}>
        <Form.Label>
          <p>{props.label}</p>
        </Form.Label>
        <Form.Control as="select">
          {props.items.map((item) => {
            return <option>{item.displayname}</option>;
          })}
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default DynamicDropdown;

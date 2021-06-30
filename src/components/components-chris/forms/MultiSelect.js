import { Form } from "react-bootstrap";
import Card from "../UI/Card";

const MultiSelect = (props) => {
const test = [{title: 'a'}, {title: 'b'},{title: 'c'}];
const todo = [{title: "one"}, {title: "two"}, {title: "three"}];
  return (
    <Card className="Multiselect">
      <Form>
        <Form.Group controlId="1">
          <Form.Label>{props.label}</Form.Label>
          <Form.Control as="select">
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </Card>
  );
};

export default MultiSelect;

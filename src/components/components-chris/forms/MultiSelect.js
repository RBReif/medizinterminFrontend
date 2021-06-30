import { Form } from "react-bootstrap";
import Card from "../UI/Card";

const MultiSelect = (props) => {
  const test = [
    { displayname: "agggg" },
    { displayname: "b" },
    { displayname: "c" },
  ];
  let items = [];

  if (typeof props.items !== "undefined") {
    let items = Array.from(props.items);
  }

  return (
    <Card className="Multiselect">
      <Form>
        <Form.Group controlId="1">
          <Form.Label>{props.label}</Form.Label>
          <Form.Control as="select">
            {props.items.map((item) => {
              return <option>{item.displayname}</option>;
            })}
          </Form.Control>
        </Form.Group>
      </Form>
    </Card>
  );
};

export default MultiSelect;

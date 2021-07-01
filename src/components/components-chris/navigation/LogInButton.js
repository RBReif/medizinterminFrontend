import { Button, Dropdown, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";


const LogIn = (props) => {
  return (
    <Button
      variant="outline-primary"
      menuAlign="right"
      title="Log-In"
      id="dropdown-menu-align-right"
      // href="/login"
    >
      <Link to="/login">Login</Link>
      {/* <Dropdown.Item>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
      </Dropdown.Item>
      <Dropdown.Item>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Dropdown.Item> */}
    </Button>
  );
};

export default LogIn;

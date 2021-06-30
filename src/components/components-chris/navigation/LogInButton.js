import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const LogIn = (props) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Log In
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>Log-In</Dropdown.Item>
        <Dropdown.Item>Sign-Up</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LogIn;

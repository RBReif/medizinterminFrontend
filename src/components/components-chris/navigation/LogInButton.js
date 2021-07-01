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
    </Button>
  );
};

export default LogIn;

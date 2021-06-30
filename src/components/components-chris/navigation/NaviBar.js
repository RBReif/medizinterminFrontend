import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LogInButton from "./LogInButton";

const routes = [
  { path: "/", displayname: "Home" },
  { path: "/medics", displayname: "Are You a Doctor?" },
  { path: "patients", displayname: "For Patients" },
];

const NaviBar = (props) => {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">medizintermin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <Nav.Link  href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              {/* <Link to ="/medics">Are You a Doctor?</Link> */}
              <Nav.Link href="/medics">Are You a Doctor?</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <LogInButton/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default NaviBar;

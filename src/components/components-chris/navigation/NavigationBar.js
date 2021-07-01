import {
  Navbar,
  Nav,
} from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LogInButton from "./LogInButton";
import TestButton from "../TestButton";

const routes = [
  { path: "/", displayname: "Home" },
  { path: "/medics", displayname: "Are You a Doctor?" },
];

const NaviBar = (props) => {
  return (
    <header>
      <Navbar bg="light" expand="lg">
      <Link to="/" className="navbar-brand">medizintermin</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
              {routes.map((route)=> {
                    return (
                        <Nav.Item>
                          <Link to={route.path} className="nav-link">{route.displayname}</Link>
                        </Nav.Item>
                    );
                })}
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

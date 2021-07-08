import {
  Navbar,
  Nav,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LogInButton from "./LogInButton";
// import KebabMenu from "./KebabMenu";

const routes = [
  { path: "/", displayname: "Home" },
  { path: "/medics", displayname: "Are You a Doctor?" },
];

const NavigationBar = (props) => {
  return (
    <header>
      <Navbar  collapseOnSelect bg="dark" variant="dark" expand="lg">
      <Link to="/" className="navbar-brand">medizintermin</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav  className="mr-auto">
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
            {/* <KebabMenu/> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default NavigationBar;

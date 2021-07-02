import {
    Navbar,
    Nav,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const routes = [
    { path: "/terms", displayname: "Terms and Conditions" },
    { path: "/impressum", displayname: "Impressum" },
    { path: "/emergency", displayname: "Emergency" },


];

const Footer = (props) => {
    return (
        <footer>
            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {routes.map((route)=> {
                            return (
                                <Nav.Item>
                                    <Link to={route.path} className="nav-link">{route.displayname}</Link>
                                </Nav.Item>
                            );
                        }                        )}

                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        </footer>
    );
};

export default Footer;

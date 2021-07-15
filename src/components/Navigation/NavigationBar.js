import {
    Navbar,
    Nav,
} from "react-bootstrap";
import React from "react";
import {withRouter, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {connect, useSelector} from "react-redux";
import {Theme} from "../UI/Theme";
import {ThemeProvider} from "@material-ui/styles";
import { Button } from "@material-ui/core";
import KebabMenu from "./KebabMenu";

const routes = [
    {path: "/", displayname: "Home"},
];

const NavigationBar = (props) => {

    const [menuAnchor, setMenuAnchor] = React.useState(null);

    return (
        <header>
            <ThemeProvider theme={Theme}>
                <Navbar collapseOnSelect bg="light" variant="light" expand="lg">
                    <Link to="/" className="navbar-brand">medizintermin</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {routes.map((route) => {
                                return (
                                    <Nav.Item>
                                        <Link to={route.path} className="nav-link">{route.displayname}</Link>
                                    </Nav.Item>
                                );
                            })}
                        </Nav>
                        <Nav>
                            <Button color="secondary" href="/medics">Are You a Doctor?</Button>
                            {/* <LogInButton/> */}
                            {/*<KebabMenu
                                open={Boolean(menuAnchor)}
                                anchor={menuAnchor}
                                onClose={() => setMenuAnchor(null)}
                            />*/}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </ThemeProvider>
        </header>
    );
};

export default withRouter(NavigationBar);

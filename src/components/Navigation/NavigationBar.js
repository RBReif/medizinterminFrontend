import {
    Navbar,
    Nav,
} from "react-bootstrap";
import React from "react";
import {withRouter, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {connect, useSelector} from "react-redux";
import { logout } from "../../redux/actions";
import {Theme} from "../UI/Theme";
import {ThemeProvider} from "@material-ui/styles";
import { Button } from "@material-ui/core";
import KebabMenu from "./KebabMenu";

const routes = [
    {path: "/", displayname: "Home"},
];


const NavigationBar = (props) => {

    const [menuAnchor, setMenuAnchor] = React.useState(null);

    const onClickLogout = () => {
        // trigger redux logout action
        //props.dispatch(logout());
        logout();
        // navigate to the home page
        props.history.push("/");
    };

    const onClickAreYouADoctor = () => {
        // trigger redux logout action
        //props.dispatch(logout());
        logout();
        // navigate to the healthcare professional login
        props.history.push("/login-professionals");
    };

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
                            <Button color="secondary" onClick={onClickAreYouADoctor}>Are You a Doctor?</Button>
                            {/* <LogInButton/> */}
                            {/*<KebabMenu
                                open={Boolean(menuAnchor)}
                                anchor={menuAnchor}
                                onClose={() => setMenuAnchor(null)}
                            />*/}
                        </Nav>
                        <Nav>
                            <Button onClick={onClickLogout}>Logout</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </ThemeProvider>
        </header>
    );
};

export default withRouter(NavigationBar);

import {
    Navbar,
    Nav,
} from "react-bootstrap";
import React, {useRef, useState} from "react";
import {withRouter, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {connect, useSelector} from "react-redux";
import {logout} from "../../redux/actions";
import {Theme} from "../UI/Theme";
import {ThemeProvider} from "@material-ui/styles";
import {Button} from "@material-ui/core";
import KebabMenu from "./KebabMenu";
import MenuIcon from "@material-ui/icons/Menu";

const routes = [
    {path: "/find-doctor", displayname: "Home"},
];


const NavigationBar = (props) => {

    const userData = useSelector((state) => {
        // return the currently logged in user from redux store
        return state.user;
    });

    const [anchorEl, setAnchorEl] = React.useState(null);
    const ref = useRef(null)
    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const onClickLogout = () => {
        // trigger redux logout action
        props.dispatch(logout());
        //logout();
        // navigate to the home page
        props.history.push("/");
    };

    const onClickAreYouADoctor = () => {
        // navigate to the healthcare professional login
        props.history.push("/login-professionals");
        console.log(window.location.href)
    };

    const onClickAreYouAPatient = () => {
        // navigate to the patient login
        props.history.push("/login-patients");
    };

    return (
        <header>
            <ThemeProvider theme={Theme}>

                <Navbar expand={"xl"} bg="light" variant="light">

                    <Link to="/find-doctor" className="navbar-brand">medizintermin</Link>
                    <Nav className="ml-auto">
                        <div>
                            {userData.user
                                ? [<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                    <MenuIcon/>
                                </Button>]
                                : window.location.href == 'http://localhost:3000/login-professionals' || window.location.href == 'http://localhost:3000/register-professionals' ?
                                    [<Button style={{marginRight: 5}} color="secondary"
                                             onClick={onClickAreYouAPatient}>Are
                                        You a Patient?</Button>]
                                    : [<Button style={{marginRight: 5}} color="secondary"
                                               onClick={onClickAreYouADoctor}>Are
                                        You a Doctor?</Button>]
                            }
                        </div>
                    </Nav>

                </Navbar>
                <KebabMenu
                    color="secondary"
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={!!anchorEl}
                    onClose={handleClose}/>


            </ThemeProvider>
        </header>
    );
};

export default withRouter(NavigationBar);

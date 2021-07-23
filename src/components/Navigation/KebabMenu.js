import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {logout} from "../../redux/actions";
import {Menu, MenuItem, Avatar, Divider} from "@material-ui/core";
import {connect, useSelector} from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import {Dashboard} from "@material-ui/icons";
import TodayIcon from '@material-ui/icons/Today';

const useStyles = makeStyles((theme) => ({
    menuitem: {
        display: "flex",
        minWidth: "200px",
    },
    avatar: {
        marginRight: theme.spacing(1),
    },
}));

/**
 * Menu for user managment
 * @param {props} props
 */
function KebabMenu(props) {
    const classes = useStyles();

    const userData = useSelector((state) => {
        // return the currently logged in user from redux store
        return state.user;
    });

    const onClickLogin = () => {
        // close this menu
        props.onClose();
        // navigate to the login page
        props.history.push("/login-patients");
    };

    const onClickProfile = () => {
        // close this menu
        props.onClose();
        // navigate to the doctor dashboard
        props.history.push("/edit-profile");
    };

    const onClickDoctorDashboard = () => {
        // close this menu
        props.onClose();
        // navigate to the doctor dashboard
        props.history.push("/doctor-dashboard");
    };

    const onClickPatientDashboard = () => {
        // close this menu
        props.onClose();
        // navigate to the doctor dashboard
        props.history.push("/dashboard");
    };

    const onClickCalendar = () => {
        // close this menu
        props.onClose();
        // navigate to the doctor calendar
        props.history.push("/doctor-daily-plan");
    };

    const onClickLogout = () => {
        // trigger redux logout action
        props.dispatch(logout());
        //logout();
        // close this menu
        props.onClose();
        // navigate to the home page
        props.history.push("/");
    };
    useEffect(() => {
    }, [userData]);

    return (
        <Menu
            open={props.open}
            anchorEl={props.anchorEl}
            onClose={props.onClose}
        >
            {userData?.user?.role === 'DOCTOR'
                ? [
                    <MenuItem
                        key="user"
                        onClick={onClickProfile}
                        className={classes.menuitem}>
                        <Avatar src={userData.user.thumbnail}>
                        </Avatar>
                        {userData.user.username}
                    </MenuItem>,
                    <Divider key="divider"/>,
                    <MenuItem
                        key="dashboard"
                        onClick={onClickDoctorDashboard}
                        className={classes.menuitem}
                    >
                        <Dashboard className={classes.avatar}/>
                        Dashboard
                    </MenuItem>,
                    <Divider key="divider"/>,
                    <MenuItem
                        key="calendar"
                        onClick={onClickCalendar}
                        className={classes.menuitem}
                    >
                        <TodayIcon className={classes.avatar}/>
                        Calendar
                    </MenuItem>,
                    <Divider key="divider"/>,
                    <MenuItem
                        key="logout"
                        onClick={onClickLogout}
                        className={classes.menuitem}
                    >
                        <ExitToAppIcon className={classes.avatar}/>
                        Logout
                    </MenuItem>
                ]
                : userData?.user?.role === 'PATIENT'
                    ? [<MenuItem
                        key="user"
                        onClick={onClickProfile}
                        className={classes.menuitem}>
                        <Avatar src={userData.user.thumbnail}>
                        </Avatar>
                        {userData.user.username}
                    </MenuItem>,
                        <Divider key="divider"/>,
                        <MenuItem
                            key="dashboard"
                            onClick={onClickPatientDashboard}
                            className={classes.menuitem}
                        >
                            <Dashboard className={classes.avatar}/>
                            Dashboard
                        </MenuItem>,
                        <Divider key="divider"/>,
                        <MenuItem
                            key="logout"
                            onClick={onClickLogout}
                            className={classes.menuitem}
                        >
                            <ExitToAppIcon className={classes.avatar}/>
                            Logout
                        </MenuItem>
                    ]
                    : [
                        <MenuItem
                            key="login"
                            onClick={onClickLogin}
                            className={classes.menuitem}
                        >
                            <VerifiedUserIcon className={classes.avatar}/>
                            Login
                        </MenuItem>
                    ]}
        </Menu>
    );
}

// attributes of props and their type
KebabMenu.propTypes = {
    onClose: PropTypes.func.isRequired,
    anchor: PropTypes.element,
    open: PropTypes.bool.isRequired,
};

export default connect()(withRouter(KebabMenu));
//export default KebabMenu;
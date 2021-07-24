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
import PatientService from "../../services/PatientService";
import UserService from "../../services/UserService";
import DoctorService from "../../services/DoctorService";

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

    let patientId = UserService.getCurrentUser().id;
    let doctorId = DoctorService.getCurrentUser().id;

    const [patientName, setPatientName] = React.useState("");
    const [patientPicture, setPatientPicture] = React.useState("");

    const [doctorName, setDoctorName] = React.useState("");
    const [doctorPicture, setDoctorPicture] = React.useState("");

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
        props.history.push("/patient-edit-profile");
    };

    const onClickDoctorProfile = () => {
        // close this menu
        props.onClose();
        // navigate to the doctor dashboard
        props.history.push("/doctor-edit-profile");
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
        // close this menu
        props.onClose();
        // navigate to the home page
        props.history.push("/");
    };

    const getPatient = async () => {
        const patient = await PatientService.getPatient(patientId);
        setPatientName(patient.firstname);
        setPatientPicture(patient.thumbnail);

    };

    const getDoctor = async () => {
        const doctor = await DoctorService.getDoctor(doctorId);
        setDoctorName(doctor.firstname);
        setDoctorPicture(doctor.thumbnail);

    };

    useEffect(async () => {
        switch (userData?.user?.role) {
            case 'PATIENT':
                getPatient();
            case'DOCTOR':
                getDoctor();
            default:
        }

    }, [userData]);

    return (
        <Menu
            open={props.open}
            anchorEl={props.anchorEl}
            onClose={props.onClose}
        >
            {userData?.user?.role === 'DOCTOR'
                ? [<MenuItem
                    key="user"
                    onClick={onClickDoctorProfile}
                    className={classes.menuitem}>
                    <Avatar src={doctorPicture}>
                    </Avatar>
                    {doctorName}
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
                        <Avatar src={patientPicture}>
                        </Avatar>
                        {patientName}
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
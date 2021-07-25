import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {Button} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import {Theme} from "../UI/Theme";
import {ThemeProvider} from "@material-ui/styles";
import {Box} from "@material-ui/core";
import Ratings from "../Forms/Ratings";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AppointmentService from "../../services/AppointmentService";
import UserService from "../../services/UserService";
import PatientService from "../../services/PatientService";
import CalcDistance from "../Forms/Location/CalcDistance";
import DoctorService from "../../services/DoctorService";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import AlertDialog from "../Modal/Dialog";
import CallIcon from "@material-ui/icons/Call";


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

/**
 * For user login
 * @param {props} props
 */

const Doctor = (props) => {
    const classes = useStyles();
    const [showNumber, setShowNumber] = React.useState(false);
    const [avgAudienceRating, setAvgAudienceRating] = React.useState("");
    const [value, setValue] = React.useState(0);
    const [appointment, setAppointment] = React.useState("");
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [confirmMessage, setConfirmMessage] = React.useState(false);
    // const [appointmentID, setAppointmentID] = React.useState(0);

  const handleChange = (event, newValue) => {
    setAppointment("");
    setValue(newValue);
  };
    const onClickBooking = () => {
        setOpenDialog(true);
    };

    const onConfirmBooking = async () => {
        // booking happens here
        let patient = await PatientService.getPatient(
            UserService.getCurrentUser().id
        );
        let res = await AppointmentService.updateAppointment(
            appointment._id,
            "SCHEDULED",
            appointment.appointmentDetails,
            "Appointment with " + patient.firstname + " " + patient.lastname,
            UserService.getCurrentUser().id
        );

        let convertedDate = new Date(res.startPoint);
        let convertedDay = convertedDate.getDate();
        let convertedMonth = convertedDate.getMonth() + 1;
        let convertedYear = convertedDate.getFullYear();
        let convertedHour = convertedDate.getHours();
        let convertedMinutes =
            (convertedDate.getMinutes() < 10 ? "0" : "") +
            convertedDate.getMinutes();

        setOpenDialog(false);
        setConfirmMessage("Medizintermin booked your appointment on " +
            convertedDay +
            "." +
            convertedMonth +
            "." +
            convertedYear +
            " at " +
            convertedHour +
            ":" +
            convertedMinutes +
            "! Thank you for booking with us!")
        setOpenConfirm(true);
    };

    const onCloseConfirmation = () => {
        setOpenConfirm(false);
        props.history.push("/dashboard");
    };

    console.log("CURRENT USER", UserService.getCurrentUser());

    const extractRating = () => {
        if (!props.doctor) {
            return;
        }
        const getInitialRating = async () => {
            const audienceRating = await DoctorService.getRating(props.doctor._id);
            setAvgAudienceRating(audienceRating.rating);
        };
        getInitialRating();
    };

    useEffect(() => {
        if (!props.new) {
            extractRating();
        }
    }, [props.doctor, props.new]);

    const handleNumberClick = () => {
        setShowNumber(!showNumber);
    };

    const dateChangeHandler = (event) => {
        return setAppointment(event.target.value);
    };

    let distance =
        Math.round(
            CalcDistance(
                props.patientAddress.lat,
                props.patientAddress.lng,
                props.doctor.address.lat,
                props.doctor.address.lng
            ) * 100
        ) / 100;

    return (
        <ThemeProvider theme={Theme}>
            <Card id={props.id} className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="doctor"
                            className={classes.avatar}
                            src={props.doctor.thumbnail}
                        ></Avatar>
                    }
                    action={
                        <Ratings avgAudienceRating={avgAudienceRating} readOnly={true}/>
                    }
                    title={
                        <b>
                            {props.doctor.firstname} {props.doctor.lastname}
                        </b>
                    } //query doctor name + profession
                    subheader={
                        <div>
                            {props.doctor.area_of_expertise} <br></br>
                            {distance} km away                      
                        </div>
                    }
                />
                <CardContent>
                    <div>
                        <Tabs
                            orientation="horizontal"
                            variant="scrollable"
                            value={value}
                            indicatorColor="primary"
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                            <Tab label="Appointment Details" {...a11yProps(0)} />
                            <Tab label="About" {...a11yProps(1)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            {/* <b>Appointment at</b> {props.appointment.startPoint} */}
                            <FormControl className={classes.formControl}>
                                <Select onClick={dateChangeHandler}>
                                    {props.appointments.map((item) => {
                                        let convertedDate = new Date(item.startPoint);
                                        let convertedDay = convertedDate.getDate();
                                        let convertedMonth = convertedDate.getMonth() + 1;
                                        let convertedYear = convertedDate.getFullYear();
                                        let convertedHour = convertedDate.getHours();
                                        let convertedMinutes =
                                            (convertedDate.getMinutes() < 10 ? "0" : "") +
                                            convertedDate.getMinutes();
                                        return (
                                            <MenuItem key={item._id} value={item}>
                                                {convertedDay}.{convertedMonth}.{convertedYear} at{" "}
                                                {convertedHour}:{convertedMinutes}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>{" "}
                            <Button
                                style={{marginLeft: 10}}
                                onClick={onClickBooking}
                                color="primary"
                                size="small"
                                disabled={appointment ? false : true}
                            >
                                Book Appointment
                            </Button>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {props.doctor.area_of_expertise}
                            <br></br>
                            <b>Address: </b> {props.doctor.address.address_value}
                            <br></br>
                            <b>Phone Number: </b>{props.doctor.phone_number}
                            <br></br>
                            <b>Languages:</b>{" "}
                            {props.doctor.languages.map((language) => {
                                return language + " ";
                            })}
                            <br></br>
                            <b>Special Facilties:</b>{" "}
                            {props.doctor.special_facilities.map((facility) => {
                                return facility + ", ";
                            })}
                        </TabPanel>
                    </div>
                </CardContent>
                <CardActions disableSpacing></CardActions>
                <AlertDialog
                    open={openDialog}
                    onCancel={() => setOpenDialog(false)}
                    onClose={onConfirmBooking}
                    secondButton={true}
                    title="Book Appointment"
                    text="Do you really want to book this appointment?"
                />
                <AlertDialog
                    open={openConfirm}
                    onClose={onCloseConfirmation}
                    secondButton={false}
                    title="Booked Appointment"
                    text={confirmMessage}
                />
            </Card>
        </ThemeProvider>
    );
};

export default connect()(withRouter(Doctor));

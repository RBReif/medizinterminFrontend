import {Form, Container, Row, Col} from "react-bootstrap";
import NewsList from "../components/NewsList";
import CheckupList from "../components/CheckupList";
//import AppointmentCard from "../components/";
import Page from "../components/Page";
import { ThemeProvider } from "@material-ui/styles";
import { Theme } from "../components/UI/Theme";
import DynamicCard from "../components/UI/DynamicCard";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    TextField
} from "@material-ui/core";
import DailyPlanCard from "../components/UI/DailyPlanCard";
import React, {useEffect, useState} from "react";
import AppointmentService from "../services/AppointmentService";
import PatientService from "../services/PatientService";
import DoctorService from "../services/DoctorService";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import {NavigateBefore, NavigateNext} from "@material-ui/icons";
import {IconButton} from "material-ui";
import {NavigateBeforeFontIcon, NavigateNextFontIcon, NavigateNextSVGIcon} from "react-md";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
        maxHeight: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
    },
    media: {
        paddingTop: "10.25%", // 16:9
        paddingBottom: "5%",
    },
    colorOne: {
        backgroundColor: "#E3CEA3",
    },
    colorTwo: {
        backgroundColor: "#BF866F",
    },
}));

const getCurrentDateString = (currentDate) => {

    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const getOrdinalDate = (number) => {
        let selector;

        if (number <= 0) {
            selector = 4;
        } else if ((number > 3 && number < 21) || number % 10 > 3) {
            selector = 0;
        } else {
            selector = number % 10;
        }

        return ""+ number + ['th', 'st', 'nd', 'rd', ''][selector];
    };
    const date = currentDate;
    return days[date.getDay()]+", "+months[date.getMonth()]+" "+getOrdinalDate(date.getDate())+" "+date.getFullYear();
}

const getTimeString = (date) => {

    // add leading zeros in the hours and minutes
    const addLeadingZerosToTimeComponent = (timeComponent) => {
        if (timeComponent < 10) {
            timeComponent = "0" + timeComponent;
        }
        return timeComponent;
    }
    date = new Date(date);
    return new String(addLeadingZerosToTimeComponent(date.getHours())+":"+addLeadingZerosToTimeComponent(date.getMinutes()));
}

const DoctorDailyPlanView = () => {
    const classes = useStyles();
    const [previousDate, setPreviousDate] = useState(null);
    const [currentDate, setCurrentDate] = useState(previousDate != null? previousDate : new Date());
    const [currentDateString, setCurrentDateString] = useState(getCurrentDateString(currentDate));
    const [appointmentDetailsList, setAppointmentDetailsList] = useState([]);
    let doctorID = DoctorService.getCurrentUser().id;
    const [appointments, setAppointments] = useState([]);
    const [appointmentDetails, setAppointmentDetails] = useState();
    const [cardSelected, changeCardSelected] = useState(0);
    const [openCommentsBox, setOpenCommentsBox] = React.useState(false);
    //console.log(doctorID);

    const handleClickOpen = () => {
        setOpenCommentsBox(true);
    };

    const handleClose = () => {
        setOpenCommentsBox(false);
    };

    const handleSave = () => {
        appointmentDetails['comments'] = document.getElementById('new_comments').value;
        setAppointmentDetails(appointmentDetails);
        setOpenCommentsBox(false);
        AppointmentService.updateAppointment(appointmentDetails.appointment_id, appointmentDetails.status,
            appointmentDetails.comments, appointmentDetails.purpose, appointmentDetails.patient_id)
    }

    const deleteHandler = () => {
        if (window.confirm("Are you sure you want to cancel this appointment?")) {
            AppointmentService.deleteAppointment(appointmentDetails.appointment_id);
            setPreviousDate(currentDate);
        }
    }

    const navigateBeforeHandler = () => {
        const newDate = moment(currentDate).subtract(1, 'day').toDate();
        setCurrentDate(newDate);
        setCurrentDateString(getCurrentDateString(newDate));
    }

    const navigateNextHandler = () => {
        const newDate = moment(currentDate).add(1, 'day').toDate();
        setCurrentDate(newDate);
        setCurrentDateString(getCurrentDateString(newDate));
    }

    useEffect(async () => {
        let appointments = await AppointmentService.getAppointmentsDoctorForGivenDateAndStatus(doctorID, currentDate.getTime(), "SCHEDULED");
        setAppointments(appointments.map((item) => item));

        const fetchAppointments = async () => {
            let iterator = 0;
            setAppointmentDetailsList([]);
            setAppointmentDetails({});
            for (const appointment of appointments) {
                if (appointment.hasOwnProperty("patient") && appointment.patient != null) {
                    const patient = await PatientService.getPatient(appointment.patient);
                    const appointmentDetails = {
                        id: iterator,
                        date: currentDateString,
                        comments: appointment.appointmentDetails,
                        purpose: appointment.appointmentTitle,
                        start_time: getTimeString(new Date(appointment.startPoint)),
                        end_time: getTimeString(moment(new Date(appointment.startPoint)).add(30, "m").toDate()),
                        patient_name: patient.firstname + " " + patient.lastname,
                        patient_email: patient.username,
                        patient_insurance: patient.insurance,
                        patient_image: patient.thumbnail,
                        patient_id: patient,
                        appointment_id: appointment._id,
                        status: appointment.appointmentStatus,
                    };
                    setAppointmentDetailsList(appointmentDetailsList => [...appointmentDetailsList, appointmentDetails]);
                    if (iterator === 0) {
                        setAppointmentDetails(appointmentDetails);
                    }
                } else {
                    const appointmentDetails = {
                        id: iterator,
                        date: currentDateString,
                        comments: appointment.appointmentDetails,
                        purpose: appointment.appointmentTitle,
                        start_time: getTimeString(new Date(appointment.startPoint)),
                        end_time: getTimeString(moment(new Date(appointment.startPoint)).add(30, "m").toDate()),
                        patient_name: "-",
                        patient_email: "-",
                        patient_insurance: "-",
                        patient_image: "",
                        patient_id: null,
                        appointment_id: appointment._id,
                        status: appointment.appointmentStatus,
                    };
                    setAppointmentDetailsList(appointmentDetailsList => [...appointmentDetailsList, appointmentDetails]);
                }
                iterator++;
            }
        };
        fetchAppointments();
    }, [currentDateString, currentDate]);

    const clickHandler = (id) => (
        setAppointmentDetails(appointmentDetailsList[id]),
        changeCardSelected(id)
    );

    return (
        <ThemeProvider theme={Theme}>
            <Page>
                <Container fluid>
                    <h4>Agenda for the day</h4>
                    <Row>
                        <Col lg={60}>
                            &nbsp;
                            &nbsp;
                            <Button size={'small'} onClick={navigateBeforeHandler}><NavigateBefore ></NavigateBefore></Button>
                            <Button size={'small'} onClick={navigateNextHandler}><NavigateNext ></NavigateNext></Button>
                            <DynamicCard
                                variant="body2"
                                content={
                                    <div>
                                        <h5>{currentDateString}</h5>
                                        {appointmentDetailsList.map((item => (
                                                <div>
                                                    <p>
                                                    <DailyPlanCard item={item} onClick={clickHandler} color={cardSelected === item.id? "#D7C49EFF": "#FFFFFF"}></DailyPlanCard>
                                                    </p>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                }></DynamicCard>
                        </Col>
                        <Col xl>
                            <DynamicCard
                                variant="outline"
                                content={
                                    <div>
                                        <h5>{appointmentDetails?.purpose}</h5>
                                        <Row lg>
                                            <Col xl="8">
                                                <h6>
                                                    Date: {currentDateString}<br/>
                                                    Time: {appointmentDetails?.start_time} - {appointmentDetails?.end_time}
                                                    <br/>
                                                    <br/>
                                                    Comments: <div style={{whiteSpace: "pre-wrap"}}>{appointmentDetails?.comments}</div><br/><br/>
                                                </h6>
                                                <Row>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <Button onClick={handleClickOpen} disabled={appointmentDetailsList.length>0? false : true}>EDIT COMMENTS</Button>
                                                </Row>
                                            </Col>
                                            <Col>
                                                <Avatar src={appointmentDetails?.patient_image} alt="patient image"></Avatar><br/>
                                                <h6>Patient: {appointmentDetails?.patient_name}</h6>
                                                <h6>Email: {appointmentDetails?.patient_email}</h6>
                                                <h6>Insurance: {appointmentDetails?.patient_insurance}</h6>
                                                <br/>

                                                <Row>
                                                    <Button onClick={deleteHandler} disabled={appointmentDetailsList.length>0? false : true}>Cancel</Button>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                }
                            >
                            </DynamicCard>

                        </Col>
                    </Row>
                </Container>
                <Dialog open={openCommentsBox} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Comments</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit comments or remarks about the appointment and 'Save'
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="new_comments"
                            label="Comments"
                            type="comments"
                            fullWidth
                            multiline={true}
                            defaultValue={appointmentDetails?.comments}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Page>
        </ThemeProvider>

    );
};


export default DoctorDailyPlanView;
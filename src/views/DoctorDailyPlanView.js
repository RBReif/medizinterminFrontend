import {Form, Container, Row, Col} from "react-bootstrap";
import NewsList from "../components/NewsList";
import CheckupList from "../components/CheckupList";
//import AppointmentCard from "../components/";
import Page from "../components/Page";
import { ThemeProvider } from "@material-ui/styles";
import { Theme } from "../components/UI/Theme";
import DynamicCard from "../components/UI/DynamicCard";
import {Button, makeStyles} from "@material-ui/core";
import DailyPlanCard from "../components/UI/DailyPlanCard";
import React, {useState} from "react";

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

const DoctorDailyPlanView = () => {
    const classes = useStyles();
    const getOrdinalDate = (number) => {
        let selector;

        if (number <= 0) {
            selector = 4;
        } else if ((number > 3 && number < 21) || number % 10 > 3) {
            selector = 0;
        } else {
            selector = number % 10;
        }

        return number + ['th', 'st', 'nd', 'rd', ''][selector];
    };
    const appointment_details_list = [
        { id: 0, date: "Thursday, July 15th 2021", comments: "/", medical_records: "-", purpose: "Full Body checkup", start_time: "11:00", end_time: "11:30", patient_name: "Jacob Hoffmann", patient_email: "jacob.hoffmann@tum.de", patient_phone: "+4917820304055", patient_insurance: "PUBLIC"},
        { id: 1, date: "Thursday, July 15th 2021", comments: "/", medical_records: "Acute Diabetes", purpose: "Heart checkup", start_time: "11:30", end_time: "12:30", patient_name: "Helen McGrath", patient_email: "helen.mcgrath@tum.de", patient_phone: "4917820304066", patient_insurance: "PRIVATE"},
        { id: 2, date: "Thursday, July 15th 2021", comments: "/", medical_records: "Hypertension", purpose: "Hand surgery", start_time: "13:00", end_time: "14:00", patient_name: "Ram Kapoor", patient_email: "ram.kapoor@tum.de", patient_phone: "4917820304077", patient_insurance: "PUBLIC"}
    ]

    const [appointmentDetails, setAppointmentDetails] = useState(appointment_details_list[0]);
    const [cardSelected, changeCardSelected] = useState(0);
    //const [cardSelected, ]

    const clickHandler = (id) => (
        //console.log(id)
        setAppointmentDetails(appointment_details_list[id]),
        changeCardSelected(id)
    );
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const date = new Date();
    const currentDateString = days[date.getDay()]+", "+months[date.getMonth()]+" "+getOrdinalDate(date.getDate())+" "+date.getFullYear();
    return (
        <ThemeProvider theme={Theme}>
            <Page>
                <Container fluid>
                    <h4>Agenda for Today</h4>
                    <Row>
                        <Col lg={60}>
                            <DynamicCard
                                variant="body2"
                                content={
                                    <div>
                                        <h5>{currentDateString}</h5>
                                        {appointment_details_list.map((item => (
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
                                        <h5>{appointmentDetails.purpose}</h5>
                                        <Row lg>
                                            <Col xl="8">
                                                <h6>
                                                    Date: {currentDateString}<br/>
                                                    Time: {appointmentDetails.start_time} - {appointment_details_list[0].end_time}
                                                    <br/>
                                                    <br/>
                                                    Comments: {appointmentDetails.comments}<br/><br/>
                                                    Medical Records: {appointmentDetails.medical_records}
                                                </h6>
                                            </Col>
                                            <Col>
                                                <img src="sample.jpg" alt="patient image"></img><br/>
                                                <h6>Patient: {appointmentDetails.patient_name}</h6>
                                                <h6>Email: {appointmentDetails.patient_email}</h6>
                                                <h6>Phone: {appointmentDetails.patient_phone}</h6>
                                                <h6>Insurance: {appointmentDetails.patient_insurance}</h6>
                                                <br/>

                                                <Row>
                                                    <Button>Cancel</Button>&nbsp;&nbsp;&nbsp;
                                                    <Button>Reschedule</Button>
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
            </Page>
        </ThemeProvider>

    );
};
export default DoctorDailyPlanView;
import React, { useState, useEffect } from "react";
import NewsList from "../components/NewsList";
import Page from "../components/Page";
import { Theme } from "../components/UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import { Paper } from "@material-ui/core";
import PatientService from "../services/PatientService";
import UserService from "../services/UserService";
import AppointmentService from "../services/AppointmentService";
import { getPatient } from "../redux/actions";
import DoctorService from "../services/DoctorService";
import Recommendation from "../components/Recommendations/Recommendation";
import Appointment from "../components/Appointment/Appointment";
import { Col, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  box: {
    height: "100%",
    width: "100%",
  },
  container: {
      height: "100%", // So that grids 1 & 4 go all the way down
      minHeight: 150, // Give minimum height to a div
      border: "1px solid black",
      display: "flex",
      textAlign: "center"
  },
  innerContainer: {
    height: "100%",
  },
  item: {
    flex: 1,
    flexBasis: "33%",
    maxWidth: "33%",
    display: "flex",
  },
}));

const PatientDashboard = (props) => {
  const classes = useStyles();

  let patientId = UserService.getCurrentUser().id;

  const [patient, setPatient] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [recommendations, setRecommendations] = useState([]);

  useEffect(async () => {
    const getPatient = async () => {
      const patient = await PatientService.getPatient(patientId);
      setPatient(patient);
    };
    getPatient();

    const getAppointments = async () => {
      setIsLoading(true);
      const appointments = await AppointmentService.getAppointmentsPatient(
        patientId
      );
      setAppointments(appointments.map((item) => item));

      let doctorIDs = [];
      appointments.forEach((a) => {
        if (!doctorIDs.some((e) => e === a.doctor)) {
          doctorIDs = [...doctorIDs, a.doctor];
        }
      });

      doctorIDs.forEach(async (a) => {
        const doctor = await DoctorService.getDoctor(a);
        // console.log("RECEIVED DOCTOR", doctor);
        console.log("RECEIVED DOCTOR", doctor);
        doctorList.push(doctor);
        setDoctors(doctorList);
        setTotalAppointments(
          appointments.map((item) => {
            if (item.doctor === a) {
              item["doctor_name"] = doctor.firstname;
              item["doctor_last_name"] = doctor.lastname;
              item["doctor_address"] = doctor.address.address_value;
              item["doctor_area_of_expertise"] = doctor.area_of_expertise;
              item["doctor_thumbnail"] = doctor.thumbnail;
              item["doctor_phone_number"] =doctor.phone_number;
              return item;
            } else {
              return item;
            }
          })
        );
      });
      setIsLoading(false);
    };
    const a = getAppointments();
  }, []);

  const moment = require("moment");

  //arrays for previous and upcoming appointments
  const prevAppointments = [];
  const upcomingAppointments = [];
  //total appointments, merged

  //check which appointments are in the past and which are in the future
  totalAppointments.map((appointment) =>
    moment(new Date(appointment.startPoint)).toDate() < new Date()
      ? prevAppointments.push(appointment)
      : upcomingAppointments.push(appointment)
  );

  const oldestDATE = new Date(-8640000000000000);

  const findNewestAppointment = (area) => {
    let fittingAppointments = totalAppointments.filter(
      (e) => e.doctor_area_of_expertise === area
    );
    let mostRecent = oldestDATE;

    for (let i = 0; i < fittingAppointments.length; i++) {
      if (new Date(fittingAppointments[i].startPoint) > mostRecent) {
        mostRecent = new Date(fittingAppointments[i].startPoint);

      } else {
      }
    }
    return mostRecent;
  };

  const findMostRecentAppointment = () => {

    let mostRecent = oldestDATE;
    let mostRecentApp = null;
    for (let i = 0; i < prevAppointments.length; i++) {
      if (new Date(prevAppointments[i].startPoint) > mostRecent) {
        mostRecent = new Date(prevAppointments[i].startPoint);
        mostRecentApp = prevAppointments[i]
      } else {
      }
    }
    return mostRecentApp;
  };

  const makeRecomm = (area, title, description) => {
    const rec = {
      area: area,
      title: title,
      description: description,
    };
    return rec;
  };

  function calculateAge(birthday) {
    // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  const recomResults = [];

  const findRecommendations = () => {
    // console.log("[Recomm] totalAppointments: ", totalAppointments);
    let halfAYearAgo = new Date(new Date().setMonth(new Date().getMonth() - 6));
    let oneYearAgo = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1)
    );
    let threeYearsAgo = new Date(
      new Date().setFullYear(new Date().getFullYear() - 3)
    );
    let tenYearsAgo = new Date(
      new Date().setFullYear(new Date().getFullYear() - 10)
    );
    let priv = patient.insurance === "PRIVATE";
    let fem = patient.gender === "FEMALE";
    let age = calculateAge(new Date(patient.date_of_birth));

    if (age < 18) {
      if (!(findNewestAppointment("DENTIST") > halfAYearAgo)) {
        recomResults.push(
          makeRecomm(
            "DENTIST",
            "Regular Teeth Check-Up for Children",
            "You should visit your Dentist every 6th month. All health-insured patients under the age of 18 have the right to this checkup."
          )
        );
      }
      if (!(findNewestAppointment("GENERAL_PHYSICIAN") > oneYearAgo)) {
        recomResults.push(
          makeRecomm(
            "GENERAL_PHYSICIAN",
            "Regular Check-up for Children",
            "You should visit your general physician at least once per year. All health-insured patients under the age of 18 have the right to this checkup."
          )
        );
      }
    } else {
      if (!(findNewestAppointment("DENTIST") > oneYearAgo)) {
        recomResults.push(
          makeRecomm(
            "DENTIST",
            "Regular Teeth Check-Up",
            "You should visit your Dentist every year. All health-insured adult patients have the right to this checkup."
          )
        );
      }
      if (!(findNewestAppointment("GENERAL_PHYSICIAN") > threeYearsAgo)) {
        recomResults.push(
          makeRecomm(
            "GENERAL_PHYSICIAN",
            "Regular Check-Up",
            "You should visit your general physician at least every 3rd year. All health-insured adult patients have the right to this checkup."
          )
        );
      }
      if (!(findNewestAppointment("DERMATOLOGIST") > tenYearsAgo)) {
        recomResults.push(
          makeRecomm(
            "DERMATOLOGIST",
            "Skin Cancer Screening",
            "You should visit your dermatologist at least every 10th year for a skin cancer screening. All health-insured adult patients have the right to this checkup."
          )
        );
      }

      if (fem) {
        if (
          !(findNewestAppointment("ONCOLOGIST") > threeYearsAgo) &&
          age > 35
        ) {
          recomResults.push(
            makeRecomm(
              "ONCOLOGIST",
              "Breast Cancer Screening",
              "You should visit your oncologist at least every 3rd year for a breast cancer screening. All health-insured female patients over the age of 35 have the right to this checkup."
            )
          );
        }
        if (!(findNewestAppointment("GYNAECOLOGIST") > threeYearsAgo)) {
          recomResults.push(
            makeRecomm(
              "GYNAECOLOGIST",
              "Cervical Cancer Screening",
              "You should visit your gynaecologist at least every 3rd year for a cervical cancer screening. All health-insured adult female patients have the right to this checkup."
            )
          );
        }
      } else {
        if (!(findNewestAppointment("ONCOLOGIST") > tenYearsAgo) && age > 35) {
          recomResults.push(
            makeRecomm(
              "ONCOLOGIST",
              "Breast Cancer Screening (Non-Female)",
              "You should visit your oncologist at least every 10th year for a breast cancer screening. All health-insured not-female patients over the age of 35 have the right to this checkup."
            )
          );
        }
      }
    }
    if (priv) {
      if (!(findNewestAppointment("CARDIOLOGIST") > oneYearAgo)) {
        recomResults.push(
          makeRecomm(
            "CARDIOLOGIST",
            "Regular Heart Check-Up",
            "You should visit your Cardiologist every year. All privately health-insured patients have the right to this checkup."
          )
        );
      }
      if (!(findNewestAppointment("SPORTS_DOCTOR") > threeYearsAgo)) {
        recomResults.push(
          makeRecomm(
            "SPORTS_DOCTOR",
            "Fitness Check-Up",
            "You should visit your sports doctor every 3rd year for a check-up of your mobility. All privately health-insured patients have the right to this checkup."
          )
        );
      }
    }

  };
  findRecommendations();


  return (
    <ThemeProvider theme={Theme}>
      <div className={classes.root}>
      <Page>
        <Container fluid>
        <Row>
          <Col>
            <h2>
              <center>
              Hello {patient.firstname} {patient.lastname}
              </center>
            </h2>
          </Col>
          </Row>
          <Row>
            <Col sm={4} fluid>
            <Paper className={classes.paper}>
              <h3>News Center</h3>
            </Paper>
            <p></p>
            <NewsList outstanding={upcomingAppointments.length} mostRecent={findMostRecentAppointment()}></NewsList>
            <p></p>
            <p></p>
            <Paper className={classes.paper}>
              <h3>Recommended Checkups</h3>
              <p>
                {" "}
                <small>
                  (These check-ups were individually calculated for you based on
                  your age, your gender, your health-insurance status and your
                  medical history)
                </small>
              </p>
            </Paper>
            <p></p>
            <p>
              {recomResults.length > 0 ? (
                recomResults.map((recom) => (
                  <p>
                    <Recommendation
                      props={recom}
                      readOnly={true}
                    ></Recommendation>
                  </p>
                ))
              ) : (
                <Paper className={classes.paper}>
                  You have no recommended check-ups.
                </Paper>
              )}
            </p>
            </Col>
          {/* </Grid> */}
          <Col sm={4} fluid>
          {/* <Grid item spacing={3} xs={12} xm={3} xl={3}> */}
            <Paper className={classes.paper}>
              <h3>Upcoming Appointments</h3>
            </Paper>
            <p></p>
              {!isLoading ? (
                <p>
                  {upcomingAppointments?.length > 0 ? (
                    upcomingAppointments?.map((appointment) => (
                      <p>
                        <Appointment
                          key={appointment?._id}
                          id={appointment?._id}
                          appointment={appointment}
                          upcoming={true}
                          readOnly={true}
                        ></Appointment>
                      </p>
                    ))
                  ) : (
                    <Paper className={classes.paper}>
                      You have no upcoming appointments.
                    </Paper>
                  )}
                </p>
              ) : (
                <Paper className={classes.paper}>Loading...</Paper>
              )}
          </Col>
          <Col sm={4} fluid>
            <Paper className={classes.paper}>
              <h3>Previous Appointments</h3>
            </Paper>
            <p></p>
              {!isLoading ? (
                <div alignItems="center" flexDirection="column">
                  {prevAppointments?.length > 0 ? (
                    prevAppointments?.map((appointment) => (
                      <p>
                        <Appointment 
                          key={appointment?._id}
                          id={appointment?._id}
                          appointment={appointment}
                          upcoming={false}
                          readOnly={false}
                        ></Appointment>
                      </p>
                    ))
                  ) : (
                    <Paper className={classes.paper}>
                      You have no previous appointments.
                    </Paper>
                  )}{" "}
                </div>
              ) : (
                <Paper className={classes.paper}>Loading...</Paper>
              )}
              </Col>
        </Row>
        </Container>
      </Page>
      </div>
    </ThemeProvider>
  );
};

export default connect(null, { getPatient })(PatientDashboard);

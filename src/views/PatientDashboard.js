import React, { useState, useEffect } from "react";
import NewsList from "../components/NewsList";
import Page from "../components/Page";
import { Theme } from "../components/UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import { Paper } from "@material-ui/core";
import Doctor from "../components/Doctor/Doctor";
import PatientService from "../services/PatientService";
import UserService from "../services/UserService";
import AppointmentService from "../services/AppointmentService";
import { getPatients, getPatient } from "../redux/actions";
import DoctorService from "../services/DoctorService";
import DynamicCard from "../components/UI/DynamicCard";
import { Button } from "@material-ui/core";
import Appointment from "../components/Appointment/Appointment";

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
    height: "400px",
  },
  innerContainer: {
    height: "100%",
  },
  item: {
    flex: 1,
  },
}));

const PatientDashboard = (props) => {
  const classes = useStyles();

  let patientId = UserService.getCurrentUser().id;
  console.log(patientId);
  const [patient, setPatient] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(async () => {
    const getPatient = async () => {
      const patient = await PatientService.getPatient(patientId);
      console.log(patient);
      setPatient(patient);
    };
    getPatient();

    const getAppointments = async () => {
      const appointments = await AppointmentService.getAppointmentsPatient(
        patientId
      );
      console.log(appointments);
      setAppointments(appointments.map((item) => item));
      console.log("finished with getAppointments ", appointments);
      console.log("length: ", appointments.length);
      let doctorIDs = [];
      appointments.forEach((a) => {
        if (!doctorIDs.some((e) => e === a.doctor)) {
          doctorIDs = [...doctorIDs, a.doctor];
        }
      });
      console.log(doctorIDs);

      doctorIDs.forEach(async (a) => {
        const doctor = await DoctorService.getDoctor(a);
        console.log("RECEIVED DOCTOR", doctor);

        setDoctors([...doctors, doctor]);
      });
    };
    const a = getAppointments();

    a.then(console.log("finally", appointments));
  }, []);

  const moment = require("moment");

  console.log(appointments);
  console.log("patient ", patient);
  console.log("appointment ", appointments);
  console.log("doctors ", doctors);

  //arrays for previous and upcoming appointments
  const prevAppointments = [];
  const upcomingAppointments = [];
  //total appointments, merged
  const totalAppointments = doctors.map((item, i) =>
    Object.assign({}, item, appointments[i])
  );

  //check which appointments are in the past and which are in the future
  totalAppointments.map((appointment) =>
    moment(new Date(appointment.startPoint)).toDate() < new Date()
      ? prevAppointments.push(appointment)
      : upcomingAppointments.push(appointment)
  );

  console.log("prevAppointments: ", prevAppointments);
  console.log("upcomingAppointments: ", upcomingAppointments);
  console.log("totalAppo :", totalAppointments);

  return (
    <ThemeProvider theme={Theme}>
      <Page>
        {/*************** GRID 1, 3 COLUMNS *****************/}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="row"
          spacing={3}
          xs={12}
        >
          <Grid item>
            <h2>Hello {patient.name}</h2>
          </Grid>
        </Grid>
        <Grid className={classes.container} container spacing={3}
          xs={12}>
          <Grid className={classes.item} item xs={4}>
            <Paper className={classes.paper}>
              <h3>News Center</h3>
            </Paper>
            <p></p>
            <Grid>
              <NewsList></NewsList>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <h3>Upcoming Appointments</h3>
            </Paper>
            <p></p>
            <Grid item xs={12}>
              <p>
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <p>
                    <Appointment
                      props={appointment}
                      readOnly={true}
                    ></Appointment>
                  </p>
                ))
              ) : (
                <Paper className={classes.paper}>
                  You have no upcoming appointments
                </Paper>
              )}
              </p>
            </Grid>
          </Grid>
          <Grid xs={4} item>
            <Paper className={classes.paper}>
              <h3>Previous Appointments</h3>
            </Paper>
            <p></p>
            <Grid item xs={12} alignItems="center">
              {prevAppointments.length > 0 ? (
                prevAppointments.map((appointment) => (
                  <Appointment
                    props={appointment}
                    readOnly={false}
                  ></Appointment>
                ))
              ) : (
                <Paper className={classes.paper}>
                  You have no previous appointments.
                </Paper>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Page>
    </ThemeProvider>
  );
};

export default connect(null, { getPatient })(PatientDashboard);

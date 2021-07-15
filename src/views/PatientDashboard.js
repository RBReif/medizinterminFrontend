import React, { useState, useEffect } from "react";
import NewsList from "../components/NewsList";
import CheckupList from "../components/CheckupList";
import AppointmentCard from "../components/AppointmentCard";
import Page from "../components/Page";
import { Theme } from "../components/UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import Doctor from "../components/Doctor/Doctor";
import PatientService from "../services/PatientService";
import DynamicCard from "../components/UI/DynamicCard";
import { Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const appointments = [{
  appointmentStatus: "available",
  _id: "604963996946",
  doctor: "84t84843646",
  startPoint: "2021-07-09T21:30:00.0000Z"
},{
  appointmentStatus: "available",
  _id: "483863597937",
  doctor: "9543694",
  startPoint: "2021-07-21T21:30:00.0000Z"
},
];

const patient = {firstname:"Max", lastname:"Muster", checkups: [{service: "Teeth Cleaning", date: "2021.12.12"}]};

const PatientDashboard = (props) => {
  const classes = useStyles();

  const dateTest = "2021-07-12T00:30:10.000Z";
  const newdate = new Date(dateTest);
  // const newdate = Convert.ToDateTime(datetest);
  console.log("NEWDATE" , newdate);

  const moment = require("moment");

  /* useEffect(() => {
    // get id of patient from URL
    let patientId = match.params._id;
    getPatient(patientId);
    //console.log(getPatient(patientId));
  }, [match.params]);*/

  return (
    <ThemeProvider theme={Theme}>
      <Page>
        {/*************** GRID 1, 3 COLUMNS *****************/}
        <Grid container justifyContent="center" alignItems="center">
          <Grid item  >
              <h2>Hello {patient.firstname} {patient.lastname}</h2>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <h3>News Center</h3>
            </Paper>
          </Grid>
          {/* <Grid item xs>
         <h3>News Center</h3> <NewsList></NewsList>
        </Grid> */}
          <Grid item xs>
            <Paper className={classes.paper}>
              <h3>Upcoming Appointments</h3>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              <h3>Previous Appointments</h3>
            </Paper>
          </Grid>
        </Grid>
        {/*************** GRID 2, 3 COLUMNS *****************/}
        <Grid container spacing={3}>
          <Grid item xs>
            <NewsList></NewsList>
          </Grid>
          <Grid item xs>
            {appointments.map((appointment) => (
            moment(new Date(appointment.startPoint)).toDate() > new Date() ? <Paper>{appointment.startPoint}</Paper> : ""
                    ))}
                    </Grid>
           <Grid item xs>{appointments.map((appointment) => (
            moment(new Date(appointment.startPoint)).toDate() <= new Date() ? <Paper>{appointment.startPoint}</Paper> : ""
                    ))}</Grid>
        </Grid>
        {/*************** GRID 2, 3 COLUMNS *****************/}
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <h3>Recommended Check-Ups</h3>
            </Paper>
          </Grid>
          <Grid item xs></Grid>
          <Grid item xs></Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
              {patient.checkups.length === 0 ? <p>No recommendations found</p> : patient.checkups.map((item) => (
                <DynamicCard
                content={
                  <div>
                  <b>{item.service}:</b> {item.date} &nbsp;&nbsp;&nbsp;<Button color="primary">Book Now</Button>
                  </div>}>
                </DynamicCard>))}
            </Paper>
          </Grid>
          <Grid item xs></Grid>
          <Grid item xs></Grid>
        </Grid>

        {/* <Container>
          <br />
          <h3>Recommended Checkup</h3>
          <CheckupList />
        </Col>
        <Col>
          <Form>
            <AppointmentCard />
            <br />
            <AppointmentCard />
            <br />
            <AppointmentCard />
          </Form>
        </Col>
        <Col>
          <AppointmentCard />
        </Col>
      </Row>
    </Container> */}
      </Page>
    </ThemeProvider>
  );
};
export default PatientDashboard;

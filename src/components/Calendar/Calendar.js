import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  WeekView,
  MonthView,
  DayView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ThemeProvider } from "@material-ui/styles";
import { Theme } from "../UI/Theme";
import { Link } from "react-router-dom";

const BasicLayout = ({ appointmentData, ...restProps }) => {
  const [firstname, setFirstName] = React.useState(appointmentData.patient ? appointmentData.patient.firstname : "");
  const [lastname, setLastName] = React.useState(appointmentData.patient ? appointmentData.patient.lastname : "");
  const [gender, setGender] = React.useState(appointmentData.patient ? appointmentData.patient.gender : "");
  const [insurance, setInsurance] = React.useState(appointmentData.patient ? appointmentData.patient.insurance : "");
  const [dob, setDob] = React.useState(appointmentData.patient ? appointmentData.patient.date_of_birth : "");

  console.log("when are you here?", appointmentData)
  console.log("props Neu ", restProps.patients)
  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      {...restProps}
    >
      {appointmentData.patient ? <div>
      <AppointmentForm.Label
        text="Patient First Name"
        type="text"
      />
      <AppointmentForm.TextEditor
        value={firstname}
      />
          <AppointmentForm.Label
        text="Patient Last Name"
        type="text"
      />
      <AppointmentForm.TextEditor
        value={lastname}
      />
                <AppointmentForm.Label
        text="Patient Date of Birth"
        type="text"
      />
      <AppointmentForm.TextEditor
        value={dob}
      />
                <AppointmentForm.Label
        text="Patient Insurance"
        type="text"
      />
      <AppointmentForm.TextEditor
        value={insurance}
      />
                <AppointmentForm.Label
        text="Patient Gender"
        type="text"
      />
      <AppointmentForm.TextEditor
        value={gender}
      /> </div> : ""}
    </AppointmentForm.BasicLayout>
  );
};

export default class MyCalendar extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log("props2", props)
    this.state = {
      data: this.props.events,
      mainResourceName: "appointmentStatus",
      resources: [
        {
          fieldName: "appointmentStatus",
          title: "Appointment Status",
          instances: [
            { id: "SCHEDULED", text: "Scheduled", color: "#D7C49EFF" },
            { id: "AVAILABLE", text: "Available", color: "#A8D7B6" },
            { id: "SUCCESSFUL", text: "Successful", color: "#88BDC0" },
            { id: "FAILED", text: "Failed", color: "#D7A8B6" },
          ],
        },
      ],
    };
  }

  render() {
    const { resources, mainResourceName } = this.state;
    return (
      <React.Fragment>
        <ThemeProvider theme={Theme}>
        <Paper>
          <Scheduler
            locale="en-DE"
            timeZone="Europe/Berlin"
            data={this?.props?.events}
            height={500}
          >
            <ViewState defaultCurrentDate={new Date()} />
            <DayView startDayHour={0} endDayHour={24} intervalCount={7} />
            <WeekView startDayHour={0} endDayHour={24} />
            <MonthView></MonthView>
            <Toolbar />
            <DateNavigator/>
            <ViewSwitcher/>
            <Appointments />
            <AppointmentTooltip
            showOpenButton
            showCloseButton
          />
          <AppointmentForm weeklyRecurrenceSelectorComponent={false} basicLayoutComponent={BasicLayout}/>
            <Resources data={resources} mainResourceName={mainResourceName} />
          </Scheduler>
        </Paper>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

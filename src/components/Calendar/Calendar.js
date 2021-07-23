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
  Toolbar,
  ViewSwitcher,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ThemeProvider } from "@material-ui/styles";
import { Theme } from "../UI/Theme";

export default class MyCalendar extends React.PureComponent {
  constructor(props) {
    super(props);
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
            data={this.props.events}
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
            <AppointmentTooltip />
            <Resources data={resources} mainResourceName={mainResourceName} />
          </Scheduler>
        </Paper>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

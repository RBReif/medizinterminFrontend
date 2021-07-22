import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  AppointmentTooltip,
  Toolbar,
  Resources,
  ViewSwitcher,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ThemeProvider } from "@material-ui/styles";
import { Theme } from "../UI/Theme";

const Calendar = (props) => {

  const clickHandler = (event) => {
    console.log("Test");
  }

  const Appointment = ({ children, data, style, ...restProps }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        borderRadius: "8px",
        backgroundColor: data.color,
        data: data,
      }}
    >
      {children}
    </Appointments.Appointment>
  );

  console.log("Props events", props.events);
  return (
    <ThemeProvider theme={Theme}>
      <Paper>
        <Scheduler
          timeZone="Europe/Berlin"
          data={props.events}
          // views={views}
          defaultCurrentView="day"
          // defaultCurrentDate={currentDate}
          // height={600}
          // startDayHour={9}
          // editing={false}
          // textExpr={"title"}
          // startDateExpr={"from"}
          // endDateExpr={"to"}
          // descriptionExpr={"description"}
        >
          <ViewState
            defaultCurrentDate={new Date()}
            defaultCurrentViewName="Week"
          />

          <DayView startDayHour={0} endDayHour={24} intervalCount={60} />
          <WeekView startDayHour={0} endDayHour={24} />

          <MonthView></MonthView>

          <Toolbar />
          <ViewSwitcher />
          <DateNavigator color="secondary"/>
          <Appointments appointmentComponent={Appointment} onClick={clickHandler}/>
          <AppointmentTooltip/>
        </Scheduler>
      </Paper>
    </ThemeProvider>
  );
};

export default Calendar;

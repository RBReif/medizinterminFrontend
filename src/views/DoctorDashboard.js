import MyCalendar from "../components/Calendar/Calendar";
import Page from "../components/Page";
import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import NewCalendarEvent from "../components/Calendar/NewCalendarEvent";
import DynamicCard from "../components/UI/DynamicCard";
import { Box } from "@material-ui/core";
import { Theme } from "../components/UI/Theme";
import { ThemeProvider } from "@material-ui/styles";

const events = [
  {
    id: 1,
    color: "#fd3153",
    from: new Date(),
    to: new Date(),
    title: "This is an event",
  },
  {
    id: 2,
    color: "#1ccb9e",
    from: "2019-05-01T13:00:00+00:00",
    to: "2019-05-05T14:00:00+00:00",
    title: "This is another event",
  },
  {
    id: 3,
    color: "#3694DF",
    from: "2019-05-05T13:00:00+00:00",
    to: "2019-05-05T20:00:00+00:00",
    title: "This is also another event",
  },
  {
    id: 4,
    color: "#fd3153",
    from: "2021-07-02T18:00:00+00:00",
    to: "2021-07-05T19:00:00+00:00",
    title: "This is an event",
  },
  {
    id: 5,
    color: "#fd3153",
    from: "2021-07-05T18:00:00+00:00",
    to: "2021-07-05T19:00:00+00:00",
    title: "This is an aoifsiosfa",
  },
  {
    id: 6,
    color: "#fd3153",
    to: new Date(),
    title: "This is an aifjejffjewjgwejgjewigoifsiosfa",
    from: new Date(),
  },
];

const DoctorDashboard = () => {
  const [calendarEvents, setCalendarEvents] = useState(events);

  console.log("KalenderEvents: ", calendarEvents);

  const addCalendarEventHandler = (calendarevent) => {
    setCalendarEvents((prevCalendarEvents) => {
      return [calendarevent, ...prevCalendarEvents];
    });
  };

  return (   
    <ThemeProvider theme={Theme}>
    <Page>
      <Container fluid>
        <Row>
          <Col>1 of 2</Col>
          <Col>2 of 2</Col>
        </Row>
        <Row>
          <Col>
            <DynamicCard
            variant="outlined"
              content={
                <div>
                  <Row>
                  <Box p={2}>
                    <h5>Add a new timeslot</h5>
                    </Box>
                  </Row>
                  <Row>
                  <Box p={2}>
                    <NewCalendarEvent
                      onAddTimeSlot={addCalendarEventHandler}
                    ></NewCalendarEvent>
                    </Box>
                  </Row>
                </div>
              }
            ></DynamicCard>
          </Col>
          <Col xs={8} xl={8}>
            <DynamicCard
              variant="outlined"
              content={
                <div>
                  <Row>
                  <Box p={2}>
                    <h5>My Calendar</h5>
                    </Box>
                  </Row>
                  <MyCalendar events={events} />
                </div>
              }
            ></DynamicCard>
          </Col>
        </Row>
      </Container>
    </Page>
    </ThemeProvider>
  );
};

export default DoctorDashboard;

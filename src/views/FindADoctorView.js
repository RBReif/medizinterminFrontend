import React, { useState } from "react";
import DynamicDropdown from "../components/Forms/DynamicDropdown";
import DynamicSwitch from "../components/Forms/DynamicSwitch";
import { Form, Container, Row, Col } from "react-bootstrap";
import NewTimeSlot from "../components/NewTimeSlot/NewTimeSlot";
import Page from "../components/Page";
import DynamicCard from "../components/UI/DynamicCard";
import TimeSlotDateList from "../components/TimeSlots/TimeSlotDateList";
import LocationAutoComplete from "../components/Forms/Location/LocationAutoComplete";
import LocationSlider from "../components/Forms/Location/LocationSlider";
import { Box } from "@material-ui/core";
import { Theme } from "../components/UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";
import image from "../images/professional.jpg"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    maxHeight: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto"
  },
  media: {
    paddingTop: '10.25%', // 16:9
    paddingBottom: '10%'
  },
}));

const healthinsurancelist = [
  { displayname: "Public" },
  { displayname: "Private" },
];
const languagelist = [{ displayname: "German" }, { displayname: "English" }];
const doctorlist = [
  { id: "1", displayname: "Dentist" },
  { id: "2", displayname: "Cardiologist" },
  { id: "3", displayname: "Something" },
  { id: "4", displayname: "More" },
];

const toggles = [
  { id: "1", displayname: "Wheelchair availability needed?", isActive: false },
  { id: "2", displayname: "Elevator needed", isActive: false },
  { id: "3", displayname: "Car parking nearby", isActive: false },
  {
    id: "4",
    displayname: "Public transportation station nearby",
    isActive: false,
  },
];

const FindADoctorView = () => {
  const [timeslots, setTimeSlots] = useState("");
  const [toggle, setToggle] = useState(toggles.isActive);
  const classes = useStyles();

  const addTimeSlotHandler = (timeslot) => {
    setTimeSlots((prevTimeSlots) => {
      return [timeslot, ...prevTimeSlots];
    });
  };

  const deleteTimeSlotHandler = (timeslot) => {
    // setTimeSlots(prevTimeSlots => {
    // var index = timeslot.indexOf(timeslot.id);
    console.log(timeslot);
    // const updatedTimeSlots = prevTimeSlots.filter(slot => slot.id !== timeslot.id);
    // console.log("updatedtimeslots: ", updatedTimeSlots);
    // console.log("prevtimeslots: ", prevTimeSlots);
    // console.log("timeslotId", timeslot.id);
    // return updatedTimeSlots;
    // )}
  };


  return (
    <ThemeProvider theme={Theme}>
      <Page>
        <Container fluid>
          <Row>
            <Col md={12} fluid>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={image}
                />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <DynamicCard
                  variant="outlined"
                  content={
                    <div>
                      <h4>Area of Expertise</h4>
                      <DynamicCard
                        variant="body2"
                        content={
                          <DynamicDropdown
                            label="Please choose the type of doctor you need"
                            items={doctorlist}
                          ></DynamicDropdown>
                        }
                      ></DynamicCard>
                      <DynamicCard
                        variant="outlined"
                        content={
                          <div>
                            <h4>Preferred Location</h4>
                            <DynamicCard
                              variant="body2"
                              content={
                                <div>
                                  <Box p={2}>
                                    <LocationAutoComplete></LocationAutoComplete>
                                  </Box>
                                  <Box p={2}>
                                    <LocationSlider></LocationSlider>
                                  </Box>
                                </div>
                              }
                            ></DynamicCard>
                          </div>
                        }
                      ></DynamicCard>
                    </div>
                  }
                ></DynamicCard>
              </Form>
            </Col>
            <Col>
              <DynamicCard
                variant="outlined"
                content={
                  <div>
                    <h4>Language, Location, and Disability Settings</h4>
                    <DynamicCard
                      variant="body2"
                      content={
                        <DynamicDropdown
                          label="Please choose your preferred language"
                          items={languagelist}
                        ></DynamicDropdown>
                      }
                    ></DynamicCard>
                    <DynamicCard
                      variant="body2"
                      content={
                        <DynamicDropdown
                          label="Please choose your health insurance"
                          items={healthinsurancelist}
                        ></DynamicDropdown>
                      }
                    ></DynamicCard>
                    <div>
                      {toggles.map((toggle) => {
                        return (
                          <DynamicSwitch
                            id={toggle.id}
                            displayname={toggle.displayname}
                          ></DynamicSwitch>
                        );
                      })}
                    </div>
                    {/* <LocationSetter/> */}
                  </div>
                }
              ></DynamicCard>
            </Col>
            <Col>
              <DynamicCard
                variant="outlined"
                content={
                  <div>
                    <h4>When are you usually free?</h4>
                    <br />
                    {/* <TimeSlots items={timeslots} /> */}
                    <TimeSlotDateList
                      items={timeslots}
                      onDeleteTimeSlotHandler={deleteTimeSlotHandler}
                    />
                    <NewTimeSlot onAddTimeSlot={addTimeSlotHandler} />
                  </div>
                }
              ></DynamicCard>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <br />
              <br />
              <center>
                <Button color="secondary" href="/results">
                  Find an appointment
                </Button>
              </center>
              {""}
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </Page>
    </ThemeProvider>
  );
};

export default FindADoctorView;

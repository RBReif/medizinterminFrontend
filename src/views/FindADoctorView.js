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
import image from "../images/professional.jpg";

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
  const [toggle, setToggle] = useState({
    displayname: "",
    isActive: false,
  });
  const classes = useStyles();
  const [doctor, setDoctor] = useState("");
  const [language, setLanguage] = useState("");
  const [healthInsurance, setHealthInsurance] = useState("");
  const [latLng, setLatLng] = useState({
    lat: null,
    lng: null,
  });
  const [radius, setRadius] = useState("");
  let toggleItems = toggles.map((toggle) => {
    return {
      id: toggle.id,
      displayname: toggle.displayname,
      isActive: toggle.isActive,
    };
  });

  // const [toggle, setToggle] = useState([
  //   toggles.map(toggle) => {
  //     return displayname={toggle.displayname}
  //   }
  // ])

  // async function fetchDoctorsHandler() {
  //   const response = await fetch("");
  //   const data = await response.json();
  //   const [doctors, setDoctors] = useState([]);

  //   const transformedDoctors = data.results.map((doctorData) => {
  //     return {
  //       id: doctorData.id,
  //       displayame: doctorData.displayname,
  //     };
  //   });
  //   setDoctors(transformedDoctors);
  // }

  const addTimeSlotHandler = (timeslot) => {
    setTimeSlots((prevTimeSlots) => {
      return [timeslot, ...prevTimeSlots];
    });
  };

  const languageChangeHandler = (event) => {
    // console.log("stateChangeHandler: ", event.target.value);
    return setLanguage(event.target.value);
  };

  const healthInsuranceChangeHandler = (event) => {
    // console.log("healthinsurancechangehandler: ", event.target.value);
    return setHealthInsurance(event.target.value);
  };

  const doctorChangeHandler = (event) => {
    // console.log("stateChangeHandler: ", event.target.value);
    return setDoctor(event.target.value);
  };

  const locationHandler = (latLng) => {
    // console.log("LOCATION ", latLng);
    return setLatLng({
      lat: latLng.lat,
      lng: latLng.lng,
    });
  };

  const radiusHandler = (radius) => {
    // console.log("RADIUS: ", radius);
    return setRadius(radius);
  };

  const toggleChangeHandler = (displayname, isActive) => {
    // console.log(displayname, isActive);
    let objIndex = toggleItems.findIndex((obj => obj.displayname == displayname));
    toggleItems[objIndex].isActive = isActive;
    // console.log(toggleItems);
    return toggleItems;
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
                <CardMedia className={classes.media} image={image} />
              </Card>
              <p></p>
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
                            defaultValue=""
                            label="Please choose the type of doctor you need"
                            items={doctorlist}
                            onChange={doctorChangeHandler}
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
                                    <LocationAutoComplete
                                      onClick={locationHandler}
                                    ></LocationAutoComplete>
                                  </Box>
                                  <Box p={2}>
                                    <LocationSlider
                                      onClick={radiusHandler}
                                    ></LocationSlider>
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
                          defaultValue=""
                          label="Please choose your preferred language"
                          items={languagelist}
                          onChange={languageChangeHandler}
                        ></DynamicDropdown>
                      }
                    ></DynamicCard>
                    <DynamicCard
                      variant="body2"
                      content={
                        <DynamicDropdown
                          defaultValue=""
                          label="Please choose your health insurance"
                          items={healthinsurancelist}
                          onChange={healthInsuranceChangeHandler}
                        ></DynamicDropdown>
                      }
                    ></DynamicCard>
                    <div>
                      {toggles.map((toggle) => {
                        return (
                          <DynamicSwitch
                            id={toggle.id}
                            displayname={toggle.displayname}
                            onChange={toggleChangeHandler}
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

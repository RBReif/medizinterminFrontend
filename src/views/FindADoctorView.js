import React, { useState, useEffect } from "react";
import DynamicDropdown from "../components/Forms/DynamicDropdown";
import DynamicSwitch from "../components/Forms/DynamicSwitch";
import { Form, Container, Row, Col } from "react-bootstrap";
import NewTimeSlot from "../components/NewTimeSlot/NewTimeSlot";
import Page from "../components/Page";
import DynamicCard from "../components/UI/DynamicCard";
import TimeSlotDateList from "../components/TimeSlots/TimeSlotDateList";
import LocationAutoComplete from "../components/Forms/Location/LocationAutoComplete";
import LocationSlider from "../components/Forms/Location/LocationSlider";
import { Box, Button, makeStyles, Paper, Grid } from "@material-ui/core";
import { Theme } from "../components/UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import image from "../images/professional.jpg";
import MultiSelectDropdown from "../components/Forms/MultiSelectDropdown";
import ConfigService from "../services/ConfigService";
import AppointmentService from "../services/AppointmentService";
import DoctorList from "../components/Doctor/DoctorList";
import _ from "lodash";

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

const FindADoctorView = () => {
  const [timeslots, setTimeSlots] = useState("");
  const classes = useStyles();
  const [doctor, setDoctor] = useState("");
  let area = "";
  const [healthInsurances, setHealthInsurances] = useState("");
  const [latLng, setLatLng] = useState({
    lat: null,
    lng: null,
  });
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [insurances, setInsurances] = useState([]);
  const [insurance, setInsurance] = useState("");
  const [languages, setLanguages] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activateSearch, setActivateSearch] = useState(false);
  const [results, setResults] = useState([]);

  const addTimeSlotHandler = (timeslot) => {
    setTimeSlots((prevTimeSlots) => {
      return [timeslot, ...prevTimeSlots];
    });
  };

  const languagesChangeHandler = (value) => {
    setLanguageList(value);
  };

  const healthInsuranceChangeHandler = (event) => {
    //dispatch
    return setInsurance(event.target.value);
  };

  const areaChangeHandler = (event) => {
    return setDoctor(event.target.value);
  };

  const locationHandler = (latLng, value) => {
    // console.log("LOCATION ", latLng);
    setAddress({ address_value: value, lat: latLng.lat, lng: latLng.lng });
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
    let objIndex = facilities.findIndex(
      (obj) => obj.displayname === displayname
    );
    facilities[objIndex].isActive = !facilities[objIndex].isActive;
    // console.log(facilities);
    return facilities;
  };

  var paramsString = window.location.search;
  var searchParams = new URLSearchParams(paramsString);
  const profession =
    searchParams.get("profession") != undefined
      ? searchParams.get("profession").toUpperCase()
      : "";

  async function fetchAppointmentsHandler() {
    setIsLoading(true);
    setActivateSearch(true);
    const facilitiesRightFormat = [];
    for (let i = 0; i < facilities.length; i++) {
      if (facilities[i].isActive) {
        facilitiesRightFormat.push(facilities[i].displayname);
      }
    }
    for (let i = 0; i < timeslots.length; i++) {
      let receivedResults = await AppointmentService.filterAppointments(
        doctor,
        languageList,
        facilitiesRightFormat,
        timeslots[i].startdate,
        timeslots[i].enddate,
        radius,
        address.address_value,
        address.lat,
        address.lng,
        insurance
      );
      setIsLoading(false);
      setResults((prevResults) => ({
        ...receivedResults,
      }));
    }
  }

  const deleteTimeSlotHandler = (timeslot) => {
    setTimeSlots(prevTimeSlots => {
    const updatedTimeSlots = prevTimeSlots.filter(slot => slot.id !== timeslot.id);
    return updatedTimeSlots;
    })
  };


  useEffect(() => {
    const getConfig = async () => {
      const config = await ConfigService.getConfig();
      setInsurances(
        config.insurances.map((item) => {
          return { displayname: item.valueOf() };
        })
      );
      setLanguages(
        config.languages.map((item) => {
          return { displayname: item.valueOf() };
        })
      );
      setAreas(
        config.areas.map((item) => {
          return { displayname: item.valueOf() };
        })
      );
      setFacilities(
        config.facilities.map((item) => {
          return { displayname: item.valueOf(), isActive: false };
        })
      );

    };
    getConfig();

    const paramsStr = window.location.search;
    if (paramsStr.includes("area")) {
      const params = new URLSearchParams(paramsStr);
      const areaI = params.get("area");
      setDoctor(areaI);
      area = areaI.toUpperCase();
    }
  }, []);

  const paramsStr = window.location.search;
  if (paramsStr.includes("area")) {
    const params = new URLSearchParams(paramsStr);
    const areaI = params.get("area");
    area = areaI.toUpperCase();
  }
  
  //Grouping the results by doctorID, so that all appointments are grouped by that doctor 
  const grouped = _.groupBy(Object.values(results), function (result) {
    return result.doctor;
  });

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
                      <center>
                        <h4>Area of Expertise</h4>
                        <DynamicCard
                          variant="body2"
                          content={
                            <DynamicDropdown
                              defaultValue={area}
                              label="Please choose the type of doctor you need"
                              items={areas}
                              onChange={areaChangeHandler}
                            ></DynamicDropdown>
                          }
                        ></DynamicCard>
                        <DynamicCard
                          variant="outlined"
                          content={
                            <div>
                              <h4>Preferred Location</h4>
                              <div>
                                <Box p={2}>
                                  <LocationAutoComplete
                                    onSelect={locationHandler}
                                  ></LocationAutoComplete>
                                </Box>
                                <Box p={2}>
                                  <LocationSlider
                                    onClick={radiusHandler}
                                  ></LocationSlider>
                                </Box>
                              </div>
                            </div>
                          }
                        ></DynamicCard>
                        <DynamicCard
                          variant="body2"
                          content={
                            <div>
                              <h4>Language</h4>
                              <MultiSelectDropdown
                                label="Please choose your preferred language"
                                items={languages}
                                onChange={languagesChangeHandler}
                              ></MultiSelectDropdown>
                            </div>
                          }
                        ></DynamicCard>
                        <DynamicCard
                          variant="body2"
                          content={
                            <div>
                              <h4>Insurance</h4>
                              <DynamicDropdown
                                label="Please choose your health insurance"
                                items={insurances}
                                onChange={healthInsuranceChangeHandler}
                              ></DynamicDropdown>
                            </div>
                          }
                        ></DynamicCard>
                        <DynamicCard
                          variant="body2"
                          content={
                            <div>
                              <h4>Accessibility</h4>
                              {facilities.map((toggle) => {
                                return (
                                  <DynamicSwitch
                                    key={toggle.id}
                                    id={toggle.id}
                                    displayname={toggle.displayname}
                                    onChange={toggleChangeHandler}
                                  ></DynamicSwitch>
                                );
                              })}
                            </div>
                          }
                        ></DynamicCard>
                      </center>
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
                    <center>
                      <h4>When are you usually free?</h4>
                      <br />
                      {/* <TimeSlots items={timeslots} /> */}
                      <TimeSlotDateList
                        items={timeslots}
                        onDeleteTimeSlotHandler={deleteTimeSlotHandler}
                      />
                      <NewTimeSlot onAddTimeSlot={addTimeSlotHandler} />
                    </center>
                  </div>
                }
              ></DynamicCard>
            </Col>
            <Col>
              <DynamicCard
                variant="outlined"
                content={
                  <div>
                    <center>
                      <h4>Search for appointments!</h4>
                      <p></p>
                      <Button
                        color="secondary"
                        onClick={fetchAppointmentsHandler}
                      >
                        Find an appointment
                      </Button>
                    </center>
                  </div>
                }
              ></DynamicCard>
              {activateSearch ? (
                <div>
                  <DynamicCard
                    variant="outlined"
                    content={
                      <div>
                        <div>
                          {!isLoading && Object.keys(grouped).length > 0 && (
                            <div>
                              {Object.entries(grouped).map((item) => {
                                return <DoctorList patientAddress={address} result={item}></DoctorList>;
                              })}
                            </div>
                          )}
                          {!isLoading && Object.keys(grouped).length === 0 && (
                            <center>
                              <Paper className={classes.paper}>
                                <p>
                                  Found no doctors. Please try another search.
                                </p>
                              </Paper>
                            </center>
                          )}
                          {isLoading && (
                            <center>
                              <Paper className={classes.paper}>
                                <p>Loading...</p>
                              </Paper>
                            </center>
                          )}
                        </div>
                      </div>
                    }
                  ></DynamicCard>
                </div>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </Container>
      </Page>
    </ThemeProvider>
  );
};

export default FindADoctorView;

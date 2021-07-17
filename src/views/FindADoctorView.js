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
import { Box } from "@material-ui/core";
import { Theme } from "../components/UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";
import image from "../images/professional.jpg";
import MultiSelectDropdown from "../components/Forms/MultiSelectDropdown";
import ConfigService from "../services/ConfigService";
import { connect, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import Doctor from "../components/Doctor/Doctor";

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

const doctorlist = [
  {
    id: "1",
    name: "Max Mustermann",
    profession: "Dentist",
    address: "Ungererstr. 58, 80805 München",
    phone: "123456",
    avgAudienceRating: "4",
    appointments: [
      {
        id: 6,
        color: "#fd3153",
        to: new Date(),
        title: "This is an aifjejffjewjgwejgjewigoifsiosfa",
        from: new Date(),
      },
      {
        id: 6,
        color: "#fd3153",
        to: new Date(),
        title: "This is an event 2",
        from: new Date(),
      },
    ],
  },
  {
    id: "2",
    name: "isjdgjdjsg fiaojs",
    profession: "Dentist",
    address: "Münchner Freiheit 12, 80803 München",
    avgAudienceRating: "5",
    phone: "12345678",
    appointments: [{}, {}],
  },
];

const FindADoctorView = () => {
  const [timeslots, setTimeSlots] = useState("");
  //  const [togglesSelected, setTogglesSelecteed] = useState([]);
  const classes = useStyles();
  const [doctor, setDoctor] = useState("");
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
  const [search, setSearch] = useState(false);

  const addTimeSlotHandler = (timeslot) => {
    setTimeSlots((prevTimeSlots) => {
      return [timeslot, ...prevTimeSlots];
    });
  };

  const languagesChangeHandler = (value) => {
    setLanguageList(value);
  };

  const healthInsuranceChangeHandler = (event) => {
    console.log("healthinsurancechangehandler: ", event.target.value);
    //dispatch
    return setInsurance(event.target.value);
  };

  const areaChangeHandler = (event) => {
    // console.log("stateChangeHandler: ", event.target.value);
    return setDoctor(event.target.value);
  };

  const locationHandler = (latLng, value) => {
    // console.log("LOCATION ", latLng);
    // console.log("value:::: ", value);
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
    console.log(displayname, isActive);
    let objIndex = facilities.findIndex(
      (obj) => obj.displayname === displayname
    );
    facilities[objIndex].isActive = !facilities[objIndex].isActive;
    console.log(facilities);
    return facilities;
  };

  const submitHandler = () => {
    let query = [];
    query.push({
      address: address.address_value,
      lat: address.lat,
      lng: address.lng,
      radius: radius,
      toggles: facilities,
      insurance: insurance,
      languages: languageList,
      doctor: doctor,
      timeslots: timeslots,
    });
    console.log("query: ", query);
    query.length > 0 ? setSearch(true) : setSearch(false);
  };

  const deleteTimeSlotHandler = (timeslot) => {
    // setTimeSlots(prevTimeSlots => {
    // var index = timeslot.indexOf(timeslot.id);
    // console.log(timeslot);
    // const updatedTimeSlots = prevTimeSlots.filter(slot => slot.id !== timeslot.id);
    // console.log("updatedtimeslots: ", updatedTimeSlots);
    // console.log("prevtimeslots: ", prevTimeSlots);
    // console.log("timeslotId", timeslot.id);
    // return updatedTimeSlots;
    // )}
  };


  //This component will go somewhere else 
  //In the backend most probaly. It will calculate the distance between two coordinates
  let hbf = {lat: 48.166629, lng: 11.591026}
  let home = {lat: 48.1402669, lng: 11.559998};

   //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
   function calcDistance(lat1, lng1, lat2, lng2) 
   {
     var R = 6371; // km
     var dLat = toRad(lat2-lat1);
     var dLng = toRad(lng2-lng1);
     var lat1 = toRad(lat1);
     var lat2 = toRad(lat2);

     var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
       Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2); 
     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
     var d = R * c;
     return d;
   }

   // Converts numeric degrees to radians
   function toRad(Value) 
   {
       return Value * Math.PI / 180;
   }

   let test = calcDistance(hbf.lat, hbf.lng, home.lat, home.lng);
   console.log("DISTANCE: ", test);


  useEffect(() => {
    const getConfig = async () => {
      const config = await ConfigService.getConfig();
      // console.log(config);
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

      // console.log("HealthinsuranceList inside:2 ", insurances);
    };
    getConfig();
    // console.log("Healthinsurancelist middle: ", insurances);
  }, []);

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
                            defaultValue=""
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
                      </div>}></DynamicCard>
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
                      <Button color="secondary" onClick={submitHandler}>
                        Find an appointment
                      </Button>
                    </center>
                  </div>
                }
              ></DynamicCard>
              {search ? (
                <div>
                  <DynamicCard
                    variant="outlined"
                    content={
                      <div>
                        <center>
                        <h4>We found the following results for you:</h4>
                        </center>
                        <div>
                          {!isLoading &&
                            doctorlist.length > 0 &&
                            doctorlist.map((doctor) => (
                              <Doctor
                                key={doctor.id}
                                doctor={doctor}
                                readOnly={true}
                              />
                            ))}
                          {!isLoading && doctorlist.length === 0 && (
                            <center>
                              <p>Found no doctors.</p>
                              <p>
                                <Button href="/find-doctor">
                                  Try new search
                                </Button>
                              </p>
                            </center>
                          )}
                          {isLoading && <p>Loading...</p>}
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

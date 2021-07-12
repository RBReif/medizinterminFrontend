import React, { useState , useEffect} from "react";
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
import ConfigService from "../services/ConfigService"




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
    paddingBottom: '5%'
  },
}));




const FindADoctorView = () => {
  const [timeslots, setTimeSlots] = useState("");
  //const [toggle, setToggle] = useState(facilities.isActive);
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

  const [insurances, setInsurances ] = useState([])
  const [languages, setLanguages ] = useState([])
  const [areas, setAreas] = useState([])
  const [facilities, setFacilities] = useState([])
  useEffect(  () => {
    const getConfig = async () => {
      const config = await ConfigService.getConfig()

      setInsurances(config.insurances.map((item) => {return {"displayname": item.valueOf()}}))
      setLanguages(config.languages.map((item) => {return {"displayname": item.valueOf()}}))
      setAreas(config.areas.map((item) => {return {"displayname": item.valueOf()}}))
      setFacilities(config.facilities.map((item) => {return {"displayname": item.valueOf(),"isActive": false}}))

      console.log("HealthinsuranceList inside:2 ", insurances)

    }
    getConfig()
    console.log("Healthinsurancelist middle: ", insurances)
  }, [])




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
                            label="Please choose the type of doctor you need"
                            items={areas}
                         //   onChange={doctorChange}
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
                          items={languages}
                        ></DynamicDropdown>
                      }
                    ></DynamicCard>
                    <DynamicCard
                      variant="body2"
                      content={
                        <DynamicDropdown
                          label="Please choose your health insurance"
                          items={insurances}
                        ></DynamicDropdown>
                      }
                    ></DynamicCard>
                    <div>
                      {facilities.map((toggle) => {
                        return (
                          <DynamicSwitch
                            id={toggle.id}
                            displayname={toggle.displayname+" needed"}
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

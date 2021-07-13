import { Container, Col, Row } from "react-bootstrap";
// import DynamicDropdown from "../components/Forms/DynamicDropdown";
// import DynamicSwitch from "../components/Forms/DynamicSwitch";
import React, { useState } from "react";
import Page from "../components/Page";
import { Theme } from "../components/UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import Doctor from "../components/Doctor/Doctor";
import DynamicCard from "../components/UI/DynamicCard";
import { Button } from "@material-ui/core";

const ResultsView = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);

  async function fetchDoctorsHandler() {
    isLoading(true);
    const response = "...";
    const data = "...";

    const transformedDoctors = data.results.map((doctorData) => {
      return {
        id: doctorData.id,
        title: doctorData.title,
      };
    });
    setDoctors(transformedDoctors);
    setIsLoading(false);
  }

  console.log(doctors);

  return (
    <ThemeProvider theme={Theme}>
      <Page>
        <Container>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col xl={10} xs={10}>
              <DynamicCard
                variant="body2"
                content={
                  <div>
                    {!isLoading &&
                      doctors.length > 0 &&
                      doctors.map((doctor) => (
                        <Doctor key={doctor.id} doctor={doctor} />
                      ))}
                    {!isLoading && doctors.length === 0 && (
                      <center>
                        <p>Found no doctors.</p>
                        <p>
                          <Button href="/">Try new search</Button>
                        </p>
                        <p>
                          <Doctor
                            name="Max Mustermann"
                            profession="Dentist"
                            address="Ungererstr. 58, 80805 München"
                          ></Doctor>
                        </p>
                      </center>
                    )}
                    {isLoading && <p>Loading...</p>}
                  </div>
                }
              />
            </Col>
            <Col></Col>
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

export default ResultsView;

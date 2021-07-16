// import { Container, Col, Row } from "react-bootstrap";
// import DynamicDropdown from "../components/Forms/DynamicDropdown";
// import DynamicSwitch from "../components/Forms/DynamicSwitch";
import React, { useState } from "react";
import Page from "../components/Page";
import { Theme } from "../components/UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import Doctor from "../components/Doctor/Doctor";
import DynamicCard from "../components/UI/DynamicCard";
import { Button, Grid } from "@material-ui/core";
import {
    useLocation
} from "react-router-dom";



const doctorlist = [
  {
    id: "1",
    name: "Max Mustermann",
    profession: "Dentist",
    address: "Ungererstr. 58, 80805 München",
    phone: "123456",
    avgAudienceRating: "4",
    appointments: [{
        id: 6,
        color: "#fd3153",
        to: new Date(),
        title: "This is an aifjejffjewjgwejgjewigoifsiosfa",
        from: new Date(),
      },  {
        id: 6,
        color: "#fd3153",
        to: new Date(),
        title: "This is an event 2",
        from: new Date(),
      },],
  },
  {
    id: "2",
    name: "isjdgjdjsg fiaojs",
    profession: "Dentist",
    address: "Münchner Freiheit 12, 80803 München",
    avgAudienceRating: "5",
    phone: "12345678",
    appointments: [{},{}],
  },
];

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const ResultsView = (props) => {
    const query = useQuery()
    const radius = query.get("radius")
    console.log(radius)
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);

  // render() {
  //   const { data } = useLocation().data;
  //   return (
  //     // render logic here
  //   )
  // }

//   async function fetchDoctorsHandler() {
//     isLoading(true);
//     const response = "...";
//     const data = "...";

//     const transformedDoctors = data.results.map((doctorData) => {
//       return {
//         id: doctorData.id,
//         title: doctorData.title,
//       };
//     });
//     setDoctors(transformedDoctors);
//     setIsLoading(false);
//   }

  console.log(doctors);

  return (
    <ThemeProvider theme={Theme}>
      <Page>
          <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        //   style={{ minHeight: "80vh" }}
        >
            <Grid><p>We found the following results for you:</p></Grid>
          <Grid>
            <DynamicCard
              variant="body2"
              content={
                <div>
                  {!isLoading &&
                    doctorlist.length > 0 &&
                    doctorlist.map((doctor) => (
                      <Doctor key={doctor.id} doctor={doctor} readOnly={true} />
                    ))}
                  {!isLoading && doctorlist.length === 0 && (
                    <center>
                      <p>Found no doctors.</p>
                      <p>
                        <Button href="/find-doctor">Try new search</Button>
                      </p>
                    </center>
                  )}
                  {isLoading && <p>Loading...</p>}
                </div>
              }
            />
          </Grid>
        </Grid>
      </Page>
    </ThemeProvider>
  );
};

export default ResultsView;

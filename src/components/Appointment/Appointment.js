import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { Theme } from "../UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import Ratings from "../Forms/Ratings";
import { Card } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));


const Appointment = (props) => {
    const classes = useStyles();    
    return (
        <ThemeProvider theme={Theme}>
          {console.log("props: ", props)}
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="doctor"
                    className={classes.avatar}
                    src="https://cdn.shopify.com/s/files/1/1390/2701/t/5/assets/doctor.jpg?v=12170138145179114637"
                  ></Avatar>
                }
                title={<b>{props.props.doctor_name} {props.props.last_name}</b>} 
                subheader={
                  <div>
                    {props.props.doctor_area_of_expertise}
                    <br></br>
                    {props.props.startPoint}
                    <br></br>
                    {props.props.doctor_address}
                    <br></br>
                    <Ratings 
                    value={props.props.audienceRatings}
                    readOnly={props.readOnly}
                    />
                    {/* <Rating
                      name="read-only"
                      value={props.doctor.avgAudienceRating}
                      readOnly
                    /> */}
                    {/* {showNumber ? props.doctor.phone : ""} */}
                  </div>
                }
              />
            </Card>
        </ThemeProvider>
      );
    };
export default Appointment;
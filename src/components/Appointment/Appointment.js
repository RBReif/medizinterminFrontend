import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Button } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CallIcon from "@material-ui/icons/Call";
import NavigationIcon from "@material-ui/icons/Navigation";
import { Theme } from "../UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import { Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Ratings from "../Forms/Ratings";
import DynamicCard from "../UI/DynamicCard";
import { lightBlue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
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
          <Box p={2} xs={1} xl={1}>
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="doctor"
                    className={classes.avatar}
                    src="https://cdn.shopify.com/s/files/1/1390/2701/t/5/assets/doctor.jpg?v=12170138145179114637"
                  ></Avatar>
                }
                title={<b>{props.props.name} {props.props.last_name}</b>} 
                subheader={
                  <div>
                    {props.props.area_of_expertise}
                    <br></br>
                    {props.props.startPoint}
                    <br></br>
                    {props.props.address}
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
          </Box>
        </ThemeProvider>
      );
    };
export default Appointment;
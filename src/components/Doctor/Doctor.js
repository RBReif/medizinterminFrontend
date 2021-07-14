import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import { Button } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CallIcon from "@material-ui/icons/Call";
import NavigationIcon from "@material-ui/icons/Navigation";
import { Theme } from "../UI/Theme";
import { ThemeProvider } from "@material-ui/styles";

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

const Doctor = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [showNumber, setShowNumber] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleNumberClick = () => {
    setShowNumber(!showNumber);
  }

  return (
    <ThemeProvider theme={Theme}>
      {console.log("props: ", props)}
      {console.log("props.doctor: ", props.doctor)}
      {console.log("props.doctor.appointments: ", props.doctor.appointments)}
      <p>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="doctor"
                className={classes.avatar}
                src="https://cdn.shopify.com/s/files/1/1390/2701/t/5/assets/doctor.jpg?v=12170138145179114637"
              ></Avatar>
            }
            title={<b>{props.doctor.name}</b>} //query doctor name + profession
            subheader={
              <div>
                {props.doctor.profession}<br></br>
                {props.doctor.address}<br></br>
                {showNumber ? props.doctor.phone : ""}
              </div>
            }
          />
          <CardActions disableSpacing>
            <IconButton aria-label="call doctor">
              <CallIcon onClick={handleNumberClick}/>
            </IconButton>
            <IconButton aria-label="navigate">
              <NavigationIcon />
            </IconButton>
            <Button onClick={handleExpandClick} variant="" size="small">
              Show Appointments
            </Button>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {/* {props.doctor.appointments.map(appointment) (
                <li> {appointment.title} <Button size="small" color="primary">
                Book appointment
              </Button></li>)}; */}
          </CardContent>
          </Collapse>
        </Card>
      </p>
    </ThemeProvider>
  );
};

export default Doctor;

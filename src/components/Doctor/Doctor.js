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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="doctor"
              className={classes.avatar}
              src="https://cdn.shopify.com/s/files/1/1390/2701/t/5/assets/doctor.jpg?v=12170138145179114637"
            ></Avatar>
          }
          title={<p>{props.name}</p>} //query doctor name + profession
          subheader={
            <div>
              <p>{props.profession}</p>
              <p>{props.address}</p>
            </div>
          }
        />
        <CardActions disableSpacing>
          <IconButton aria-label="call doctor">
            <CallIcon />
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
            <li>
              Appointment 1{" "}
              <Button size="small" color="primary">
                Book appointment
              </Button>
            </li>
            <li>
              Appointment 1{" "}
              <Button size="small" color="primary">
                Book appointment
              </Button>
            </li>
          </CardContent>
        </Collapse>
      </Card>
    </ThemeProvider>
  );
};

export default Doctor;

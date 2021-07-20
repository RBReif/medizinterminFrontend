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
import Ratings from "../Forms/Ratings";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
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
  const [avgAudienceRating, setAvgAudienceRating] = React.useState("");
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleNumberClick = () => {
    setShowNumber(!showNumber);
  };

  console.log("props.appointments", props.appointment);
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
            action={
              <Button onClick={handleExpandClick} color="primary"  size="small">
              Book Appointment
            </Button>
            }
            title={
              <b>
                {props.doctor.firstname} {props.doctor.lastname}
              </b>
            } //query doctor name + profession
            subheader={
              <div>
                <Ratings
                  value={props.doctor.audience_ratings}
                  readOnly={true}
                />
              </div>
            }
          />
          <CardContent>
            <div>
              <Tabs
                orientation="horizontal"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
              >
                <Tab label="Appointment Details" {...a11yProps(0)} />
                <Tab label="About" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <b>Appointment at</b> {props.appointment.startPoint}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {props.doctor.area_of_expertise}
                <br></br>
                <b>Address: </b> {props.doctor.address.address_value}
                <br></br>
                <b>Languages:</b> {props.doctor.languages.map((language) => {return (language + " ")})}
                <br></br>
                <b>Special Facilties:</b> {props.doctor.special_facilities.map((facility) => {return (facility + " ")})}
              </TabPanel>
            </div>
          </CardContent>

          <CardActions disableSpacing>
          </CardActions>
        </Card>
    </ThemeProvider>
  );
};

export default Doctor;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { Theme } from "../UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import Ratings from "../Forms/Ratings";
import { Card } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AppointmentService from "../../services/AppointmentService";
import DoctorService from "../../services/DoctorService";
import { useEffect } from "react";

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
  const [avgAudienceRating, setAvgAudienceRating] = React.useState("");
  const classes = useStyles();

  const clickHandler = async () => {
    if (window.confirm("Are you sure you want to delete your appointment?")) {
      let res = await AppointmentService.updateAppointment(
        props.props._id,
        "AVAILABLE",
        "",
        "",
        null
      );
      alert("We deleted your appointment on " + res.startPoint);
      window.location.reload();
    } else {
    }
  };

  const extractRating = () => {
    if (!props.props.doctor) {
      return;
    }
    const getInitialRating = async () => {
      const audienceRating = await DoctorService.getRating(props.props.doctor);
      setAvgAudienceRating(audienceRating.rating);
      console.log("Average initial", audienceRating.rating);
    };
    getInitialRating();
  };

  useEffect(() => {
    if (!props.new) {
      extractRating();
    }
  }, [props.props.doctor, props.new]);

  const onChangeOwnRating = async (value) => {
    // console.log("Props in onChangeOwnRating: ", props);
    // console.log("Props.doctor in onChangeOwnRating: ", props.props.doctor);
    await DoctorService.rateDoctor(props.props.doctor, value);
    let newAvgAudienceRating = await DoctorService.getRating(
      props.props.doctor
    );
    setAvgAudienceRating(newAvgAudienceRating.rating);
    console.log("OnChange Rating", newAvgAudienceRating.rating);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="doctor"
              className={classes.avatar}
              src={props.props.doctor_thumbnail}
            ></Avatar>
          }
          action={
            props.upcoming ? (
              <IconButton aria-label="Close" onClick={clickHandler}>
                <DeleteForeverIcon />
              </IconButton>
            ) : (
              <Ratings
                avgAudienceRating={avgAudienceRating}
                onChangeOwnRating={(value) => onChangeOwnRating(value)}
                readOnly={false}
              />
            )
          }
          title={
            <b>
              {props.props.doctor_name} {props.props.doctor_last_name}
            </b>
          }
          subheader={
            <div>
              {props.props.doctor_area_of_expertise}
              <br></br>
              {props.props.startPoint}
              <br></br>
              {props.props.doctor_address}
              <br></br>
              {props.upcoming ? (
                <Ratings
                  avgAudienceRating={avgAudienceRating}
                  readOnly={props.readOnly}
                />
              ) : (
                ""
              )}
            </div>
          }
        />
      </Card>
    </ThemeProvider>
  );
};
export default Appointment;

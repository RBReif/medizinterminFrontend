import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { Theme } from "../UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import Ratings from "../Forms/Ratings";
import { Card, CardContent } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AppointmentService from "../../services/AppointmentService";
import DoctorService from "../../services/DoctorService";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth:300,
    maxWidth:400,
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
  const [value, setValue] = React.useState("");
  const classes = useStyles();

  const clickHandler = async () => {
    if (window.confirm("Are you sure you want to delete your appointment?")) {
      let res = await AppointmentService.updateAppointment(
        props.appointment._id,
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
    if (!props.appointment.doctor) {
      return;
    }
    const getInitialRating = async () => {
      const audienceRating = await DoctorService.getRating(props.appointment.doctor);
      setAvgAudienceRating(audienceRating?.rating);
      setValue(audienceRating?.rating)
      console.log("Average initial",props.appointment.title, audienceRating?.rating);
    };
    getInitialRating();
  };

  useEffect(() => {
    if (!props.new) {
      extractRating();
    }
  }, [props.appointment.doctor, props.new]);

  const onChangeOwnRating = async (value) => {
    setValue(value);
    console.log("Props in onChangeOwnRating: ", props?.id);
    // console.log("Props.doctor in onChangeOwnRating: ", props.props.doctor);
    await DoctorService.rateDoctor(props?.appointment?.doctor, value);
    let newAvgAudienceRating = await DoctorService.getRating(
      props.appointment.doctor
    );
    setAvgAudienceRating(newAvgAudienceRating?.rating);
    // console.log("OnChange Rating", newAvgAudienceRating.rating);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="doctor"
              className={classes.avatar}
              src={props.appointment.doctor_thumbnail}
            ></Avatar>
          }
          action={
            props.upcoming ? (
              <IconButton aria-label="Close" onClick={clickHandler}>
                <DeleteForeverIcon />
              </IconButton>
            ) : (
              <Ratings
                id={props.id}
                key={props.id}
                value={value}
                onChangeOwnRating={(value) => onChangeOwnRating(value)}
                readOnly={false}
              />
            )
          }
          title={
            <b>
              {props.appointment.doctor_name} {props.appointment.doctor_last_name}
            </b>
          }
          subheader={
            <div>
              {props.appointment.doctor_area_of_expertise}
              <br></br>
              {props.appointment.startPoint}
              <br></br>
             
            </div>
          }
        />
        <CardContent>
        <div> {props.appointment?.doctor_address}
              <br></br>
                <div>
                <Ratings
                  id={props.id}
                  key={props.id}
                  value={value}
                  avgAudienceRating={avgAudienceRating ? avgAudienceRating:""}
                  readOnly={true}
                />
                </div>
             </div>

        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
export default Appointment;

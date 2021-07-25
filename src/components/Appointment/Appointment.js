import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { Theme } from "../UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import Ratings from "../Forms/Ratings";
import { Card, CardContent } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AppointmentService from "../../services/AppointmentService";
import PatientService from "../../services/PatientService";
import UserService from "../../services/UserService";
import DoctorService from "../../services/DoctorService";
import CallIcon from '@material-ui/icons/Call';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@material-ui/core";
import AlertDialog from "../Modal/Dialog";
import calcDistance from "../Forms/Location/CalcDistance";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
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
  const [doctor, setDoctor] = React.useState("");
  const [patient, setPatient] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [confirmMessage, setConfirmMessage] = React.useState(false);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const extractInformation = () => {
    if (!props.appointment.doctor) {
      return;
    }
    const getDoctor = async () => {
      const newDoctor = await DoctorService.getDoctor(
        props?.appointment?.doctor
      );
      setDoctor(newDoctor);
    };

    const getPatient = async () => {
      let newPatient = await PatientService.getPatient(
        UserService.getCurrentUser().id
      );
      setPatient(newPatient);
    };
    getDoctor();
    getPatient();
  };

  const extractRating = () => {
    if (!props.appointment.doctor) {
      return;
    }
    const getInitialRating = async () => {
      const audienceRating = await DoctorService.getRating(
        props.appointment.doctor
      );
      setAvgAudienceRating(audienceRating?.rating);
      setValue(audienceRating?.rating);
      // console.log("Average initial",props.appointment.title, audienceRating?.rating);
    };
    getInitialRating();
  };

  useEffect(() => {
    if (!props.new) {
      extractRating();
      extractInformation();
    }
  }, [props.appointment.doctor, props.new]);

  const onChangeOwnRating = async (value) => {
    setValue(value);
    // console.log("Props in onChangeOwnRating: ", props?.id);
    // console.log("Props.doctor in onChangeOwnRating: ", props.props.doctor);
    await DoctorService.rateDoctor(props?.appointment?.doctor, value);
    let newAvgAudienceRating = await DoctorService.getRating(
      props.appointment.doctor
    );
    setAvgAudienceRating(newAvgAudienceRating?.rating);
    // console.log("OnChange Rating", newAvgAudienceRating.rating);
  };

  const onClickDirections = () => {
    const getDoctor = async () => {
      const newDoctor = await DoctorService.getDoctor(
        props?.appointment?.doctor
      );
      setDoctor(newDoctor);
    };

    const getPatient = async () => {
      let newPatient = await PatientService.getPatient(
        UserService.getCurrentUser().id
      );
      setPatient(newPatient);
    };
    window.open(
      "https://www.google.com/maps/dir/?api=1&origin=" +
        patient?.address?.address_value +
        "&destination=" +
        doctor?.address?.address_value +
        "&travelmode=public",
      "_blank"
    );
  };

  const onClickDelete = () => {
    setOpenDialog(true);
  };

  const onConfirmDeletion = () => {
    setOpenConfirm(false);
    window.location.reload();
  };

  const onDelete = async () => {
    let res = await AppointmentService.updateAppointment(
      props.appointment._id,
      "AVAILABLE",
      "",
      "",
      null
    );
    let convertedDate = new Date(res.startPoint);
    let convertedDay = convertedDate.getDate();
    let convertedMonth = convertedDate.getMonth() + 1;
    let convertedYear = convertedDate.getFullYear();
    let convertedHour = convertedDate.getHours();
    let convertedMinutes =
      (convertedDate.getMinutes() < 10 ? "0" : "") + convertedDate.getMinutes();

    setOpenDialog(false);
    setConfirmMessage(
      "We deleted your appointment on " +
        convertedDay +
        "." +
        convertedMonth +
        "." +
        convertedYear +
        " at " +
        convertedHour +
        ":" +
        convertedMinutes +
        "."
    );
    setOpenConfirm(true);
  };

  let distance =
    Math.round(
      calcDistance(
        patient?.address?.lat,
        patient?.address?.lng,
        doctor?.address?.lat,
        doctor?.address?.lng
      ) * 10
    ) / 10;

  let convertedDate = new Date(props.appointment.startPoint);
  let convertedDay = convertedDate.getDate();
  let convertedMonth = convertedDate.getMonth() + 1;
  let convertedYear = convertedDate.getFullYear();
  let convertedHour = convertedDate.getHours();
  let convertedMinutes =
    (convertedDate.getMinutes() < 10 ? "0" : "") + convertedDate.getMinutes();

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
              <Tooltip
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                title="Cancel appointment"
              >
                <IconButton aria-label="Close" onClick={onClickDelete}>
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
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
              {props.appointment.doctor_name}{" "}
              {props.appointment.doctor_last_name}
            </b>
          }
          subheader={
            <div>
              {props.appointment.doctor_area_of_expertise}
              <br></br>
              {props.appointment.doctor_phone_number}
              <br></br>
              {convertedDay}.{convertedMonth}.{convertedYear} at {convertedHour}
              :{convertedMinutes}
              <br></br>
            </div>
          }
        />
        <CardContent>
          <div>
            {" "}
            {props.appointment?.doctor_address}{" "}
            {props.upcoming ? "(" + distance + " km away from you)" : ""}
            <br></br>
            <div>
              <Ratings
                id={props.id}
                key={props.id}
                value={value}
                avgAudienceRating={avgAudienceRating ? avgAudienceRating : ""}
                readOnly={true}
              />
              <br></br>
              {props.upcoming ? (
                <Button
                  style={{ marginLeft: 3 }}
                  size="small"
                  color="primary"
                  onClick={onClickDirections}
                >
                  get directions
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
        </CardContent>
        <AlertDialog
          open={openDialog}
          onCancel={() => setOpenDialog(false)}
          onClose={onDelete}
          secondButton={true}
          title="Delete Appointment"
          text="Are you sure you want to delete your appointment?"
        />
        <AlertDialog
          open={openConfirm}
          onClose={onConfirmDeletion}
          secondButton={false}
          title="Deleted Appointment"
          text={confirmMessage}
        />
      </Card>
    </ThemeProvider>
  );
};
export default Appointment;

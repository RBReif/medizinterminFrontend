import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import { Theme } from "../UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import { Button, Card } from "@material-ui/core";

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

const Recommendation = (props) => {
  const classes = useStyles();
  const link = "/find-doctor?area=" + props.props.area;
  return (
    <ThemeProvider theme={Theme}>
      {console.log("props: ", props)}
      <Card className={classes.root}>
        <CardHeader
          title={<h5>{props.props.title} </h5>}
          subheader={
            <div>
              {props.props.description}
              <br></br>
            </div>
          }
        />
        <p>
          <Button color="secondary" size="small" href={link}>
            Book {props.props.area}
          </Button>
        </p>
      </Card>
    </ThemeProvider>
  );
};
export default Recommendation;

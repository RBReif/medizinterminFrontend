import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { Theme } from "../UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import Ratings from "../Forms/Ratings";
import {Button, Card} from "@material-ui/core";


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
    const link = "/find-doctor?area="+props.props.area
    return (
        <ThemeProvider theme={Theme}>
            {console.log("props: ", props)}
            <Card className={classes.root}>
                <CardHeader

                    title={<b>{props.props.title} </b>}
                    subheader={
                        <div>
                            {props.props.description}
                            <br></br>


                            {/* <Rating
                      name="read-only"
                      value={props.doctor.avgAudienceRating}
                      readOnly
                    /> */}
                            {/* {showNumber ? props.doctor.phone : ""} */}
                        </div>


                    }
                />
                <p>

                    <Button href={link}>
                        Book appointment at {props.props.area}
                    </Button>
                </p>
            </Card>
        </ThemeProvider>
    );
};
export default Recommendation;
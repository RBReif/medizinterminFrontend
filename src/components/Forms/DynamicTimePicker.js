import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";

const DynamicTimePicker = (props) => {

   const dateChangeHandler = (date) => {
     props.changehandler(date);
   };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
      <KeyboardTimePicker
                margin="normal"
                variant="inline"
                id={props.id}
                todayLabel="now"
                label={props.label}
                minutesStep={10}
                ampm={false}
                value={props.selected}
                onChange={dateChangeHandler}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DynamicTimePicker;

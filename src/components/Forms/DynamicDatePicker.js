import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

//What is this component about? 
//This is a dynamic datepicker. It is a pop-up which will let the user set a date
//There is another component to set the time. Check out DynamicTimePicker.js
//PROPS: id, label, value
const DynamicDatePicker = (props) => {

   const dateChangeHandler = (date) => {
     props.changehandler(date);
   };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          variant="inline"
          id={props.id}
          label={props.label}
          format="dd/MM/yyyy"
          value={props.selected}
          onChange={dateChangeHandler}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DynamicDatePicker;

import { Form } from "react-bootstrap";
import { useState } from "react";
import React from "react";
import DynamicCard from "../UI/DynamicCard";
import { ThemeProvider } from "@material-ui/styles";
import { Theme } from "../UI/Theme";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";

const DynamicSwitch = (props) => {
  const [done, setDone] = useState(false);

  function handleClick() {
    setDone(!done);
    props.onChange(props.displayname, !done)
  }

  return (
    <ThemeProvider theme={Theme}>
      <DynamicCard
        variant="body2"
        content={
          <Form>
            <p>{props.displayname}</p>
            {/* <FormLabel component="legend"></FormLabel> */}
            <FormControlLabel
              control={
                <Switch checked={done} onClick={handleClick} name={props.id} color="primary" />
              }
              label={done ? "Yes" : "No"}
            ></FormControlLabel>
          </Form>
        }
      ></DynamicCard>
    </ThemeProvider>
  );
};

export default DynamicSwitch;

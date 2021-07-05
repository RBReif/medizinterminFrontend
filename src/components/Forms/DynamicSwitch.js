import { Form } from "react-bootstrap";
import { useState } from "react";
import React from "react";
import DynamicCard from "../UI/DynamicCard";

const DynamicSwitch = (props) => {
  const [done, setDone] = useState(false);

  function handleClick() {
    setDone(!done);
  }

  console.log(done);

  return (
    <DynamicCard variant="body2"
      content={
        <Form>
          <Form.Label>{props.displayname}</Form.Label>
          <Form.Check
            onClick={handleClick}
            type="switch"
            id={props.id}
            label={done ? "Yes" : "No"}
          ></Form.Check>
        </Form>
      }
    ></DynamicCard>
    // <p>
    // <Card className={classes.root}>
    //   <CardContent>
    //     <Typography variant="body2" component="p">
    //       <Form>
    //         <Form.Label>{props.displayname}</Form.Label>
    //         <Form.Check
    //           onClick={handleClick}
    //           type="switch"
    //           id={props.id}
    //           label={done ? "Yes" : "No"}
    //         ></Form.Check>
    //       </Form>
    //     </Typography>
    //   </CardContent>
    // </Card>
    // </p>
  );
};

export default DynamicSwitch;

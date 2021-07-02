import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";


const GenericButton = (props) => {
  return (
    <Button
      variant={props.variant}
      menuAlign="right"
      title={props.title}
      id={props.id}
      size = {props.size}
    >
      <Link to={props.path}>{props.title}</Link>
    </Button>
  );
};

export default GenericButton;

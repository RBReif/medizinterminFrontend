import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";


const Register = (props) => {
    return (
        <Button
            variant="outline-primary"
            menuAlign="right"
            title="Register"
            id="dropdown-menu-align-right"
            // href="/login"
        >
            <Link to="/register">Register</Link>
        </Button>
    );
};

export default Register;
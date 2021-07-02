import { Form, Button, Container, Col} from "react-bootstrap";
import LogInButton from "../../components/components-chris/navigation/LogInButton";
import RegisterButton from "../../components/components-chris/navigation/RegisterButton";
import RegisterButtonProfessional from "../../components/components-chris/navigation/RegisterButtonProfessional";

const LoginProf = () => {
    return(
        <Container>
            <Col></Col>
            <h2>Login for medical professionals</h2>
            <Col>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                    <br/>
                    <Form.Text className="text-muted">
                        Not registered yet? Sign up now:
                    </Form.Text>
                    <RegisterButtonProfessional></RegisterButtonProfessional>





                </Form>
            </Col>
            <Col></Col>

        </Container>
    );
};

export default LoginProf;
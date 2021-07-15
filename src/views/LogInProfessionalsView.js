import { Form, Container, Col } from "react-bootstrap";
import Page from "../components/Page";
import { Button } from "@material-ui/core";
import { Theme } from "../components/UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import moment from "moment";

const LoginProf = () => {
  return (
    <ThemeProvider theme={Theme}>
    <Page>
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
              <Form.Check type="checkbox" label="Keep me logged in" />
            </Form.Group>

            <Button type="submit">
              Submit
            </Button>
            <br />
            <Form.Text className="text-muted">
              Not registered yet? Sign up now:
            </Form.Text>
            <Button color="primary" Link to="/register-professionals">Register</Button>
          </Form>
        </Col>
        <Col></Col>
      </Container>
    </Page>
    </ThemeProvider>
  );
};

export default LoginProf;

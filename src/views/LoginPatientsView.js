import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {login} from "../redux/actions/userActions";
import {Container, Col} from "react-bootstrap";
import LoginComponent from "../components/UserLoginComponent";
import Page from "../components/Page";
import {Theme} from "../components/UI/Theme";
import {ThemeProvider} from "@material-ui/styles";

/**
 * For user login
 * @param {props} props
 */
function LoginPatientsView(props) {
    const userData = useSelector((state) => state.user);

    useEffect(() => {
        if (userData?.user?.username) {
            props.history.push("/find-doctor");
        }
    }, [userData, props.history]);

    const onLogin = (username, password) => {
        props.dispatch(login(username, password));
        //props.history.push("/find-doctor");
    };

    const onCancel = () => {
        props.history.push("/");
    };

    const onSignUp = () => {
        props.history.push("/register-patients");
    };

    return (
        <ThemeProvider theme={Theme}>
            <Page>
                <Container>
                    <center>
                        <br />
                        <Col></Col>
                        <p><h3>Login for Patients</h3></p>
                        <Col></Col>
                        <Col>
                            <LoginComponent
                                user={userData.user}
                                onCancel={onCancel}
                                onLogin={onLogin}
                                onSignUp={onSignUp}
                            />
                        </Col>
                        <br/>
                    </center>
                </Container>
            </Page>
        </ThemeProvider>
    );
}

export default connect()(withRouter(LoginPatientsView));

import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {connect, useSelector} from "react-redux";

import PatientSignUp from "../components/PatientSignUp";
import Page from "../components/Page";
import {register} from "../redux/actions";
import {Theme} from "../components/UI/Theme";
import {ThemeProvider} from "@material-ui/styles";
import {Form, Button, Container, Col, Row} from "react-bootstrap";
import ConfigService from "../services/ConfigService";


/**
 * For register new users
 * @param {props} props
 */
function RegisterPatientsView(props) {
    const user = useSelector((state) => state.user);

    const onRegister = (username, password, firstName, lastName, birthDate, healthInsurance, address) => {
        props.dispatch(register(username, password, firstName, lastName, birthDate, healthInsurance, address));
    };

    const onCancel = () => {
        props.history.push("/");
    };

    return (
        <ThemeProvider theme={Theme}>
            <div className="Landing">
            <Page>
                <br/>
                <Col><PatientSignUp
                    user={user}
                    onRegister={onRegister}
                    onCancel={onCancel}
                /></Col>
                <br/>
            </Page>
                </div>
        </ThemeProvider>
    );
}

export default connect()(withRouter(RegisterPatientsView));

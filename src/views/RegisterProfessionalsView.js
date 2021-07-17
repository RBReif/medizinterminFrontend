import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {register} from "../redux/actions/doctorActions";

import {Theme} from "../components/UI/Theme";
import {ThemeProvider} from "@material-ui/styles";
import SignUpComponent from "../components/Doctor/DoctorSignUp";
import Page from "../components/Page";
import {Col} from "react-bootstrap";


/**
 * For register new users
 * @param {props} props
 */
function RegisterProfessionals(props) {
    const user = useSelector((state) => state.user);

    const onRegister = (username, password, firstName, lastName, birthDate, expertise, languageList, address) => {
        props.dispatch(register(username, password, firstName, lastName, birthDate, expertise, languageList, address));
    };

    const onCancel = () => {
        props.history.push("/");
    };

    return (
        <ThemeProvider theme={Theme}>
            <div className="Landing">
            <Page>
                <br/>
                <Col></Col>
                <Col><SignUpComponent
                    user={user}
                    onRegister={onRegister}
                    onCancel={onCancel}
                /></Col>
                <Col></Col>
                <br/>
            </Page>
                </div>
        </ThemeProvider>
    );
}

export default connect()(withRouter(RegisterProfessionals));

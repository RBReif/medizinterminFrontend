import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {register} from "../redux/actions";

import Page from "../components/Page";
import PatientSignUp from "../components/PatientSignUp";
import {Theme} from "../components/UI/Theme";
import {ThemeProvider} from "@material-ui/styles";
import {Col} from "react-bootstrap";


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

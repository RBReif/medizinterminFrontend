import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {update} from "../redux/actions/userActions";
import Page from "../components/Page";
import PatientEditProfile from "../components/Patient/PatientEditProfile";
import {Theme} from "../components/UI/Theme";
import {ThemeProvider} from "@material-ui/styles";
import {Col} from "react-bootstrap";



/**
 * For register new users
 * @param {props} props
 */
function EditProfilePatientsView(props) {
    const user = useSelector((state) => state.user);


    const onSubmit = (id, firstName, lastName, username, pictureUrl, gender, healthInsurance, address) => {
        props.dispatch(update(id, firstName, lastName, username, pictureUrl, gender, healthInsurance, address));
        alert(
            "Your profile changes have been successfully submitted.You will now be redirected to your dashboard."
        );
        props.history.push("/dashboard");
        // window.location.reload(); // this is super ugly --> we need to fix this
    };

    const onCancel = () => {
        props.history.push("/");
    };

    return (
        <ThemeProvider theme={Theme}>
            <div className="Landing">
            <Page>
                <br/>
                <Col>
                    <PatientEditProfile
                        user={user}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                    />
                </Col>
                <br/>
            </Page>
            </div>
        </ThemeProvider>
    );
}

export default connect()(withRouter(EditProfilePatientsView));

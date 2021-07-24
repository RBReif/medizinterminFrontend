import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {update} from "../redux/actions/doctorActions";
import Page from "../components/Page";
import {Theme} from "../components/UI/Theme";
import {ThemeProvider} from "@material-ui/styles";
import {Col} from "react-bootstrap";
import DoctorEditProfile from "../components/Doctor/DoctorEditProfile";



/**
 * For register new users
 * @param {props} props
 */
function EditProfileProfessionalsView(props) {
    const user = useSelector((state) => state.user);

    const onSubmit = (id, firstName, lastName, username, phone, pictureUrl, expertise, languages, address, facilities) => {
        props.dispatch(update(id, firstName, lastName, username, phone, pictureUrl, expertise, languages, address, facilities));
        alert(
            "Your profile changes have been successfully submitted.You will now be redirected to your dashboard."
        );
        props.history.push("/doctor-dashboard");
        // window.location.reload(); // this is super ugly --> we need to fix this
    };

    const onCancel = () => {
        props.history.push("/doctor-dashboard");
    };

    return (
        <ThemeProvider theme={Theme}>
            <div className="Landing">
            <Page>
                <br/>
                <Col>
                    <DoctorEditProfile
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

export default connect()(withRouter(EditProfileProfessionalsView));

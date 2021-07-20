import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
    Paper,
    Button,
    TextField,
    Typography,
} from "@material-ui/core";
import {Col, Container, Form, Row} from "react-bootstrap";
import DynamicDropdown from "../Forms/DynamicDropdown";
import ConfigService from "../../services/ConfigService";
import LocationAutoComplete from "../Forms/Location/LocationAutoComplete";
import {useSelector} from "react-redux";
import {useHistory} from 'react-router-dom'
import MultiSelectDropdown from "../Forms/MultiSelectDropdown";
import DynamicSwitch from "../Forms/DynamicSwitch";

const useStyles = makeStyles((theme) => ({
    usersignUpRoot: {
        margin: "auto",
    },
    signUpPaper: {
        width: "800px",
        margin: "auto",
        padding: theme.spacing(2)
    },
    signUpRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        "&:last-child": {
            paddingBottom: theme.spacing(1),
        },
        "&:first-child": {
            paddingTop: theme.spacing(0),
        },
    },
    signUpButtons: {
        display: "flex",
        justifyContent: "flex-end",
    },
    signUpButton: {
        marginLeft: theme.spacing(1),
    },
}));

/**
 * For register new users
 * @param {props} props
 */
const SignUpComponent = (props) => {
    const history = useHistory()
    const userData = useSelector((state) => state.user);

    useEffect(() => {
        if (userData?.user?.username) {
            history.push("/doctor-dashboard");
        }
    }, [userData, history]);

    const classes = useStyles();

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [expertises, setExpertises] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [languageList, setLanguageList] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [address, setAddress] = useState({
        lat: null,
        lng: null,
    });
    const [expertise, setExpertise] = useState("");
    const [birthDate, setBirthDate] = React.useState("");
    const [pictureUrl, setPictureUrl] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [registerError, setRegisterError] = React.useState("");


    const onRegister = (e) => {
        e.preventDefault();
        let docFacilities = facilities.filter(x => x.isActive).map(x => x.displayname)
        props.onRegister(username, password, firstName, lastName, birthDate, expertise, languageList, address, docFacilities, pictureUrl);
    };

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value);
        setRegisterError("");
    };

    const onChangeLastName = (e) => {
        setLastName(e.target.value);
        setRegisterError("");
    };

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
        setRegisterError("");
    };

    const onSelectAddress = ({lat, lng}, address_value) => {
        setAddress({
            address_value,
            lat,
            lng,
        });
        setRegisterError("");
    };

    const onChangeExpertise = (e) => {
        setRegisterError("");
        setExpertise(e.target.value);

    };

    const onChangeBirthDate = (e) => {
        setBirthDate(e.target.value);
        setRegisterError("");
    };

    const onChangeLanguages = (value) => {
        setLanguageList(value);
    };

    const onChangeToggle = (displayname, isActive) => {
        let objIndex = facilities.findIndex(
            (obj) => obj.displayname === displayname
        );
        facilities[objIndex].isActive = !facilities[objIndex].isActive;
        return facilities;
    };

    const onChangePictureUrl = (e) => {
        setPictureUrl(e.target.value);
        setRegisterError("");
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setRegisterError("");
    };

    const onChangePassword2 = (e) => {
        setPassword2(e.target.value);
        setRegisterError("");
    };

    const onBlurPassword = (e) => {
        if (password !== "" && password2 !== "") {
            if (password !== password2) {
                setRegisterError("Passwords do not match.");
            } else {
                setRegisterError("");
            }
        }
    };

    useEffect(() => {
        const getConfig = async () => {
            const config = await ConfigService.getConfig()
            setExpertises(config.areas.map((item) => {
                return {"displayname": item.valueOf()}
            }));
            setLanguages(config.languages.map((item) => {
                return {"displayname": item.valueOf()}
            }));
            setFacilities(
                config.facilities.map((item) => {
                    return {"displayname": item.valueOf(), isActive: false};
                })
            );
        }
        getConfig()
    }, [])

    return (
        <div className={classes.usersignUpRoot}>
            <Container>
                <Paper className={classes.signUpPaper} component="form">
                    <Form>
                        <center><h4>Medical Professional Sign Up</h4></center>
                        <br/>
                        <Row>
                            <Col>
                                <Form.Label> First Name </Form.Label>
                                <div className={classes.signUpRow}>
                                    <TextField
                                        label="First Name"
                                        fullWidth
                                        value={firstName}
                                        onChange={onChangeFirstName}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <Form.Label> Last Name </Form.Label>
                                <div className={classes.signUpRow}>
                                    <TextField
                                        label="Last Name"
                                        fullWidth
                                        value={lastName}
                                        onChange={onChangeLastName}
                                    />
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Label> E-Mail </Form.Label>
                                <div className={classes.signUpRow}>
                                    <TextField
                                        label="E-Mail"
                                        fullWidth
                                        value={username}
                                        onChange={onChangeUsername}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <Form.Label> Date of Birth </Form.Label>
                                <div className={classes.signUpRow}>
                                    <TextField
                                        label="Date of Birth as MM-DD-YYYY"
                                        fullWidth
                                        value={birthDate}
                                        onChange={onChangeBirthDate}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3}>
                                <DynamicDropdown
                                    key={expertises.id}
                                    defaultValue=""
                                    label="Area of Expertise"
                                    items={expertises}
                                    onChange={onChangeExpertise}
                                ></DynamicDropdown>
                            </Col>
                            <Col sm={3}>
                                <MultiSelectDropdown
                                    label="Languages"
                                    items={languages}
                                    onChange={onChangeLanguages}
                                ></MultiSelectDropdown>
                            </Col>
                            <Col sm={6}>
                                <Form.Label> Address </Form.Label>
                                <LocationAutoComplete
                                    onSelect={onSelectAddress}
                                />
                            </Col>
                        </Row>
                        <Row><Col>
                            <div>
                                <br/>
                                <h5>Accessibility</h5>
                            </div>
                        </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div>
                                    {facilities.slice(0, 2).map((toggle) => {
                                        return (
                                            <DynamicSwitch
                                                key={toggle.id}
                                                id={toggle.id}
                                                displayname={toggle.displayname}
                                                onChange={onChangeToggle}
                                            ></DynamicSwitch>
                                        );
                                    })}
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    {facilities.slice(2, 4).map((toggle) => {
                                        return (
                                            <DynamicSwitch
                                                key={toggle.id}
                                                id={toggle.id}
                                                displayname={toggle.displayname}
                                                onChange={onChangeToggle}
                                            ></DynamicSwitch>
                                        );
                                    })}
                                </div>
                            </Col>
                        </Row>
                        <Form.Label> Profile Picture </Form.Label>
                        <div className={classes.signUpRow}>
                            <TextField
                                label="Picture URL"
                                fullWidth
                                value={pictureUrl}
                                onChange={onChangePictureUrl}
                            />
                        </div>
                        <Form.Label> Password </Form.Label>
                        <div className={classes.signUpRow}>
                            <TextField
                                label="Password"
                                fullWidth
                                value={password}
                                onChange={onChangePassword}
                                error={registerError !== ""}
                                onBlur={onBlurPassword}
                                type="password"
                            />
                        </div>
                        <Form.Label> Repeat Password </Form.Label>
                        <div className={classes.signUpRow}>
                            <TextField
                                label="Password"
                                fullWidth
                                value={password2}
                                onChange={onChangePassword2}
                                error={registerError !== ""}
                                onBlur={onBlurPassword}
                                type="password"
                            />
                        </div>

                        {registerError !== "" ? (
                            <div className={classes.signUpRow}>
                                <Typography color="error">{registerError}</Typography>
                            </div>
                        ) : null}
                        <div
                            className={classes.signUpRow + " " + classes.signUpButtons}
                        >
                            <Button
                                className={classes.signUpButton}
                                onClick={props.onCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                className={classes.signUpButton}
                                variant="contained"
                                color="primary"
                                onClick={onRegister}
                                disabled={
                                    username === "" ||
                                    password === "" ||
                                    password2 === "" ||
                                    firstName === "" ||
                                    lastName === "" ||
                                    birthDate === "" ||
                                    expertise === "" ||
                                    address.lat === "" ||
                                    address.lng === "" ||
                                    registerError !== "" ||
                                    password !== password2
                                }
                                type="submit"
                            >
                                Register
                            </Button>
                        </div>
                    </Form>
                </Paper>
            </Container>
        </div>
    );
}
export default SignUpComponent;

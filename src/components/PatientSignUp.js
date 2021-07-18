import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
    Paper,
    Button,
    TextField,
    Typography,
} from "@material-ui/core";
import {Col, Container, Form, Row} from "react-bootstrap";
import DynamicDropdown from "./Forms/DynamicDropdown";
import ConfigService from "../services/ConfigService";
import LocationAutoComplete from "./Forms/Location/LocationAutoComplete";
import {useSelector} from "react-redux";
import {useHistory} from 'react-router-dom'

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
const PatientSignUp = (props) => {
    const history = useHistory()
    const userData = useSelector((state) => state.user);

    useEffect(() => {
        if (userData?.user?.username) {
            history.push("/find-doctor");
        }
    }, [userData, history]);


    const classes = useStyles();

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [address, setAddress] = useState({
        lat: null,
        lng: null,
    });
    const [healthInsurance, setHealthInsurance] = useState("");
    const [birthDate, setBirthDate] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [registerError, setRegisterError] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [genders, setGenders] = React.useState([])

    const [insurances, setInsurances ] = useState([]);

    const onRegister = (e) => {
        e.preventDefault();
        props.onRegister(username, password, firstName, lastName, birthDate, healthInsurance, address, gender);
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

    const onChangeHealthInsurance = (e) => {
        // console.log("healthinsurancechangehandler: ", event.target.value);
        setRegisterError("");
        setHealthInsurance(e.target.value);

    };
    const onChangeGender = (e) => {
        setRegisterError("");
        setGender(e.target.value);
    };

    const onChangeBirthDate = (e) => {
        setBirthDate(e.target.value);
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

    useEffect(  () => {
        const getConfig = async () => {
            const config = await ConfigService.getConfig()
            console.log(config)
            setInsurances(config.insurances.map((item) => {return {"displayname": item.valueOf()}}))
            console.log("HealthinsuranceList inside:2 ", insurances)
            setGenders(config.genders.map((item) => {return {"displayname": item.valueOf()}}))
        }
        getConfig()
        console.log("Healthinsurancelist middle: ", insurances)
    }, [])

    return (
        <div className={classes.usersignUpRoot}>
            <Container>
                <Paper className={classes.signUpPaper} component="form">
                <Form>
                    <center><h4>Welcome to medizintermin!</h4></center>
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
                            <Form.Label> Address </Form.Label>
                            <LocationAutoComplete
                                onSelect={onSelectAddress}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DynamicDropdown
                                key={insurances.id}
                                defaultValue=""
                                label="Health Insurance"
                                items={insurances}
                                onChange={onChangeHealthInsurance}
                            ></DynamicDropdown>
                        </Col>
                        <Col>
                            <Form.Label> Date of Birth </Form.Label>
                            <div className={classes.signUpRow}>
                                <TextField
                                    label="Date of Birth"
                                    fullWidth
                                    value={birthDate}
                                    onChange={onChangeBirthDate}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                        <DynamicDropdown
                            key={genders.id}
                            defaultValue=""
                            label="Gender"
                            items={genders}
                            onChange={onChangeGender}
                        ></DynamicDropdown>


                    </Col>
                    </Row>
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
                                healthInsurance === "" ||
                                    gender === "" ||
                                //address === "" ||

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
export default PatientSignUp;

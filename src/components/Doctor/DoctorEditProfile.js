import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
    Paper,
    Button,
    TextField,
    Typography,
    Avatar,
} from "@material-ui/core";
import FormHelperText from '@material-ui/core/FormHelperText';
import {Col, Container, Form, Row} from "react-bootstrap";
import DynamicDropdown from "../Forms/DynamicDropdown";
import ConfigService from "../../services/ConfigService";
import LocationAutoComplete from "../Forms/Location/LocationAutoComplete";
import {useSelector} from "react-redux";
import {useHistory} from 'react-router-dom'
import DoctorService from "../../services/DoctorService";

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
    avatar: {
        float: "right",
        marginRight: theme.spacing(2),
        width: theme.spacing(20),
        height: theme.spacing(20)
    },
}));

/**
 * For register new users
 * @param {props} props
 */
const DoctorEditProfile = (props) => {
    let doctorId = DoctorService.getCurrentUser().id;

    const history = useHistory()
    const userData = useSelector((state) => state.user);

    const [doctor, setDoctor] = useState({});
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [username, setUserName] = React.useState("");
    const [address, setAddress] = useState({
        lat: null,
        lng: null,
    });
    const [pictureUrl, setPictureUrl] = React.useState("");

    const [genders, setGenders] = React.useState([]);
    const [insurances, setInsurances] = useState([]);

    const [registerError, setRegisterError] = React.useState("");

    const classes = useStyles();

    useEffect(async () => {
        const getDoctor = async () => {
            const doctor1 = await DoctorService.getDoctor(doctorId);
            setDoctor(doctor1);
            setFirstName(doctor1.firstname);
            setLastName(doctor1.lastname);
            setUserName(doctor1.username);
            setPictureUrl(doctor1.thumbnail);
            setAddress(doctor1.address);

        };
        await getDoctor();

        const getConfig = async () => {
            const config = await ConfigService.getConfig()
            setInsurances(config.insurances.map((item) => {
                return {"displayname": item.valueOf()}
            }))
            //console.log("HealthinsuranceList inside:2 ", insurances)
            setGenders(config.genders.map((item) => {
                return {"displayname": item.valueOf()}
            }))
        }
        await getConfig();
    }, [userData]);


    const onSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(userData.user.id, firstName, lastName, username, pictureUrl, gender, healthInsurance, address);
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
        setUserName(e.target.value);
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
        setRegisterError("");
        setHealthInsurance(e.target.value);

    };
    const onChangeGender = (e) => {
        setRegisterError("");
        setGender(e.target.value);
    };

    const onChangePictureUrl = (e) => {
        setPictureUrl(e.target.value);
        setRegisterError("");
    };

    return (
        <div>
            <Container>
                <Paper className={classes.signUpPaper} component="form">
                    <Form>
                        <Row>
                            <Col sm={9}>
                                <h2>{doctor?.firstname + " " + doctor?.lastname}</h2>
                                <p>{"Date of Birth: " + birthDate.substr(0,10)}</p>
                                <p>You can edit your profile details below</p>

                            </Col>
                            <Col sm={3}>
                            <Avatar src={doctor?.thumbnail} className={classes.avatar}>
                            </Avatar>
                            </Col>
                            <br/>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label> First Name </Form.Label>
                                <div className={classes.signUpRow}>
                                    <TextField
                                        placeholder={doctor?.firstname}
                                        fullWidth
                                        onChange={onChangeFirstName}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <Form.Label> Last Name </Form.Label>
                                <div className={classes.signUpRow}>
                                    <TextField
                                        placeholder={doctor?.lastname}
                                        fullWidth
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
                                        placeholder={doctor?.username}
                                        fullWidth
                                        //value={patient.username}
                                        onChange={onChangeUsername}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <Form.Label> Profile Picture </Form.Label>
                                <div className={classes.signUpRow}>
                                    <TextField
                                        placeholder={doctor?.thumbnail}
                                        fullWidth

                                        onChange={onChangePictureUrl}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3}>

                            </Col>
                            <Col sm={3}>

                            </Col>
                            <Col sm={6}>
                                <Form.Label> Address </Form.Label>
                                <LocationAutoComplete
                                    //value={patient.address.address_value}
                                    onSelect={onSelectAddress}
                                />
                                <FormHelperText>{"Currently: " + doctor?.address?.address_value}</FormHelperText>
                            </Col>
                        </Row>

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
                                onClick={onSubmit}
                                disabled={firstName ==""}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </Form>
                </Paper>
            </Container>

        </div>
    );
}
export default DoctorEditProfile;

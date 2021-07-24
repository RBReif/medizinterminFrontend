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
    const [phone, setPhone] = React.useState("");
    const [address, setAddress] = useState({
        lat: null,
        lng: null,
    });
    const [pictureUrl, setPictureUrl] = React.useState("");
    const [expertise, setExpertise] = useState("");
    const [languageList, setLanguageList] = useState([]);
    const [facilityList, setFacilityList] = useState([]);

    const [expertises, setExpertises] = React.useState([]);
    const [languages, setLanguages] = useState([]);
    const [facilities, setFacilities] = useState([]);

    const [registerError, setRegisterError] = React.useState("");

    const classes = useStyles();

    useEffect(async () => {
        const getDoctor = async () => {
            const doctor1 = await DoctorService.getDoctor(doctorId);
            setDoctor(doctor1);
            setFirstName(doctor1.firstname);
            setLastName(doctor1.lastname);
            setUserName(doctor1.username);
            setPhone(doctor1.phone);
            setPictureUrl(doctor1.thumbnail);
            setExpertise(doctor1.area_of_expertise);
            setLanguageList(doctor1.languages);
            setAddress(doctor1.address);
            setFacilityList(doctor1.special_facilities);
        };
        await getDoctor();

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
        await getConfig();
        initializeToggle(facilities);
    }, [userData]);


    const onSubmit = (e) => {
        e.preventDefault();
        //let docFacilities = facilities.filter(x => x.isActive).map(x => x.displayname)
        props.onSubmit(userData.user.id, firstName, lastName, username, phone, pictureUrl, expertise, languageList, address, facilityList);
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

    const onChangePhoneNumber = (e) => {
        setPhone(e.target.value);
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
    const onChangeLanguages = (value) => {
        setLanguageList(value);
    };

    const onChangePictureUrl = (e) => {
        setPictureUrl(e.target.value);
        setRegisterError("");
    };

    const onChangeToggle = (displayname) => {
        let facIndex = doctor.special_facilities.indexOf(displayname)
        facIndex == -1 ? facilityList.push(displayname) : facilityList.splice(facIndex,1);
        return facilityList;
    };

    const checkToggle = (displayname) => {
        let facIndex = doctor.special_facilities.indexOf(displayname)
        return facIndex != -1 ? true : false;
    };

    const initializeToggle = () => {

    };

    return (
        <div>
            <Container>
                <Paper className={classes.signUpPaper} component="form">
                    <Form>
                        <Row>
                            <Col sm={9}>
                                <h2>{doctor?.firstname + " " + doctor?.lastname}</h2>
                                <p>{"Current Rating: tbc. "}</p>
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
                                        onChange={onChangeUsername}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <Form.Label> Phone </Form.Label>
                                <div className={classes.signUpRow}>
                                    <TextField
                                        placeholder={doctor?.phone_number}
                                        fullWidth
                                        onChange={onChangePhoneNumber}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
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
                                <DynamicDropdown
                                    key={expertises.id}
                                    defaultValue={doctor?.area_of_expertise}
                                    label="Area of Expertise"
                                    items={expertises}
                                    onChange={onChangeExpertise}
                                ></DynamicDropdown>
                                <FormHelperText>{"Currently: " + doctor?.area_of_expertise}</FormHelperText>
                            </Col>
                            <Col sm={3}>
                                <MultiSelectDropdown
                                    label="Languages"
                                    items={languages}
                                    onChange={onChangeLanguages}
                                ></MultiSelectDropdown>
                                <FormHelperText>{"Currently: " + doctor?.languages}</FormHelperText>
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
                                                checked={checkToggle(toggle.displayname)}
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
                                                checked={checkToggle(toggle.displayname)}
                                                displayname={toggle.displayname}
                                                onChange={onChangeToggle}
                                            ></DynamicSwitch>
                                        );
                                    })}
                                </div>
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
                                disabled={firstName == "" || lastName == "" || username == "" || expertise == "" || languages == []}
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

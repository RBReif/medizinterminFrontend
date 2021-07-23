import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Paper, Button, TextField, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    userLoginRoot: {
        margin: "auto",
    },
    loginPaper: {
        width: "400px",
        padding: theme.spacing(2),
    },
    loginRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        "&:last-child": {
            paddingBottom: theme.spacing(1),
        },
        "&:first-child": {
            paddingTop: theme.spacing(0),
        },
    },
    loginButtons: {
        display: "flex",
        justifyContent: "space-between",
    },
    loginButton: {
        marginLeft: theme.spacing(1),
    },
}));


/**
 * For user login
 * @param {props} props
 */
function LoginComponent(props) {
    const classes = useStyles();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [loginError, setLoginError] = React.useState("");

    let loginUrl = window.location.href === 'http://localhost:3000/login-professionals' ? 'Doctor' : 'Patient';

    useEffect(() => {
        if (props.userData?.error) {
            setLoginError(props.userData?.error);
        } else {
            setLoginError("");
        }
    }, [props.user]);

    const onLogin = (e) => {
        e.preventDefault();
        props.onLogin(username, password);
    };

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
        setLoginError("");
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setLoginError("");
    };

    return (
        <div className={classes.userLoginRoot}>
            <Paper className={classes.loginPaper} component="form">
                <br/>
                <center><h4>Welcome to medizintermin!</h4></center>
                <center>
                    <h7>Pleas login as a <b>{loginUrl}</b></h7>
                </center>
                <br/>
                <div className={classes.loginRow}>
                    <TextField
                        label="Name"
                        fullWidth
                        value={username}
                        onChange={onChangeUsername}
                        error={loginError !== ""}
                    />
                </div>
                <div className={classes.loginRow}>
                    <TextField
                        label="Password"
                        fullWidth
                        value={password}
                        onChange={onChangePassword}
                        error={loginError !== ""}
                        type="password"
                    />
                </div>
                {loginError !== "" ? (
                    <div className={classes.loginRow}>
                        <Typography color="error">{loginError}</Typography>
                    </div>
                ) : null}
                <div className={classes.loginRow + " " + classes.loginButtons}>
                    <Button onClick={props.onSignUp}>
                        Not Registered yet?
                    </Button>
                    <div>
                        <Button
                            className={classes.loginButton}
                            onClick={props.onCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={classes.loginButton}
                            variant="contained"
                            color="primary"
                            onClick={onLogin}
                            disabled={username === "" || password === ""}
                            type="submit"
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

export default LoginComponent;

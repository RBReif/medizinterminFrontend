import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, {useEffect, useState} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {Provider, useDispatch, useSelector} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reducers from "./redux/reducers";
import thunkMiddleware from "redux-thunk";
import {setUser} from "./redux/actions";
import {setDoctor} from "./redux/actions";

import 'bootstrap/dist/css/bootstrap.min.css'
import FindADoctorView from "./views/FindADoctorView";
import LoginPatientsView from "./views/LoginPatientsView";
import RegisterPatientsView from "./views/RegisterPatientsView";
import LogInProfessionalsView from "./views/LogInProfessionalsView";
import RegisterProfessionalsView from "./views/RegisterProfessionalsView";
import TermsView from "./views/Terms";
import ImpressumView from "./views/Impressum";
import PatientDashboard from "./views/PatientDashboard";
import EmergencyView from "./views/Emergency";
import Landing from "./views/Landing";
import DoctorDashboard from "./views/DoctorDashboard";
import DoctorDailyPlanView from "./views/DoctorDailyPlanView"
//import PatientEditProfile from "./components/Patient/PatientEditProfile";
import EditProfilePatientsView from "./views/EditProfilePatientsView";


const DoctorAuthenticatedRoute = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(undefined)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setDoctor())
    }, [])

    const userData = useSelector(state => state.user)
    useEffect(() => {
        if (!!userData) {
            setIsLoggedIn(!!userData?.user?.username)
        }

    }, [userData])

    if (isLoggedIn !== undefined && !isLoggedIn) {
        return <Redirect to={"/"}/>
    }

    if (userData?.user?.role === 'PATIENT') {
        return <Redirect to={"/find-doctor"}/>
    }

    return <Route {...props}/>
}
const PatientAuthenticatedRoute = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(undefined)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUser())
    }, [])

    const userData = useSelector(state => state.user)
    useEffect(() => {
        if (!!userData) {
            setIsLoggedIn(!!userData?.user?.username)
        }

    }, [userData])

    if (isLoggedIn !== undefined && !isLoggedIn) {
        return <Redirect to={"/"}/>
    }

    if (userData?.user?.role === 'DOCTOR') {
        return <Redirect to={"/doctor-dashboard"}/>
    }

    return <Route {...props}/>
}

const NotAuthenticatedRoute = (props) => {
    return <Route {...props}/>
}

function App(props) {

    // create store for redux
    const store = createStore(reducers, applyMiddleware(thunkMiddleware));

    return (
        <div>
            <Provider store={store}>
                <div>
                    {/* <NavigationBar/> */}
                    <Switch>
                        <PatientAuthenticatedRoute path="/find-doctor" exact>
                            <FindADoctorView/>
                        </PatientAuthenticatedRoute>
                        <NotAuthenticatedRoute path="/login-professionals">
                            <LogInProfessionalsView/>
                        </NotAuthenticatedRoute>
                        <NotAuthenticatedRoute path="/register-patients">
                            <RegisterPatientsView/>
                        </NotAuthenticatedRoute>
                        <NotAuthenticatedRoute path="/register-professionals">
                            <RegisterProfessionalsView/>
                        </NotAuthenticatedRoute>
                        <NotAuthenticatedRoute path="/login-patients">
                            <LoginPatientsView/>
                        </NotAuthenticatedRoute>
                        <NotAuthenticatedRoute path={"/terms"}>
                            <TermsView/>
                        </NotAuthenticatedRoute>
                        <NotAuthenticatedRoute path={"/impressum"}>
                            <ImpressumView/>
                        </NotAuthenticatedRoute>
                        <NotAuthenticatedRoute path="/emergency">
                            <EmergencyView/>
                        </NotAuthenticatedRoute>
                        <PatientAuthenticatedRoute path="/dashboard">
                            <PatientDashboard/>
                        </PatientAuthenticatedRoute>
                        <PatientAuthenticatedRoute path="/edit-profile">
                            <EditProfilePatientsView/>
                        </PatientAuthenticatedRoute>
                        <DoctorAuthenticatedRoute path="/doctor-dashboard">
                            <DoctorDashboard/>
                        </DoctorAuthenticatedRoute>
                        <DoctorAuthenticatedRoute path="/doctor-daily-plan">
                            <DoctorDailyPlanView/>
                        </DoctorAuthenticatedRoute>
                        <NotAuthenticatedRoute path="/">
                            <Landing/>
                        </NotAuthenticatedRoute>
                    </Switch>
                </div>
            </Provider>
        </div>
    );
}

export default App;

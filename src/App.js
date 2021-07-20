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
import DoctorDashboard from "./views/DoctorDashboard";
import PatientDashboard from "./views/PatientDashboard";
import EmergencyView from "./views/Emergency";
import Landing from "./views/Landing";


const AuthenticatedRoute = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(undefined)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUser())
        console.log('Hello!')
        //dispatch(setDoctor())
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
                        <AuthenticatedRoute path="/find-doctor" exact>
                            <FindADoctorView/>
                        </AuthenticatedRoute>
                        <Route path="/login-professionals">
                            <LogInProfessionalsView/>
                        </Route>
                        <Route path="/register-patients">
                            <RegisterPatientsView/>
                        </Route>
                        <Route path="/register-professionals">
                            <RegisterProfessionalsView/>
                        </Route>
                        <Route path="/login-patients">
                            <LoginPatientsView/>
                        </Route>
                        <Route path={"/terms"}>
                            <TermsView/>
                        </Route>
                        <Route path={"/impressum"}>
                            <ImpressumView/>
                        </Route>
                        <Route path="/emergency">
                            <EmergencyView/>
                        </Route>
                        <AuthenticatedRoute path="/dashboard">
                            <PatientDashboard/>
                        </AuthenticatedRoute>
                        <AuthenticatedRoute path="/doctor-dashboard">
                            <DoctorDashboard/>
                        </AuthenticatedRoute>
                        <Route path="/">
                            <Landing/>
                        </Route>
                    </Switch>
                </div>
            </Provider>

        </div>
    );
}

export default App;

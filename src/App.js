import {Switch, Route} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reducers from "./redux/reducers";
import thunkMiddleware from "redux-thunk";
import 'bootstrap/dist/css/bootstrap.min.css'
import FindADoctorView from "./views/FindADoctorView";
import LoginPatientsView from "./views/LoginPatientsView";
import RegisterPatientsView from "./views/RegisterPatientsView";
import LogInProfessionalsView from "./views/LogInProfessionalsView";
import RegisterProfessionalsView from "./views/RegisterProfessionalsView";
import ResultsView from "./views/ResultsView";
import TermsView from "./views/Terms";
import ImpressumView from "./views/Impressum";
import PatientDashboard from "./views/PatientDashboard";
import EmergencyView from "./views/Emergency";
import Landing from "./views/Landing";

import DoctorDashboard from "./views/DoctorDashboard";



function App(props) {

    // create store for redux
    const store = createStore(reducers, applyMiddleware(thunkMiddleware));

    return (
        <div>
            <Provider store={store}>
                <div>
                    {/* <NavigationBar/> */}
                    <Switch>
                        < Route path="/find-doctor" exact>
                            <FindADoctorView/>
                        </Route>
                        <Route path="/medics">
                            <LogInProfessionalsView/>
                        </Route>
                        <Route path="/registerPatients">
                            <RegisterPatientsView/>
                        </Route>
                        <Route path="/registerProfessional">
                            <RegisterProfessionalsView/>
                        </Route>
                        <Route path="/loginPatients">
                            <LoginPatientsView/>
                        </Route>
                        <Route path="/results">
                            <ResultsView/>
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
                        <Route path="/dashboard">
                            <PatientDashboard/>
                        </Route>
                        <Route path="/doctordashboard">
                            <DoctorDashboard/>
                        </Route>
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

import {Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import FindADoctorView from "./views/FindADoctorView";
import LogInView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import LogInProfessionalsView from "./views/LogInProfessionalsView";
import RegisterProfessionalsView from "./views/RegisterProfessionalsView";
import ResultsView from "./views/ResultsView";
import PatientDashboard from "./views/PatientDashboard";
import DoctorDashboard from "./views/DoctorDashboard";


function App(props) {
    return (
        <div>
            <div>
                {/* <NavigationBar/> */}
                <Switch>
                    < Route path="/" exact>
                        <FindADoctorView/>
                    </Route>
                    <Route path="/medics">
                        <LogInProfessionalsView/>
                    </Route>
                    <Route path="/registerProfessional">
                        <RegisterProfessionalsView/>
                    </Route>
                    <Route path="/login">
                        <LogInView/>
                    </Route>
                    <Route path="/results">
                        <ResultsView/>
                    </Route>
                    <Route path="/register">
                        <RegisterView/>
                    </Route>
                    <Route path="/emergency">
                       <h1> In case of an emergency call 112! </h1>
                        Further information can be found <a href=" https://www.malteser.de/aware/hilfreich/notrufnummern-in-deutschland-das-musst-du-wissen.html" target="_blank">here</a>.
                    </Route>
                    <Route path="/dashboard">
                        <PatientDashboard/>
                    </Route>
                    <Route path="/doctordashboard">
                        <DoctorDashboard/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;

import {Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import FindADoctorView from "./views/FindADoctorView";
import LogInView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import LogInProfessionalsView from "./views/LogInProfessionalsView";
import RegisterProfessionalsView from "./views/RegisterProfessionalsView";
import ResultsView from "./views/ResultsView";
import Footer from "./components/Footer/Footer";
import TermsView from "./views/Terms";
import ImpressumView from "./views/Impressum";
import PatientDashboard from "./views/PatientDashboard";
import EmergencyView from "./views/Emergency";
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
                </Switch>
            </div>
        </div>
    );
}

export default App;

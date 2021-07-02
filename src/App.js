import {Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/Navigation/NavigationBar";
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


function App(props) {
    return (
        <div>
            <div>
                <NavigationBar/>
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
                       <h1> In case of an emergency call 112! </h1>
                        Further information can be found <a href=" https://www.malteser.de/aware/hilfreich/notrufnummern-in-deutschland-das-musst-du-wissen.html" target="_blank">here</a>.
                    </Route>
                    <Route path="/dashboard">
                        <PatientDashboard/>
                    </Route>
                </Switch>
                <Footer/>
            </div>
        </div>
    );
}

export default App;

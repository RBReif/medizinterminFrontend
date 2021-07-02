import {Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/Navigation/NavigationBar";
import FindADoctorView from "./views/FindADoctorView";
import LogInView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import LogInProfessionalsView from "./views/LogInProfessionalsView";
import RegisterProfessionalsView from "./views/RegisterProfessionalsView";

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
                    <Route path="/register">
                        <RegisterView/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;

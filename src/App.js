import TestButton from "./components/components-chris/TestButton";
import {Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/components-chris/navigation/NavigationBar";
import FindADoctorView from "./views/views-chris/FindADoctorView";
import LogInView from "./views/views-chris/LoginView";
import RegisterView from "./views/views-roland/RegisterView";
import LogInProfessionalsView from "./views/views-roland/LogInProfessionalsView";
import RegisterProfessionalsView from "./views/views-roland/RegisterProfessionalsView";

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

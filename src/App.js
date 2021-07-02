import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/Navigation/NavigationBar";
import FindADoctorView from "./views/FindADoctorView";
import LogInView from "./views/LoginView";

function App(props) {
  return (
    <div>
        <div>
          <NavigationBar/>
          <Switch>
          < Route path = "/" exact>
            <FindADoctorView/> 
          </Route>
          <Route path = "/medics">
          </Route>
          <Route path = "/login">
            <LogInView/>
          </Route>
        </Switch>
        </div>
    </div>
  );
}

export default App;

import TestButton from "./components/components-chris/TestButton";
import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/components-chris/navigation/NavigationBar";
import FindADoctorView from "./views/views-chris/FindADoctorView";
import LogInView from "./views/views-chris/LoginView";

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
          <TestButton name="Test"></TestButton>
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

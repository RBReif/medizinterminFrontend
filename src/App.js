import SEBAList from "./components/SEBAList";
import ListManagement from "./views/ListManagement";
import TestButton from "./components/components-chris/TestButton";
import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NaviBar from "./components/components-chris/navigation/NaviBar";
import FindADoctor from "./views/views-chris/FindADoctor";

function App(props) {
  return (
    <div>
        <div>
          <NaviBar/>
          <Switch>
          < Route path = "/" exact>
            <FindADoctor/>
            <SEBAList/> 
          </Route>
          <Route path = "/medics">
          <TestButton></TestButton>
          </Route>
        </Switch>
        </div>
    </div>
  );
}

export default App;

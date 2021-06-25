import SEBAList from "./components/SEBAList";
import ListManagement from "./views/ListManagement";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>medizintermin</h1>
        <Switch>
          < Route path = "/" exact>
            <SEBAList/> 
          </Route>
          <Route path = "/list-management">
            <ListManagement />
          </Route>
        </Switch>
    </div>
  );
}

export default App;

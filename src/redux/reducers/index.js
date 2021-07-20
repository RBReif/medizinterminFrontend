import { combineReducers } from "redux";
import user from "./userReducer";
import entities from "./entitiesReducer";
import selectedPatient from "./selectedPatientReducer";
export default combineReducers({
    user,
    entities,
    selectedPatient
});

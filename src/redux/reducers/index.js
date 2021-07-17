import { combineReducers } from "redux";
import user from "./userReducer";
import doctor from "./doctorReducer";
import entities from "./entitiesReducer";
export default combineReducers({
    user,
    doctor,
    entities,
});

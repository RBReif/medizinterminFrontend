import DoctorService from "../../services/DoctorService";
import AppointmentService from "../../services/AppointmentService";

export function login(name, password) {
    function onSuccess(user) {
        return {type: "LOGIN_SUCCESS", user};
    }

    function onFailure(error) {
        return {type: "LOGIN_FAILURE", error};
    }

    return async (dispatch) => {
        try {
            const resp = await DoctorService.login(name, password);
            dispatch(onSuccess(resp));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}

export function setDoctor() {
    return async (dispatch) => {
        const user = await DoctorService.getCurrentUser()
        console.log(user)
        dispatch({type: "SET_USER", user})
    }
}

export function logout() {
    DoctorService.logout();
    return {type: "LOGOUT"};
}

export function loginReset() {
    return {type: "LOGIN_RESET"};
}

export function register(username, password, firstName, lastName, birthDate, expertise, languageList, address, facilities, pictureUrl) {
    function onSuccess(user) {
        return {type: "LOGIN_SUCCESS", user: user};
    }

    function onFailure(error) {
        return {type: "LOGIN_FAILURE", error: error};
    }

    return async (dispatch) => {
        try {
            const user = await DoctorService.register(username, password, firstName, lastName, birthDate, expertise, languageList, address, facilities, pictureUrl);
            dispatch(onSuccess(user));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}
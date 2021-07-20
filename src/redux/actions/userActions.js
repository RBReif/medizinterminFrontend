import UserService from "../../services/UserService";

export function login(name, password) {
    function onSuccess(user) {
        return { type: "LOGIN_SUCCESS", user };
    }
    function onFailure(error) {
        return { type: "LOGIN_FAILURE", error };
    }

    return async (dispatch) => {
        try {
            const resp = await UserService.login(name, password);
            dispatch(onSuccess(resp));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}



export function setUser() {
    return async (dispatch) => {
        const user = await UserService.getCurrentUser()
        console.log(user)
        dispatch({type: "SET_USER", user})
    }
}

export function logout() {
    UserService.logout();
    return { type: "LOGOUT" };
}

export function loginReset() {
    return { type: "LOGIN_RESET" };
}

export function register(username, password, firstName, lastName, birthDate, healthInsurance, address, gender) {
    function onSuccess(user) {
        return { type: "LOGIN_SUCCESS", user: user };
    }
    function onFailure(error) {
        return { type: "LOGIN_FAILURE", error: error };
    }

    return async (dispatch) => {
        try {
            const user = await UserService.register(username, password, firstName, lastName, birthDate, healthInsurance, address, gender);
            dispatch(onSuccess(user));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}

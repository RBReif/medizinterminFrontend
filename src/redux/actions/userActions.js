import UserService from "../../services/UserService";

export function update(id, firstName, lastName, username, pictureUrl, gender, healthInsurance, address) {
    function onSuccess(user) {
        return {type: "EDIT_SUCCESS", user: user};
    }

    function onFailure(error) {
        return {type: "EDIT_FAILURE", error: error};
    }

    return async (dispatch) => {
        try {
            const user = await UserService.update(id, firstName, lastName, username, pictureUrl, gender, healthInsurance, address);
            dispatch(onSuccess(user));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}

export function login(name, password) {
    function onSuccess(user) {
        return {type: "LOGIN_SUCCESS", user};
    }

    function onFailure(error) {
        return {type: "LOGIN_FAILURE", error};
    }

    function onUserNotFound(error) {
        return {type: "LOGIN_USER_NOT_FOUND", error};
    }

    return async (dispatch) => {
        try {
            const resp = await UserService.login(name, password);
            dispatch(onSuccess(resp));
        } catch (e) {
            if (e == 401) {
                dispatch(onFailure(e))
            } else {
                dispatch(onUserNotFound(e))
            }
        }
    };
}

/*
export function setUser() {
    return async (dispatch) => {
        const user = await UserService.getCurrentUser()
        dispatch({type: "SET_USER", user})
    }
}
*/

export function logout() {
    UserService.logout();
    return {type: "LOGOUT"};
}

export function loginReset() {
    return {type: "LOGIN_RESET"};
}

export function register(username, password, firstName, lastName, birthDate, healthInsurance, address, gender, pictureUrl) {
    function onSuccess(user) {
        return {type: "LOGIN_SUCCESS", user: user};
    }

    function onFailure(error) {
        return {type: "LOGIN_FAILURE", error: error};
    }

    return async (dispatch) => {
        try {
            const user = await UserService.register(username, password, firstName, lastName, birthDate, healthInsurance, address, gender, pictureUrl);
            dispatch(onSuccess(user));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}

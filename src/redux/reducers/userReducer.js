const getUser = () => {
    if (window.localStorage["jwtToken"]) {
        const token = window.localStorage["jwtToken"];
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        const userJson = JSON.parse(window.atob(base64));
        // if token is expired delete it and return {}
        // --> User is not logged in anymore.
        if (userJson.exp > Date.now()) {
            window.localStorage.removeItem("jwtToken");
            return {};
        }
        return {
            user: {
                _id: userJson._id,
                username: userJson.username,
                token
            },
        };
    }
    return {};
};

// For results carrying over
// dispatch("SET_RESULTS", {results: {areas, languages, results, ....}})

export default function user(state = getUser(), action) {
    switch (action.type) {
        case "SET_USER":
            return { user: action.user }
        case "LOGIN_SUCCESS":
            return { user: action.user };
        case "LOGIN_FAILURE":
            return { error: "Password or username incorrect." };
        case "LOGIN_RESET":
            return {};
        case "SET_RESULTS":
            return {results: action.results}
        case "LOGOUT":
            return {};
        default:
            return state;
    }
}

export default function entities(state = {}, action) {
    switch (action.type) {
        case "GETPATIENTS_SUCCESS":
            return { movies: action.patients };
        case "DELETEPATIENTS_SUCCESS":
            return { movies: action.patients };
        case "ADDPATIENT_SUCCESS":
            return { ...state };
        default:
            return state;
    }
}

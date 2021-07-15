export default function selectedPatient(state = {}, action) {
    switch (action.type) {
        case "GETPATIENT_SUCCESS":
            return { patient: action.patient };
        case "GETPATIENT_ERROR":
            return { error: action.error };
        case "CHANGE_SELECTED_PATIENT":
            return {
                patient: {
                    ...state.patient,
                    ...action.updates,
                },
            };
        default:
            return { patient: action.patient};
    }
}

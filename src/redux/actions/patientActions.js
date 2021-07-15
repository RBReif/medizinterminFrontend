import PatientService from "../../services/PatientService";

export function getPatients() {
    // when the backend call was successful and the patients are retrieved
    // in the dispatcher the patients will be added to the global state
    function onSuccess(patients) {
        return { type: "GETPATIENTS_SUCCESS", patients: patients };
    }
    // when the backend call was failed
    function onFailure(error) {
        // error handling
        console.log("failed to get the patients", error);
    }

    return async (dispatch) => {
        try {
            // ask for the movies in the backend
            let patients = await PatientService.getPatients();
            // call onSuccess in context of redux
            dispatch(onSuccess(patients));
        } catch (e) {
            onFailure(e);
        }
    };
}

export const getPatient = (id) => {
    function onSuccess(patient) {
        return { type: "GETPATIENT_SUCCESS", patient: patient };
    }
    function onFailure(error) {
        console.log("failed to load the patient", error);
    }

    return async (dispatch, getState) => {
        try {
            let patient = await PatientService.getPatient(id);
            dispatch(onSuccess(patient));
        } catch (e) {
            onFailure(e);
        }
    };
};

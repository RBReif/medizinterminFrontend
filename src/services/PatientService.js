import HttpService from "./HttpService";

export default class PatientService {
    static baseURL() {
        return "http://localhost:4000/patient";
    }


    static getPatient(id) {
        return new Promise(async (resolve, reject) => {
           await HttpService.get(
                `${PatientService.baseURL()}/${id}`,
                function (data) {
                    if (data !== undefined || Object.keys(data).length !== 0) {resolve(data);} else {reject("Error while retrieving patient");}},
                function (textStatus) {
                    reject(textStatus);
                }
            );
        }).then();
    }


}

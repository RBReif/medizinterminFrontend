import HttpService from "./HttpService";

export default class DoctorService {
    static baseURL() {
        return "http://localhost:4000/doctor";
    }


    static getDoctor(id) {
        return new Promise(async (resolve, reject) => {
            await HttpService.get(
                `${DoctorService.baseURL()}/${id}`,
                function (data) {if (data !== undefined || Object.keys(data).length !== 0) {resolve(data);} else {reject("Error while retrieving doctor");}},
                function (textStatus) {
                    reject(textStatus);
                }
            );
        }).then();
    }


}

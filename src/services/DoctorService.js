import HttpService from "./HttpService";

export default class DoctorService {
    static baseURL() {
        return "http://localhost:4000/doctor";
    }

    static register(username, password, firstName, lastName, phone, expertise, languageList, address, facilities, thumbnail) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${DoctorService.baseURL()}/register`, {
                username: username,
                password: password,
                firstname: firstName,
                lastname: lastName,
                phone_number: phone,
                area_of_expertise: expertise,
                languages: languageList,
                address: address,
                special_facilities: facilities,
                thumbnail: thumbnail,
            }, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static login(user, pass) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${DoctorService.baseURL()}/login`, {
                username: user,
                password: pass
            }, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static logout() {
        window.localStorage.removeItem('jwtToken');
    }

    static getCurrentUser() {
        let token = window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');

        return {
            id: JSON.parse(window.atob(base64))._id,
            username: JSON.parse(window.atob(base64)).username,
            role: JSON.parse(window.atob(base64)).role,
            thumbnail: JSON.parse(window.atob(base64)).thumbnail,
            token
        };
    }

    static isAuthenticated() {
        return !!window.localStorage['jwtToken'];
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

    static getRating(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${DoctorService.baseURL()}/rate/${id}`,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }


    static rateDoctor(id, rating) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${DoctorService.baseURL()}/rate/${id}`,
                { rating: rating },
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static update(id, firstName, lastName, username, phone, pictureUrl, expertise, languages, address, facilities) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${DoctorService.baseURL()}/${id}`, {
                firstname: firstName,
                lastname: lastName,
                username: username,
                phone: phone,
                thumbnail: pictureUrl,
                area_of_expertise: expertise,
                languages: languages,
                address: address,
                special_facilities: facilities,
            }, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
}

"use strict";

import HttpService from './HttpService';

export default class UserService {

    constructor() {
    }

    static baseURL() {
        return 'http://localhost:4000/patient';
    }

    static register(username, password, firstName, lastName, dateBirth, insurance) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/register`, {
                username: username,
                password: password,
                firstname: firstName,
                lastname: lastName,
                date_of_birth: dateBirth,
                insurance: insurance

            }, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static login(user, pass) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/login`, {
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
            username: JSON.parse(window.atob(base64)).username
        };
    }

/*    // this does not work
    static getUser(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${UserService.baseURL()}/`+id.id,
                function (data) {
                    if (data !== undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    } else {
                        reject("Error while retrieving movie");
                    }
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }*/

    static isAuthenticated() {
        return !!window.localStorage['jwtToken'];
    }
}
"use strict";

import HttpService from './HttpService'

export default class AppointmentService{
    constructor() {
    }

    static baseURL() {return 'http://localhost:4000/appointment';}

    static getAppointments(id, usecase){
        return new Promise( async(resolve, reject) => {
            await  HttpService.get(
                `${this.baseURL()}/${id}`,
                function (data){resolve(data)},
                function (textStatus){
                    reject(textStatus);

                },
                {
                    usecase: usecase,
                }
            )
        }).then()
    }

    static filterAppointments(area, languages, facilities, startpoint, endpoint){
        return new Promise( async(resolve, reject) => {
            await  HttpService.get(
                this.baseURL(),
                function (data){resolve(data)},
                function (textStatus){
                    reject(textStatus);

                },
                {
                    profession: area,
                    languages: languages,
                    facilities: facilities,
                    startpoint: startpoint,
                    endpoint: endpoint,
                }
            )
        }).then()
    }

    static deleteAppointment(id){
        return new Promise( async(resolve, reject) => {
            await  HttpService.remove(
                `${this.baseURL()}/${id}`,
                function (data){resolve(data)},
                function (textStatus){
                    reject(textStatus);

                }

            )
        }).then()
    }

}

"use strict";

import HttpService from './HttpService'

export default class ConfigService{
    constructor() {
    }

    static baseURL() {return 'http://localhost:4000/config';}

    static getConfig(){
        return new Promise( async(resolve, reject) => {
          await  HttpService.get(
                this.baseURL(),
                function (data){return resolve(data); console.log("Received data: ", data, " -- ", resolve(data))},
                function (textStatus){
                    reject(textStatus);

                }
            )
        })
    }

}


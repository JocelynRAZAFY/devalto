// var getToken = function () {
//     return localStorage.getItem('userToken')
// }

import axios from "axios";
import { getToken } from './auth'

export default {
    postData(url,formData){
        let config;
        let token = getToken()

        if(token){
            config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                },
                // onUploadProgress: function(progressEvent) {
                //     let percentage = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                //     store.commit('upload/setPercentage',{uid: formData.get('uid'), percentage: percentage})
                // }
            }

        }else {
            config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        }
        // this.getIntercept()
        return axios.post(url, formData, config)
    },
    post(url,params){
        var config;
        var token = getToken()

        if(token){
            config = {
                headers: {
                    'Content-Type': 'application/ld+json',
                    'Authorization': 'Bearer ' + token
                }
            }

        }else {
            config = {
                headers: {
                    'Content-Type': 'application/ld+json'
                }
            }
        }
       // this.getIntercept()
        return axios.post(url, params, config)
    },
    get(url){
        var token = getToken()
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        //this.getIntercept()
        return axios.get(url, config)
    }
}

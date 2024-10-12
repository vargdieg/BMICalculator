require('dotenv').config();
const url = process.env.APPOINTMENTS_URL;
const ResourceDelete = "/deleteappointment";
const ResourceGetAppointment = "/getappointments";
const ResourceCreateAppointment = "/putappointment";
const ResourceEditAppointment = "/updateappointment";
const MethodDelete = "DELETE";
const MethodGetAppointment = "GET";
const MethodCreateAppointment = "POST";
const MethodEditAppointment = "PATCH";
const Region = "us-east-1";
const ApiKey = process.env.APIKEY;

export function loadUserAppointmets(id){
    return new Promise(function (resolve, reject) {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'x-api-key': ApiKey
        }
        fetch(url+ResourceGetAppointment+"?region="+Region+"&id="+id,{
            method: MethodGetAppointment,
            headers: headers
        }).then(response => {return response.json()}).then((data) => {
            if(data.code === "200"){
                return resolve(data.data);
            }else{
                if(data.error){
                    return reject(data.user_message);
                }else{
                    return reject("Error proccessing the request")        
                }
            }
        }).catch(()=>{
            return reject("Error proccessing the request")
        })
    });
    
}

export function saveUserAppointments(userAppointment,id){
    return new Promise(function (resolve, reject) {
        let body = {
            region: Region,
            id: id,
            data: userAppointment
        };
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-api-key': ApiKey
        }
        fetch(url+ResourceCreateAppointment,{
            method: MethodCreateAppointment,
            body : JSON.stringify(body),
            headers: headers
        }).then(response => {return response.json()}).then((data) => {
            if(data.code === "200"){
                return resolve(data.message);
            }else{
                if(data.error){
                    return reject(data.user_message);
                }else{
                    return reject("Error proccessing the request")        
                }
            }
        }).catch(()=>{
            return reject("Error proccessing the request")
        })
    });
}

export function deleteAppointment(userid,appointmentid){
    return new Promise(function (resolve, reject) {
        let body = {
            region: Region,
            id: userid,
            Appointmentid: appointmentid
        };
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-api-key': ApiKey
        }
        fetch(url+ResourceDelete,{
            method: MethodDelete,
            body : JSON.stringify(body),
            headers: headers
        }).then(response => {return response.json()}).then((data) => {
            if(data.code === "200"){
                return resolve(data.message);
            }else{
                if(data.error){
                    return reject(data.user_message);
                }else{
                    return reject("Error proccessing the request")        
                }
            }
        }).catch(()=>{
            return reject("Error proccessing the request")
        })
    });
}

export function editAppointment(userid,newAppointment){
    return new Promise(function (resolve, reject) {
        let body = {
            region: Region,
            id: userid,
            Appoitnment: newAppointment,
            Appoitnmentid: newAppointment.identifier
        };
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-api-key': ApiKey
        }
        fetch(url+ResourceEditAppointment,{
            method: MethodEditAppointment,
            body : JSON.stringify(body),
            headers: headers
        }).then(response => {return response.json()}).then((data) => {
            if(data.code === "200"){
                return resolve(data.message);
            }else{
                if(data.error){
                    return reject(data.user_message);
                }else{
                    return reject("Error proccessing the request")        
                }
            }
        }).catch(()=>{
            return reject("Error proccessing the request")
        })
    });
}
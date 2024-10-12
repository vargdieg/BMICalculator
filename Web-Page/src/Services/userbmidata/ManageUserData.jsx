const url = process.env.REACT_APP_DATA_URL;
const ResourceSave = "/updatedata";
const ResourceDelete = "/deletebmidata";
const ResourceGetData = "/getbmidata";
const MethodSave = "POST";
const MethodDelete = "DELETE";
const MethodGetData = "GET";
const Region = "us-east-1";
const ApiKey = process.env.REACT_APP_APIKEY;

export function loadUserData(id){
    return new Promise(function (resolve, reject) {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'x-api-key': ApiKey
        }
        fetch(url+ResourceGetData+"?region="+Region+"&id="+id,{
            method: MethodGetData,
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

export function saveData(userNewData,id){
    return new Promise(function (resolve, reject) {
        let body = {
            region: Region,
            customerIdentification: id,
            bmiNewData: userNewData
        };
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-api-key': ApiKey
        }
        fetch(url+ResourceSave,{
            method: MethodSave,
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

export function deleteDataEntry(userid,dataid){
    return new Promise(function (resolve, reject) {
        let body = {
            region: Region,
            customerIdentification: userid,
            bmiDataIdentification: dataid
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
                    return reject("Error encountered at the moment of submitting your opinion")        
                }
            }
        }).catch(()=>{
            return reject("Error encountered at the moment of submitting your opinion")
        })
    });
}
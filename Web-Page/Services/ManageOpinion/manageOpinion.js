const url = "https://92p29q1nud.execute-api.us-east-1.amazonaws.com/product";
const ResourceUpload = "/createopinion";
const ResourceGet = "/getopinion";
const ResourceDelete = "/deleteopinion";
const MethodUpload = "POST";
const MethodGet = "GET";
const MethodDelete = "DELETE";
const Region = "us-east-1";
const ApiKey = "vxwGs0Uay68rYt0w7op5f5zUbMUubiOf1AUKyGyv"

export function uploadOpinion(opinion){
    return new Promise(function (resolve, reject) {
        let body = {
            region: Region,
            customerName: opinion.name,
            customerOpinion: opinion.opinion,
            messageIdentifier: opinion.identifier
        };
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-api-key': ApiKey
        }
        fetch(url+ResourceUpload,{
            method: MethodUpload,
            body : JSON.stringify(body),
            headers: headers
        }).then(response => {return response.json()}).then((data) => {
            if(data.code == "200"){
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

export function getOpinion(MessageId){
    return new Promise(function (resolve, reject) {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'x-api-key': ApiKey
        }
        fetch(url+ResourceGet+"?region="+Region+"&id="+MessageId,{
            method: MethodGet,
            headers: headers
        }).then(response => {return response.json()}).then(data => {
            if(data.code == "200"){
                return resolve(data.message);
            }else{
                if(data.error){
                    return reject(data.user_message);
                }else{
                    return reject("Error encountered at the moment of submitting your opinion")        
                }
            }
        }).catch(()=>{reject("Error Encountered at the momento of getting opinion")})
    });
}

export function DeleteOpinion(MessageId){
    return new Promise(function (resolve, reject) {
        let body = {
            region: Region,
            id: MessageId
        };
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'x-api-key': ApiKey
        }
        fetch(url+ResourceDelete,{
            method: MethodDelete,
            body : JSON.stringify(body),
            headers: headers
        }).then(response => {return response.json()}).then((data) => {
            if(data.code == "200"){
                return resolve(data.message);
            }else{
                if(data.error){
                    return reject(data.user_message);
                }else{
                    return reject("Error encountered at the moment of submitting your opinion")        
                }
            }
        }).catch(()=>{
            reject("Error encountered at the moment of submitting your opinion")
        })
    });
}
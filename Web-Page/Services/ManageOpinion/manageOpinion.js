const url = "";
const ResourceUpload = "/createopinion";
const ResourceGet = "/getopinion";
const MethodUpload = "POST";
const MethodGet = "GET";
const Region = "us-east-1";
const ApiKey = ""

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
            if(data.error){
                reject(data.message);
            }else{
                resolve(data.code);
            }
        }).catch(()=>{
            reject("Error encountered at the moment of submitting your opinion")
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
            if(data.error){
                reject(data.message);
            }else{
                resolve(data.code);
            }
        }).catch(()=>{reject("Error Encountered at the momento of getting opinion")})
    });
}
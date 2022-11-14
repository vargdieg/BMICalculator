const url = "";
const ResourceUpload = "/updatedata";
const ResourceGet = "/userdata";
const MethodUpload = "POST";
const MethodGet = "GET";
const Region = "us-east-1";
const ApiKey = ""

export function loadUserData(id){
    return new Promise(function (resolve, reject) {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'x-api-key': ApiKey
        }
        fetch(url+ResourceGet+"/"+id+"?region="+Region,{
            method: MethodGet,
            headers: headers
        }).then(response => {return response.json()}).then(data => {
            if(data.error){
                reject(data.message);
            }else{
                resolve(data.Item.CUSTOMER_DATA);
            }
        }).catch(()=>{reject("Error Encountered at the moment of getting data")})
    });
}

export function saveData(userNewData,id){
    return new Promise(function (resolve, reject) {
        let body = {
            region: Region,
            id: id,
            data: userNewData
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
                resolve(data.Code);
            }
        }).catch(()=>{
            reject("Error encountered at the moment of submitting your data")
        })
    });
}
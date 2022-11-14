const url = "";
const ResourceSaveUser = "/createuser";
const ResourceDeleteUser = "/deleteuser";
const ResourceGetUserById = "/";
const ResourceGetUserByName = "/user";
const MethodSaveUser = "POST";
const MethodDeleteUser = "DELETE";
const MethodGetUserById = "GET";
const MethodGetUserByName = "GET";
const Region = "us-east-1";
const ApiKey = ""

export function saveUser(userInfo){
    return new Promise(function (resolve, reject) {
        let body = {
            "region": Region,
            "customerName": userInfo.username,
            "customerPassword": userInfo.password,
            "customerEmail": userInfo.email,
            "customerIdentification": userInfo.identifier
        };
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-api-key': ApiKey
        }
        fetch(url+ResourceSaveUser,{
            method: MethodSaveUser,
            body : JSON.stringify(body),
            headers: headers
        }).then(response => {return response.json()}).then((data) => {
            if(data.error){
                reject(data.message);
            }else{
                resolve(data.Code);
            }
        }).catch(()=>{
            reject("Error encountered at the moment of saving the user")
        })
    })
}

export function deleteUser(userid){
    return new Promise(function (resolve, reject) {
        let body = {
            "region": Region,
            "id": userid
        };
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-api-key': ApiKey
        }
        fetch(url+ResourceDeleteUser,{
            method: MethodDeleteUser,
            body : JSON.stringify(body),
            headers: headers
        }).then(response => {return response.json()}).then(data => {
            if(data.error){
                reject(data.message);
            }else{
                resolve(data.Code);
            }
        }).catch(()=>{
            reject("Error encountered at the moment of deleting the user")
        })
    });
}

export function getUserName(userid){
    return new Promise(function (resolve, reject) {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'x-api-key': ApiKey
        }
        fetch(url+ResourceGetUserById+userid+"?region="+Region,{
            method: MethodGetUserById,
            headers: headers
        }).then(response => {return response.json()}).then(data => {
            if(data.error){
                reject(data.message);
            }else{
                let userData = data.Item;
                resolve(userData.CUSTOMER_NAME);
            }
        }).catch(()=>{
            reject("Error encountered at the moment getting the username")
        })
    });
}

export function validateLoggin(username,password){
    return new Promise(function (resolve, reject) {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'x-api-key': ApiKey
        }
        fetch(url+ResourceGetUserByName+"/"+username+"?region="+Region,{
            method: MethodGetUserByName,
            headers: headers
        }).then(response => {return response.json()}).then(data => {
            if(data.error){
                reject(data.message);
            }else{
                let usernameBD = data.Item.CUSTOMER_NAME;
                let passwordBD = data.Item.CUSTOMER_PASSWORD;
                if(usernameBD == username && passwordBD == password){
                    let response = {
                        identifier: data.Item.CUSTOMER_IDENTIFIER
                    }
                    resolve(response);
                }else{
                    reject("Username or password incorrects");
                }
            }
        }).catch(()=>{
            reject("Error encountered when validating loggin")
        })
    });
}
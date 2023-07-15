const url = "";
const ResourceCreate = "/createuser";
const ResourceDelete = "/deleteuser";
const ResourceValidate = "/validateloggin";
const ResourceGetUserInformation = "/getuserinformation";
const MethodCreate = "POST";
const MethodDelete = "DELETE";
const MethodValidate = "POST";
const MethodGetUserInformation = "GET";
const Region = "us-east-1";
const ApiKey = "";

export function saveUser(userInfo){
    return new Promise(function (resolve, reject) {
        let body = {
            region: Region,
            customerName: userInfo.username,
            customerPassword: userInfo.password,
            customerEmail: userInfo.email,
            customerIdentification: userInfo.identifier
        };
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-api-key': ApiKey
        }
        fetch(url+ResourceCreate,{
            method: MethodCreate,
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

export function deleteUser(userid){
    return new Promise(function (resolve, reject) {
        let body = {
            region: Region,
            customerIdentification: userid
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
                console.log(data);
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

export function validateLoggin(username,password){
    return new Promise(function (resolve, reject) {
        let body = {
            customerName: username,
            customerPassword: password,
            region: Region
        };
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-api-key': ApiKey
        }
        fetch(url+ResourceValidate,{
            method: MethodValidate,
            body : JSON.stringify(body),
            headers: headers
        }).then(response => {return response.json()}).then((data) => {
            if(data.code === "200"){
                return resolve(data.data);
            }else{
                if(data.error){
                    return reject(data.user_message);
                }else{
                    return reject("Error al momento de validar el inicio de sesion");
                }
            }
        }).catch(()=>{
            return reject("Error al momento de validar el inicio de sesion");
        })
    });
}


export function getUserName(idUser){
    return new Promise(function (resolve, reject) {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'x-api-key': ApiKey
        }
        fetch(url+ResourceGetUserInformation+"?region="+Region+"&id="+idUser,{
            method: MethodGetUserInformation,
            headers: headers
        }).then(response => {return response.json()}).then((data) => {
            if(data.code === "200"){
                return resolve(data.data);
            }else{
                if(data.error){
                    return reject(data.user_message);
                }else{
                    return reject("Error obteniendo la informacion del usuario")        
                }
            }
        }).catch(()=>{
            return reject("Error obteniendo la informacion del usuario")
        })
    });
}
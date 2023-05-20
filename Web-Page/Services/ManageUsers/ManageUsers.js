//TODO: Lo que se deberia responder es en el caso en el que cargue de manera exitosa pos cargar
//TODO: Cuando no cargue de manera exitosa, hay debemos mostrar un modal diciendo que fue lo que esta malo o porque fallo

export function saveUser(userInfo){
    return new Promise((resolve,reject) => {
        try
        {
        localStorage.setItem('User'+userInfo.identifier, JSON.stringify(userInfo));
        saveId(userInfo.identifier);
        resolve("Save Done Successfully");
        }catch{
            reject("An error ocurred while saving the user")
        }
    });
}

export function deleteUser(userid){
    return new Promise(async (resolve,reject)=>{
        try{
            let index = -1;
            localStorage.removeItem('User'+userid);
            let ids = await loadId();
            for(let i = 0;i<ids.length;i++){
                if(ids[i] == userid){
                    index = i;
                    break;
                }
            }
            if(index != -1){
                ids.splice(index,1);
                localStorage.setItem('UsersIds',JSON.stringify(ids));
                resolve("User deleted");
            }else{
                reject("The id of the user was not found");
            }
        }catch{
            reject("An error ocurred while deleting the user");
        }
    })
}

export function getUserName(userid){
    return new Promise((resolve,reject)=>{
        try{
            let User = localStorage.getItem('User'+userid);
            if(User == null){
                resolve([]);
            }
            resolve(JSON.parse(User));
        }catch{
            reject("An error ocurred while extracting user data")
        }
    })
}

export function validateLoggin(username,password){
    return new Promise(async (resolve,reject) =>{
        try{
            let ids = await loadId();
            for(let i = 0;i<ids.length;i++){
                let user = await getUserName(ids[i]);
                if(user.username == username && user.password == password){
                    resolve(user);
                }
            }
        }catch{
            reject("An error ocurred while validating loggin");
        }
    })
}

function saveId(idToSave){
    loadId().then((Userids)=>{
        Userids.push(idToSave);
        localStorage.setItem('UsersIds',JSON.stringify(Userids));
    }).catch({
    });
}

function loadId(){
    return new Promise((resolve,reject)=>{
        try{
            let Userids = localStorage.getItem('UsersIds');
            if(Userids == null){
                resolve([]);
            }
            resolve(JSON.parse(Userids));
        }catch{
            reject("An error ocurred while loading the ids")
        }
    })
}
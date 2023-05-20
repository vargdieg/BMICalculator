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
    return new Promise((resolve,reject)=>{
        try{
            localStorage.removeItem('User'+userid);
            resolve("User deleted");
        }catch{
            reject("An error ocurred while deleting the user");
        }
    })
}

export function getUserName(userid){
    return new Promise((resolve,reject)=>{
        try{
            let User = localStorage.getItem('User'+userid);
            console.log(User);
            if(User == null){
                resolve([]);
            }
            resolve(JSON.parse(UserName));
        }catch{
            reject("An error ocurred while extracting user data")
        }
    })
}

export function validateLoggin(username,password){
    return new Promise((resolve,reject) =>{
        try{
            let userValidation = false;
            let userData = "";
            console.log(username);
            console.log(password);
            loadId().then((ids)=>{
                console.log(ids);
                for(let i = 0;i<ids.length;i++){
                getUserName(ids[i]).then((userRetrieved)=>{
                if(userRetrieved.username == username && userRetrieved.password == password){
                    userValidation = true;
                    userData = userRetrieved;
                }
                })
                }
            if(userValidation){
                resolve(userData);
            }else{
                reject("Incorrect username or password")
            }
            });
        }catch{
            reject("An error ocurred while validating loggin");
        }
    })
}

function saveId(idToSave){
    let Userids = loadId();
    Userids.push(idToSave);
    localStorage.setItem('UsersIds',JSON.stringify(Userids));
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
//TODO: Lo que se deberia responder es en el caso en el que cargue de manera exitosa pos cargar
//TODO: Cuando no cargue de manera exitosa, hay debemos mostrar un modal diciendo que fue lo que esta malo o porque fallo

export function loadUserData(id){
    return new Promise((resolve,reject)=>{
        try{
            let bmiData = localStorage.getItem('bmiData'+id);
            if(bmiData == null){
                resolve ([]);
            }
            resolve(JSON.parse(bmiData));
        }catch{
            reject("An error ocurred while loading the user data")
        }
    })
}

export function saveData(userNewData,id){
    return new Promise((resolve,reject)=>{
        try{
            localStorage.setItem('bmiData'+id, JSON.stringify(userNewData));
            resolve("Save Done Successfully");
        }catch{
            reject("An error ocurred while saving the data")
        }
    })
}
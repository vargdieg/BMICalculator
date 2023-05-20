//TODO: Lo que se deberia responder es en el caso en el que cargue de manera exitosa pos cargar
//TODO: Cuando no cargue de manera exitosa, hay debemos mostrar un modal diciendo que fue lo que esta malo o porque fallo

export function loadUserAppointmets(id){
    return new Promise((resolve,reject)=>{
        try{
            let appointments = localStorage.getItem('appointment'+id);
            if(appointments == null){
                resolve([]);
            }
            resolve(JSON.parse(appointments));
        }catch{
            reject("An error Ocurred while loading the user appointments")
        }
    })
    
}

export function saveUserAppointments(userAppointments,id){
    return new Promise((resolve,reject)=>{
        try{
            localStorage.setItem('appointment'+id, JSON.stringify(userAppointments));
            resolve("Saved success");
        }catch{
            reject("An error ocurred while saving appointments")
        }
    })
}
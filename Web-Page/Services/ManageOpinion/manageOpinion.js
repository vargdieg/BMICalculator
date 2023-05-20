//TODO: Lo que se deberia responder es en el caso en el que cargue de manera exitosa pos cargar
//TODO: Cuando no cargue de manera exitosa, hay debemos mostrar un modal diciendo que fue lo que esta malo o porque fallo

export function uploadOpinion(opinion){
    return new Promise((resolve,reject)=>{
        localStorage.setItem('opinion'+opinion.identifier, JSON.stringify(opinion));
        resolve("Save Done Successfully");
    })
}

export function getOpinion(MessageId){
    let opinion = localStorage.getItem('opinion'+MessageId);
    if(opinion == null){
        return [];
    }
    return JSON.parse(opinion);
}
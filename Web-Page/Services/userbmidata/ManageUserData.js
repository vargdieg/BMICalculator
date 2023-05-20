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
    return new Promise(async (resolve,reject)=>{
        try{
            let newData = await loadUserData(id);
            newData.push(userNewData);
            localStorage.setItem('bmiData'+id, JSON.stringify(orderData(newData)));
            resolve("Entry saved suscessfully");
        }catch{
            reject("An error ocurred while saving the data")
        }
    })
}

export function deleteDataEntry(userid,dataid){
    return new Promise(async (resolve,reject)=>{
        try{
            let data = await loadUserData(userid);
            const index = data.findIndex((item) => item.id === dataid);
            if(index != -1){
                datos.splice(index, 1);
                localStorage.setItem('bmiData'+id, JSON.stringify(orderData(datos)));
                resolve("Data deleted successfully");
            }
        }catch{
            reject("An error ocurred while trying to delete the entry");
        }
    });
}

function orderData(datos){
    datos.sort(function(a,b){
        const firstDate = moment(a.date, 'DD/MM/YYYY');
        const secondDate = moment(b.date, 'DD/MM/YYYY');
        return firstDate - secondDate;
      });
    return datos;
}
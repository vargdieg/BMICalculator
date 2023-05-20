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

export function saveUserAppointments(userAppointment,id){
    return new Promise(async (resolve,reject)=>{
        try{
            let appointments = await loadUserAppointmets(id);
            appointments.push(userAppointment);
            localStorage.setItem('appointment'+id, JSON.stringify(OrderData(appointments)));
            resolve("Saved success");
        }catch{
            reject("An error ocurred while saving appointments")
        }
    })
}

export function deleteAppointment(userid,appointmentid){
    return new Promise(async (resolve,reject)=>{
        try{
            let appointments = await loadUserAppointmets(userid);
            const index = appointments.findIndex((item) => item.identifier === appointmentid);
            if(index != -1){
                appointments.splice(index, 1);
                localStorage.setItem('appointment'+userid, JSON.stringify(OrderData(appointments)));
                resolve("Appointment Susccessfully deleted");
            }else{
                reject("Appointment not found");
            }
        }catch{
            reject("An error ocurred while deleting the appointment");
        }
    })
}

export function editAppointment(userid,newAppointment){
    return new Promise(async (resolve,reject)=>{
        try{            
            let appointments = await loadUserAppointmets(userid);
            const index = appointments.findIndex((item) => item.identifier === newAppointment.identifier);
            if(index != -1){
                appointments[index] = newAppointment;
                localStorage.setItem('appointment'+userid, JSON.stringify(OrderData(appointments)));
                resolve("Data edited successfully");
            }else{
                reject("Appointment not found");
            }
        }catch{
            reject("An error ocurred while editing the appointment");
        }
    })
}

function OrderData(appointment){
    appointment.sort(function(a,b){
        const firstDate = moment(a.date, 'YYYY-MM-DD');
        const secondDate = moment(b.date, 'YYYY-MM-DD');
        const firstHour = moment(a.time,'hh:mm');
        const SecondHour = moment(b.time,'hh:mm');
        return a.status.localeCompare(b.status) || firstDate - secondDate || firstHour - SecondHour ||
        a.profession.localeCompare(b.profession);
      });
    return appointment;
}
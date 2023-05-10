export function loadUserAppointmets(id){
    let appointments = localStorage.getItem('appointment'+id);
    if(appointments == null){
        return [];
    }
    return JSON.parse(appointments);
}

export function saveUserAppointments(userAppointments,id){
    localStorage.setItem('appointment'+id, JSON.stringify(userAppointments));
}
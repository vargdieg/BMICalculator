export function saveSession(identifier){
    localStorage.setItem("Session",""+identifier);
}

export function getCurrentSession(){
    return localStorage.getItem("Session");
}

export function logOffCurrentSession(){
    localStorage.removeItem("Session");
}
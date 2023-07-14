import {logOffCurrentSession} from "../Services/ManageUsers/manageSessions.jsx"

export function redirectHome(){
    window.location.href = "/";
}

export function redirectRegister(){
    window.location.href = "../register";
}

export function closeSession(){
    logOffCurrentSession();
    window.location.href = "../";
}

export function bmi(identifier){
    window.location.href = "../imc?id="+identifier;
}

export function appointment(identifier){
    window.location.href = "../appointments?id="+identifier;
}

export function sleep(identifier){
    window.location.href = "../sleep?id="+identifier;
}
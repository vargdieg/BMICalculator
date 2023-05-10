import {logOffCurrentSession} from "../Services/ManageUsers/manageSessions.js"

export function redirectHome(){
    window.location.href = "../loggin.html";
}

export function redirectRegister(){
    window.location.href = "../register.html";
}

export function closeSession(){
    logOffCurrentSession();
    window.location.href = "../loggin.html";
}

export function bmi(identifier){
    window.location.href = "../imc.html?id="+identifier;
}

export function appointment(identifier){
    window.location.href = "../appointments.html?id="+identifier;
}

export function sleep(identifier){
    window.location.href = "../sleep.html?id="+identifier;
}
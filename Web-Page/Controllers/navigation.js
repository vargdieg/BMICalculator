import {logOffCurrentSession} from "../Services/manageSessions.js"

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
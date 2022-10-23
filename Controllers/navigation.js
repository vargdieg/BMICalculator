import {logOffCurrentSession} from "../Services/manageSessions.js"

export function redirectHome(){
    window.location.href = "../Screens/loggin.html";
}

export function redirectRegister(){
    window.location.href = "../Screens/register.html";
}

export function closeSession(){
    logOffCurrentSession();
    window.location.href = "../Screens/loggin.html";
}
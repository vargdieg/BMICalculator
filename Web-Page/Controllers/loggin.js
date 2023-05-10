import {validateLoggin} from "../Services/ManageUsers/ManageUsers.js"
import {saveSession,getCurrentSession} from "../Services/ManageUsers/manageSessions.js"
import { redirectHome,redirectRegister,bmi} from "./navigation.js";
import {addOpinion} from "./saveOpinion.js";

const redirectHomebutton = document.querySelector("[data-home]");
const redirectRegisterbutton = document.querySelector("[data-register]");
const saveOpinion = document.querySelector("[data-opinion]");

redirectHomebutton.addEventListener("click",()=>{
    redirectHome();
});

redirectRegisterbutton.addEventListener("click",()=>{
    redirectRegister();
});

const button = document.querySelector("[data-button]");

saveOpinion.addEventListener("click",()=>{
    addOpinion();
});

const Session = getCurrentSession();
if(Session != null){
    window.location.href = "../imc.html?id="+Session;
}

button.addEventListener("click",() => {
    const [username,password] = readEntries();
    validateLoggin(username,password).then((user) => {
        saveSession(user.identifier);
        bmi(user.identifier);
    }).catch((error) => {
        alert(error);
    });
});

function readEntries(){
    const username = document.querySelector("[data-username]").value;
    const password = document.querySelector("[data-password]").value;

    document.querySelector("[data-username]").value = "";
    document.querySelector("[data-password]").value = "";

    return [username,password];
}
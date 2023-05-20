import {validateLoggin} from "../../Services/ManageUsers/ManageUsers.js"
import {saveSession,getCurrentSession} from "../../Services/ManageUsers/manageSessions.js"
import { redirectHome,redirectRegister,bmi} from "../navigation.js";
import {addOpinion} from "../manage-opinion/saveOpinion.js";
import {validateInputs} from "../validateInputForm/validateInputForm.js"
import { showModalCommon } from "../manage-modal/manage-commonmodal.js";

const redirectHomebutton = document.querySelector("[data-home]");
const redirectRegisterbutton = document.querySelector("[data-register]");
const saveOpinion = document.querySelector("[data-opinion]");

const username = document.querySelector("[data-username]");
const password = document.querySelector("[data-password]");

username.addEventListener("blur",()=>{
    const [,reason]  = validateInputs([username],["username"]);
    document.querySelector("[data-username-message]").innerHTML = reason;
});

password.addEventListener("blur",()=>{
    const [,reason]  = validateInputs([password],["password"]);
    document.querySelector("[data-password-message]").innerHTML = reason;
});

const Session = getCurrentSession();
if(Session != null){
    window.location.href = "../imc.html?id="+Session;
}

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

button.addEventListener("click",() => {
    const [username,password] = readEntries();
    if(!(username == "" || password == "")){
        validateLoggin(username,password).then((user) => {
            saveSession(user.identifier);
            bmi(user.identifier);
        }).catch((error) => {
            showModalCommon(error);
        });
    }else{
        showModalCommon("Campo de usuario o contraseña sin valor");
    }
});

function readEntries(){
    const username = document.querySelector("[data-username]").value;
    const password = document.querySelector("[data-password]").value;

    document.querySelector("[data-username]").value = "";
    document.querySelector("[data-password]").value = "";

    return [username,password];
}
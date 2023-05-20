import {saveUser} from "../../Services/ManageUsers/ManageUsers.js";
import { redirectHome,redirectRegister} from "../navigation.js";
import {addOpinion} from "../manage-opinion/saveOpinion.js";
import {User} from "../classes/User.js"
import {showModalCommon} from "../manage-modal/manage-commonmodal.js"
import {validateInputs} from "../validateInputForm/validateInputForm.js"

const registerUser = document.querySelector("[data-submit]");

const redirectHomebutton = document.querySelector("[data-home]");
const redirectRegisterbutton = document.querySelector("[data-register]");
const saveOpinion = document.querySelector("[data-opinion]");

const username = document.querySelector("[data-username]");
const password = document.querySelector("[data-password]");
const email = document.querySelector("[data-email]");

username.addEventListener("blur",()=>{
    const [,reason]  = validateInputs([username],["username"]);
    document.querySelector("[data-username-message]").innerHTML = reason;
});

password.addEventListener("blur",()=>{
    const [,reason]  = validateInputs([password],["password"]);
    document.querySelector("[data-password-message]").innerHTML = reason;
});

email.addEventListener("blur",()=>{
    const [,reason]  = validateInputs([email],["email"]);
    document.querySelector("[data-email-message]").innerHTML = reason;
});

redirectHomebutton.addEventListener("click",()=>{
    redirectHome();
});

redirectRegisterbutton.addEventListener("click",()=>{
    redirectRegister();
});

saveOpinion.addEventListener("click",()=>{
    addOpinion();
});

registerUser.addEventListener("click",() => {
    const [fields,fieldNames] = readInputs();
    const [validation,message] = validateInputs(fields,fieldNames);
    if(validation && fields[1].value == fields[2].value){
        let newUser = new User(fields[0].value,fields[1].value,fields[3].value);
        saveUser(newUser).then(() => {
            showModalCommon("User "+newUser.username+" registered");
            clearInputs();
        }).catch(() =>{
            showModalCommon("An error has ocurred, the user could not be registered");
            clearInputs();
        });
    }else{
        if(!validation)
        showModalCommon(message)
        else{
            showModalCommon("The password and the verification missmatches");
        }
        clearInputs();
    }
});

function readInputs(){
    const fields = [];
    const fieldNames = [];
    fields.push(document.querySelector("[data-username]"));
    fields.push(document.querySelector("[data-password]"));
    fields.push(document.querySelector("[data-validatepassword]"));
    fields.push(document.querySelector("[data-email]"));

    fieldNames.push("user name");
    fieldNames.push("password");
    fieldNames.push("password validation");
    fieldNames.push("email");

    return [fields,fieldNames];
}

function clearInputs(){
    document.querySelector("[data-username]").value = "";
    document.querySelector("[data-password]").value = "";
    document.querySelector("[data-validatepassword]").value = "";
    document.querySelector("[data-email]").value = "";
}
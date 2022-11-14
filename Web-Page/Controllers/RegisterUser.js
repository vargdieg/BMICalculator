import {saveUser} from "../Services/ManageUsers.js";
import { redirectHome,redirectRegister} from "./navigation.js";
import {addOpinion} from "./saveOpinion.js";

const registerUser = document.querySelector("[data-submit]");

const redirectHomebutton = document.querySelector("[data-home]");
const redirectRegisterbutton = document.querySelector("[data-register]");
const saveOpinion = document.querySelector("[data-opinion]");

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
    const fields = readInputs();
    const [validation,message] = validateInputs(fields);
    if(validation){
        const User = {
            username: fields[0].value,
            password: fields[1].value,
            email: fields[3].value,
            identifier: uuid.v4()
        }
        saveUser(User).then(() => {
            alert("User "+User.username+" registered");
            clearInputs();
        }).catch(() =>{
            alert("Could not save the user");
            clearInputs();
        });
    }else{
        alert(message);
        clearInputs();
    }
});

function readInputs(){
    const fields = [];
    fields.push(document.querySelector("[data-username]"));
    fields.push(document.querySelector("[data-password]"));
    fields.push(document.querySelector("[data-validatepassword]"));
    fields.push(document.querySelector("[data-email]"));
    return fields;
}

function clearInputs(){
    document.querySelector("[data-username]").value = "";
    document.querySelector("[data-password]").value = "";
    document.querySelector("[data-validatepassword]").value = "";
    document.querySelector("[data-email]").value = "";
}

function validateInputs (fieldstoValidate) {
    let validation = true;
    let message = "";
    fieldstoValidate.forEach(field => {
        if(!field.validity.valid){
            message = "Field "+field.id+" Not correctly mapped";
            validation = false;
        }
    })
    return [validation,message];  
}
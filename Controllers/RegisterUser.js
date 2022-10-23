import {saveUser,LoadUsers} from "../Services/saveNewUsers.js";
import { redirectHome,redirectRegister} from "./navigation.js";
import {addOpinion} from "./saveOpinion.js";

const button = document.querySelector("[data-submit]");

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

button.addEventListener("click",() => {
    const fields = readInputs();
    const [validate,message] = validateInputs(fields);
    if(validate){
        const User = {
            username: fields[0].value,
            password: fields[1].value,
            email: fields[3].value,
            identifier: uuid.v4()
        }
        saveUser(User);
        clearInputs();
        console.log("El usuario "+User.username+" Fue registrado");
    }else{
        alert("Los datos no estan bien mapeados");
        console.log(message);
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

function validateInputs(fieldstoValidate){
    let validation = true;
    let message = "";
    fieldstoValidate.forEach(field => {
        if(!field.validity.valid){
            validation = false;
            message = "Campo "+field.id+" No esta mapeado correctamente";
        }  
    })
    let users = LoadUsers();
    users.forEach(user => {
        if(user.email == fieldstoValidate[3].value){
            validation = false;
            message = "Email ya registrado";
        }
    })
    if(fieldstoValidate[1].value != fieldstoValidate[2].value){
        validation = false;
        message = "Las contraseñas no coinciden";
    }
    return [validation,message];
}
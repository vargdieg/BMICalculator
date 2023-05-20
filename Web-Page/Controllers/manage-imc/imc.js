import {loadUserData,saveData} from "../../Services/ManageUsers/ManageUserData.js";
import { closeSession, redirectHome, appointment,bmi,sleep} from "../navigation.js";
import {addOpinion} from "../manage-opinion/saveOpinion.js";
import {displayPage} from "./displayImcPage.js";
import {logOffCurrentSession} from "../../Services/ManageUsers/manageSessions.js";
import {bmiData} from "../classes/bmiData.js";
import {showModalCommon} from "../manage-modal/manage-commonmodal.js";
import {validateInputs} from "../validateInputForm/validateInputForm.js";
import {deleteUser} from "../../Services/ManageUsers/ManageUsers.js"

const params = new URLSearchParams(window.location.search);
const idUser = params.get("id");

const addEntrie = document.querySelector("[data-button]");
const bmiredirectB = document.querySelector("[data-bmi]");
const medicalAppointmentButton = document.querySelector("[data-appointments]");
const closeSessionButton = document.querySelector("[data-session]");
const deleteUserB = document.querySelector("[data-delete]");
const saveOpinion = document.querySelector("[data-opinion]");
// const sleepHourButton = document.querySelector("[data-sleep]");

displayPage();

closeSessionButton.addEventListener("click",()=>{
    closeSession();
});

saveOpinion.addEventListener("click",()=>{
    addOpinion();
});

bmiredirectB.addEventListener("click",()=>{
    bmi(idUser);
});

// sleepHourButton.addEventListener("click",()=>{
//     sleep();
// })

medicalAppointmentButton.addEventListener("click",()=>{
    appointment(idUser);
})

addEntrie.addEventListener("click",() =>{
    let weight = document.querySelector("[data-weight]");
    let height = document.querySelector("[data-height]");
    let waist = document.querySelector("[data-waist]");
    let date = document.querySelector("[data-date]");
    const [validate,reason] = validateInputs([weight,height,waist,date],["weight","height","waist","date"]);
    const dateTime = moment(date.value).format('DD/MM/YYYY');
    if(!validate){
        showModalCommon(reason);
    }else{
        loadUserData(idUser).then((loadData)=>{
            const bmi = bmiCalculator(height.value,weight.value).toFixed(2);
            const data = new bmiData(weight.value,height.value,dateTime,bmi,uuid.v4(),waist.value);
            loadData.push(data);
            loadData = orderData(loadData);
            saveData(loadData,idUser).then(()=>{
                displayPage();
            }).catch((error)=>{
                showModalCommon(error);
            });
        }).catch((error)=>{
            showModalCommon(error);
        });
    }
});

function orderData(datos){
    datos.sort(function(a,b){
        const firstDate = moment(a.date, 'DD/MM/YYYY');
        const secondDate = moment(b.date, 'DD/MM/YYYY');
        return firstDate - secondDate;
      });
    return datos;
}

function bmiCalculator(height,weight){
    let bmi = (100*100*weight)/(height*height);
    return bmi;
}

deleteUserB.addEventListener("click",()=>{
    if (confirm('You are going to delete this account. Are you sure of that?')) {
        deleteUser(idUser).then(()=>{
            showModalCommon("Deleted user");
            logOffCurrentSession();
            redirectHome();
        }).catch((error)=>{
            showModalCommon(error);
        });
      }
});
import {loadUserData,saveData} from "../Services/ManageUserData.js"
import { closeSession } from "./navigation.js";
import {addOpinion} from "./saveOpinion.js";
import {displayPage} from "./displayImcPage.js";
import {deleteUser} from "../Services/ManageUsers.js";
import {redirectHome} from "./navigation.js"
import {logOffCurrentSession} from "../Services/manageSessions.js"


const params = new URLSearchParams(window.location.search);
const idUser = params.get("id");

const addEntrie = document.querySelector("[data-button]");
const closeSessionButton = document.querySelector("[data-session]");
const deleteUserB = document.querySelector("[data-delete]");
const saveOpinion = document.querySelector("[data-opinion]");

displayPage();

closeSessionButton.addEventListener("click",()=>{
    closeSession();
});

saveOpinion.addEventListener("click",()=>{
    addOpinion();
});

addEntrie.addEventListener("click",() =>{
    const [condition,weight,height,waist,date] = validateEntries();
    if(!condition){
        alert("datos no correctos");
    }else{
        loadUserData(idUser).then((loadData)=>{
            const imc = imcCalculator(height,weight).toFixed(2);
            const data = {
                weight: weight,
                height: height,
                date: date,
                bmi: imc,
                id: uuid.v4(),
                waist: waist
            }
            loadData.push(data);
            loadData = ordenarDatos(loadData);
            saveData(loadData,idUser).then(()=>{
                displayPage();
            }).catch((error)=>{
                alert(error);
            });
        }).catch((error)=>{
            alert(error);
        });
    }
});

function validateEntries(){
    let weight = document.querySelector("[data-weight]");
    let height = document.querySelector("[data-height]");
    let waist = document.querySelector("[data-waist]");
    let date = document.querySelector("[data-date]");
    if(weight.validity.valid && height.validity.valid && date.validity.valid){
        const dateTime = moment(date.value).format('DD/MM/YYYY');
        return [true,weight.value,height.value,waist.value,dateTime];
    }else{
        return [false,weight.value,height.value,waist.value,date.value];
    }
};

function ordenarDatos(datos){
    datos.sort(function(a,b){
        const firstDate = moment(a.date, 'DD/MM/YYYY');
        const secondDate = moment(b.date, 'DD/MM/YYYY');
        return firstDate - secondDate;
      });
    return datos;
}

function imcCalculator(height,weight){
    let imc = (100*100*weight)/(height*height);
    return imc;
}

deleteUserB.addEventListener("click",()=>{
    if (confirm('You are going to delete this account. Are you sure of that?')) {
        deleteUser(idUser).then(()=>{
            alert("Usuario Eliminado");
            logOffCurrentSession();
            redirectHome();
        }).catch((error)=>{
            alert(error);
        });
      }
});
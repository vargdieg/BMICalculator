import {createCard} from './create-card.js'
import { closeSession, redirectHome, appointment,bmi,sleep} from "../navigation.js";
import {loadUserAppointmets} from '../../Services/appointmentCard/ManageAppointments.js'
import { addNote } from "./manage-card.js";
import {showModalCommon} from "../manage-modal/manage-commonmodal.js";
import {deleteUser} from "../../Services/ManageUsers/ManageUsers.js"

const params = new URLSearchParams(window.location.search);
let id = params.get("id");

DisplayAppointments();

const bmiredirectB = document.querySelector("[data-bmi]");
const closeSessionButton = document.querySelector("[data-session]");
const medicalAppointmentButton = document.querySelector("[data-appointments]");
const deleteUserB = document.querySelector("[data-delete]");

deleteUserB.addEventListener("click",()=>{
    if (confirm('You are going to delete this account. Are you sure of that?')) {
        deleteUser(idUser).then(()=>{
            logOffCurrentSession();
            redirectHome();
        }).catch((error)=>{
            showModalCommon(error);
        });
      }
});

closeSessionButton.addEventListener("click",()=>{
    closeSession();
});

bmiredirectB.addEventListener("click",()=>{
    bmi(id);
});

medicalAppointmentButton.addEventListener("click",()=>{
    appointment(id);
})

export function DisplayAppointments(){
    
    cleanList();
    let appointmentaddCard = document.createElement('li');
    appointmentaddCard.classList.add('body__appointmentaddButton__add');
    let plusIcon = document.createElement('i');
    plusIcon.classList.add('fa','fa-plus','fa-5x');
    plusIcon.style.color = "black";

    appointmentaddCard.appendChild(plusIcon);

    appointmentaddCard.addEventListener('click',()=>{
        addNote();
    });

    let list = document.getElementById('appointment-list');
    list.appendChild(appointmentaddCard);

    loadUserAppointmets(id).then((appointmets)=>{
        appointmets.forEach(appointment => {
            addNewAppointment(createCard(appointment));
        });
    }).catch((error)=>{
        showModalCommon(error);
    });
}

function addNewAppointment(cardElement){
    let list = document.getElementById('appointment-list');
    list.appendChild(cardElement);
}

function cleanList(){
    document.getElementById('appointment-list').innerHTML='';
}
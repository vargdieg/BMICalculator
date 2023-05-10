import {createCard} from './create-card.js'
import {loadUserAppointmets} from '../../Services/appointmentCard/ManageAppointments.js'
import { addNote } from "./manage-card.js";

let id = 1;

DisplayAppointments();

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

    let appointmets = loadUserAppointmets(id);
    appointmets.forEach(appointment => {
        addNewAppointment(createCard(appointment));
    });

}

function addNewAppointment(cardElement){
    let list = document.getElementById('appointment-list');
    list.appendChild(cardElement);
}

function cleanList(){
    document.getElementById('appointment-list').innerHTML='';
}
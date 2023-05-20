import {loadUserAppointmets,saveUserAppointments} from '../../Services/appointmentCard/ManageAppointments.js';
import {DisplayAppointments} from './appointment-index.js';
import { showModal,hideModal } from './manage-modal.js';
import {appointmentCard} from '../classes/appointmentCard.js'
import { showModalCommon } from '../manage-modal/manage-commonmodal.js';
const userid = params.get("id");;

export function deleteNote(id){
    let userAppointments = loadUserAppointmets(userid).then(()=>{
        let index = findNote(userAppointments,id);
        if(index != -1){
            userAppointments.splice(index, 1);
            saveUserAppointments(ordenarDatos(userAppointments),userid);
            DisplayAppointments();
        }
    }).catch((error)=>{
        showModalCommon(error);
    });
}

export function editNote(id){
    let userAppointments = loadUserAppointmets(userid).then(()=>{
        let index = findNote(userAppointments,id)
        if(index != -1){
            showModal(id,userAppointments[index].profession,userAppointments[index].status,createDate(userAppointments[index]),userAppointments[index].direction,userAppointments[index].description);
            let saveButton = document.querySelector('[data-modalSave]');
            let EscButton = document.querySelector('[data-modalEsc]');
            EscButton.addEventListener('click',()=>{
                hideModal();
            });

            saveButton.addEventListener('click',()=>{

                let profession = document.querySelector('[data-inputProfession]').value;
                let status = document.querySelector('[data-inputStatus]').value;
                let dateTime = document.querySelector('[data-inputDate]').value;
                let direction = document.querySelector('[data-inputDirection]').innerHTML;
                let description = document.querySelector('[data-inputDescription]').innerHTML;
                let [date,time] = dateTime.split('T');
                let newAppointment = new appointmentCard(profession,date,time,status,direction,description)

                userAppointments.splice(index,1);
                userAppointments.push(newAppointment);
                saveUserAppointments(ordenarDatos(userAppointments),userid);
                hideModal();
                DisplayAppointments();
            });

        }else{
            showModalCommon("Error with the user id")
        }
    }).catch((error)=>{
        showModalCommon(error);
    });
}

export function addNote(){
    showModal("Create-Modal");
    let saveButton = document.querySelector('[data-modalSave]');
    let EscButton = document.querySelector('[data-modalEsc]');

    EscButton.addEventListener('click',()=>{
        hideModal();
    });


    saveButton.addEventListener('click',()=>{
        
        let userAppoint = loadUserAppointmets(userid).then(()=>{
            let profession = document.querySelector('[data-inputProfession]').value;
            let status = document.querySelector('[data-inputStatus]').value;
            let dateTime = document.querySelector('[data-inputDate]').value;
            let direction = document.querySelector('[data-inputDirection]').innerHTML;
            let description = document.querySelector('[data-inputDescription]').innerHTML;
            let [date,time] = dateTime.split('T');
            let newAppointment = new appointmentCard(profession,date,time,status,direction,description)

            userAppoint.push(newAppointment);
            saveUserAppointments(ordenarDatos(userAppoint),userid);

            hideModal();
            DisplayAppointments();
        }).catch((error)=>{
            showModalCommon(error);
        });
        
    });

}

function findNote(appointments,id){
    let indexNote = -1;
    appointments.forEach((appointment,index) => {
        if(appointment.identifier == id){
            indexNote = index;
        }
    });
    return indexNote;
}

function ordenarDatos(appointment){
    appointment.sort(function(a,b){
        const firstDate = moment(a.date, 'YYYY-MM-DD');
        const secondDate = moment(b.date, 'YYYY-MM-DD');
        const firstHour = moment(a.time,'hh:mm');
        const SecondHour = moment(b.time,'hh:mm');
        return a.status.localeCompare(b.status) || firstDate - secondDate || firstHour - SecondHour ||
        a.profession.localeCompare(b.profession);
      });
    return appointment;
}

function createDate(appointment){
    return appointment.date+'T'+appointment.time;
}
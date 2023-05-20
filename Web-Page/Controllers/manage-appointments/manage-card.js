import {saveUserAppointments,deleteAppointment,editAppointment} from '../../Services/appointmentCard/ManageAppointments.js';
import {DisplayAppointments} from './appointment-index.js';
import { showModal,hideModal } from './manage-modal.js';
import {appointmentCard} from '../classes/appointmentCard.js'
import { showModalCommon } from '../manage-modal/manage-commonmodal.js';
import {validateInputs,validateInputEnum} from "../validateInputForm/validateInputForm.js";
import {appointmentsStatus,professionals} from "../const/appointmentsConsts.js";
import {professionals,appointmentsStatus} from "../consts/appointmentsConsts.js"

const params = new URLSearchParams(window.location.search);
const userid = params.get("id");

export function deleteNote(id){
    deleteAppointment(userid,id).then(()=>{
        DisplayAppointments();
    }).catch((error)=>{
        showModalCommon(error);
    })
}

export function editNote(event,id){
    let profession = event.target.parentElement.childNodes[2].innerHTML;
    let date = event.target.parentElement.childNodes[3].innerHTML;
    let time = event.target.parentElement.childNodes[4].innerHTML;
    let status = event.target.parentElement.childNodes[5].innerHTML;
    let direction = event.target.parentElement.childNodes[6].innerHTML;
    let description = event.target.parentElement.childNodes[7].innerHTML;

    let Time = moment(time,'h:mm a').format('HH:mm');

    showModal(id,profession,status,date+'T'+Time,direction,description);
    let saveButton = document.querySelector('[data-modalSave]');
    let EscButton = document.querySelector('[data-modalEsc]');

            EscButton.addEventListener('click',()=>{
                hideModal();
            });

            saveButton.addEventListener('click',()=>{
                let profession = document.querySelector('[data-inputProfession]');
                let status = document.querySelector('[data-inputStatus]');
                let dateTime = document.querySelector('[data-inputDate]');
                let direction = document.querySelector('[data-inputDirection]');
                let description = document.querySelector('[data-inputDescription]');
                const [validate,reason] = validateInputs([profession,dateTime,status],["Profession","date-time","status"]);
                const [validateEnum,reasonEnum] = validateInputEnum([profession,status],["Profession","status"],[professionals,appointmentsStatus]);
                if(!validate || !validateEnum){
                    if(!validate){
                        hideModal();
                        showModalCommon(reason);
                    }else{
                        hideModal();
                        showModalCommon(reasonEnum);
                    }
                }else{

                    let [date,time] = dateTime.value.split('T');
                    let newAppointment = new appointmentCard(profession.value,date,time,status.value,direction.innerHTML,description.innerHTML);
                    newAppointment.identifier = id;

                    editAppointment(userid,newAppointment).then(()=>{
                        hideModal();
                        DisplayAppointments();
                    }).catch((error)=>{
                        hideModal();
                        showModalCommon(error);
                    });
                    
                }
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
        
        let profession = document.querySelector('[data-inputProfession]');
        let status = document.querySelector('[data-inputStatus]');
        let dateTime = document.querySelector('[data-inputDate]');
        let direction = document.querySelector('[data-inputDirection]');
        let description = document.querySelector('[data-inputDescription]');

        const [validate,reason] = validateInputs([profession,dateTime,status],["Profession","date-time","status"]);
        const [validateEnum,reasonEnum] = validateInputEnum([profession,status],["Profession","status"],[professionals,appointmentsStatus]);
        
        if(!validate || !validateEnum){
            if(!validate){
                hideModal();
                showModalCommon(reason);
            }else{
                hideModal();
                showModalCommon(reasonEnum);
            }
            }else{
                let [date,time] = dateTime.value.split('T');
                let newAppointment = new appointmentCard(profession.value,date,time,status.value,direction.innerHTML,description.innerHTML);
                saveUserAppointments(newAppointment,userid).then(()=>{
                    hideModal();
                    DisplayAppointments();
                }).catch((error)=>{
                    hideModal();
                    showModalCommon(error);
                });
            }                
    });

}
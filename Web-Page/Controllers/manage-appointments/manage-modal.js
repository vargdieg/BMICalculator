import {professionals,appointmentsStatus} from "../consts/appointmentsConsts.js"

export function showModal(id,profession = "",status = "", iDate = "",direction="Direction",description = "Description"){
    let modalElement = document.getElementById("Modal");
    modalElement.innerHTML = createModal(id,profession,status,iDate,description);
    modalElement.firstChild.style.display = 'block';

    document.querySelector('[data-inputProfession]').value = profession;
    document.querySelector('[data-inputStatus]').value = status;
    document.querySelector('[data-inputDate]').value = iDate;
    document.querySelector('[data-inputDirection]').innerHTML = direction;
    document.querySelector('[data-inputDescription]').innerHTML = description;
}

export function hideModal(){
    let modalElement = document.getElementById("Modal");
    modalElement.firstChild.style.display = 'none';
    modalElement.innerHTML='';
}

function createModal(id="CreateModal"){
    let profSorted = professionals.sort();
    return `<div id=${id} class="modal">
                <div class="body__appointmentCardList__element modal-content">
                    <i class="fa fa-trash fa-lg" style="color:rgba(178, 6, 6, 0.771)" data-modalEsc></i>
                    <i class="fa fa-save fa-lg" style="color:black" data-modalSave></i>
                    <div class="appointmentCardList__element__header">
                        <label for="professionselection">Profession:</label>
                        <select name="profession" id="professionselection" required data-inputProfession>
                            ${profSorted.map(element => createOptionValue(element))}
                        </select>
                    </div>
                    <div class="appointmentCardList__element__header">
                        <label for="statusselection">Status:</label>
                        <select name="status" id="statusselection" required data-inputStatus>
                            ${appointmentsStatus.map(element => createOptionValue(element))}
                        </select>
                    </div>
                    <div class="appointmentCardList__element__header">
                        <label for="dateOfEntry">date</label>
                        <input class="body__addentry__element__input" id="dateOfEntry" type="datetime-local" min="2018-06-07T00:00" max="2052-06-14T00:00" required data-inputDate>
                    </div>
                    <p class="appointmentCardList__element__description" contenteditable="true" data-inputDirection></p>
                    <p class="appointmentCardList__element__description" contenteditable="true" data-inputDescription></p>
                </div>
            </div>`   
}

function createOptionValue(value){
    return `<option value="${value}">${value}</option>`
}
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
    return `<div id=${id} class="modal">
                <div class="body__appointmentCardList__element modal-content">
                    <i class="fa fa-trash fa-lg" style="color:rgba(178, 6, 6, 0.771)" data-modalEsc></i>
                    <i class="fa fa-save fa-lg" style="color:black" data-modalSave></i>
                    <div class="appointmentCardList__element__header">
                        <label for="professionselection">Profession:</label>
                        <select name="profession" id="professionselection" data-inputProfession>
                            <option value="alergologia">alergologia</option>
                            <option value="cirugia_Maxilofacial">cirugia_Maxilofacial</option>
                            <option value="general">general</option>
                            <option value="medicina_Interna">medicina Interna</option>
                            <option value="otorrino">otorrino</option>
                            <option value="odontologia">odontologia</option>
                            <option value="neurologia">neurologia</option>
                            <option value="medicina_Deportiva">medicina Deportiva</option>
                            <option value="nutricion">nutricion</option>
                            <option value="endocrinologia">endocrinologia</option>
                            <option value="optometria">optometria</option>
                        </select>
                    </div>
                    <div class="appointmentCardList__element__header">
                        <label for="statusselection">Status:</label>
                        <select name="status" id="statusselection" data-inputStatus>
                            <option value="agendada">Agendada</option>
                            <option value="por_agendar">Por Agendar</option>
                        </select>
                    </div>
                    <div class="appointmentCardList__element__header">
                        <label for="dateOfEntry">date</label>
                        <input class="body__addentry__element__input" id="dateOfEntry" type="datetime-local" min="2018-06-07T00:00" max="2052-06-14T00:00" data-inputDate>
                    </div>
                    <p class="appointmentCardList__element__description" contenteditable="true" data-inputDirection></p>
                    <p class="appointmentCardList__element__description" contenteditable="true" data-inputDescription></p>
                </div>
            </div>`   
}
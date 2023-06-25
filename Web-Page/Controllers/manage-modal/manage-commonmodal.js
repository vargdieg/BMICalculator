export function showModalCommon(message="An fucking error has ocurred"){
    let modalElement = document.getElementById("ModalCommon");
    modalElement.innerHTML = createModal(message);
    modalElement.firstChild.style.display = 'block';

    document.querySelector('[data-modalexit]').addEventListener('click',()=>{
         hideModal();
    })

    document.querySelector('[data-message]').value = message;
}

export function hideModal(){
    let modalElement = document.getElementById("ModalCommon");
    modalElement.firstChild.style.display = 'none';
    modalElement.innerHTML='';
}

function createModal(message){
    return `<div class="modal">
                <div class="modal-content">
                    <i class="fa fa-window-close" aria-hidden="true" data-modalexit></i>
                    <p data-message>${message}</p>
                </div>
            </div>`  
}
// Vamos a crear una cartica
import { deleteNote,editNote } from "./manage-card.js";

const deleteIcon = (id) => {
    const i = document.createElement('i');
    i.classList.add('fa', 'fa-trash','fa-lg');
    i.style.color = "rgba(178, 6, 6, 0.771)";
    i.addEventListener('click', () => deleteNote(id));
    return i;
};

const editIcon = (id) => {
    const i = document.createElement('i');
    i.classList.add('fa', 'fa-pencil','fa-lg');
    i.style.color = "rgba(175, 175, 3, 0.788)";
    i.addEventListener('click', () => editNote(id));
    return i;
}

function createParagraphElement(descripcion,ownClass){
    const i = document.createElement('p');
    i.classList.add(ownClass);
    i.innerHTML = descripcion;
    return i;
}

export function createCard(card){
    const cardElement = document.createElement('li');
    cardElement.classList.add('body__appointmentCardList__element');
    cardElement.appendChild(deleteIcon(card.identifier));
    cardElement.appendChild(editIcon(card.identifier));
    cardElement.appendChild(createParagraphElement(card.profession,'appointmentCardList__element__header'));
    cardElement.appendChild(createParagraphElement(card.date,'appointmentCardList__element__header'));
    
    let time = moment(card.time,'HH:mm').format('h:mm a');

    cardElement.appendChild(createParagraphElement(time,'appointmentCardList__element__header'));
    cardElement.appendChild(createParagraphElement(card.status,'appointmentCardList__element__header'));
    cardElement.appendChild(createParagraphElement(card.direction,'appointmentCardList__element__header'));
    cardElement.appendChild(createParagraphElement(card.description,'appointmentCardList__element__description'));
    return cardElement;
}
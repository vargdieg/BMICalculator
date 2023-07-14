import React,{useState} from 'react';
import ManageMessageInput from './MessageFormChange.jsx';
import './footer.css';
import {opinion} from '../../Controllers/Classes/opinion.jsx';
import {uploadOpinion} from '../../Services/ManageOpinion/manageOpinion.jsx';

export default function Footer(){
    const [message,setMessage] = useState({
        user: ["",false],
        usermessage: ["",false],
    })
    
    const validMessageEntries = (event)=>{
        return ManageMessageInput(event,setMessage);
    }

    function handleButtonOpinion(event){
        event.preventDefault();
        if(message.user[1] && message.usermessage[1]){
            let newOpinion = new opinion(message.user[0],message.usermessage[0])
            uploadOpinion(newOpinion);
            setMessage({
                user: ["",false],
                usermessage: ["",false],
            });
        }else{
            console.log('No se pudo enviar la opinion que quiere enviar');
        }
    }

    return (<footer className="footer">
                <section className="footer__contact__form">
                    <p className="footer__contact__form__Information">Danos tu opinion sobre esta pagina</p>
                    <input type="text" className="footer__contact__form__name" id='opinionUser' value={message.user[0]} onChange={validMessageEntries} placeholder="Name" />
                    <input type="textarea" className="footer__contact__form__message" id='opinionMessage' value={message.usermessage[0]} onChange={validMessageEntries} placeholder="Message" />
                    <button className="footer__contact__form__button" type="submit" onClick={handleButtonOpinion}>Registrar Opinion</button>
                </section>
                <section className="footer__message">
                    <p className="footer__message__text">Gracias por confiar en nosotros para poder guardar su informacion</p>
                    <p className="footer_message__copyright">©Copyright 2022</p>
                </section>
            </footer>)
}
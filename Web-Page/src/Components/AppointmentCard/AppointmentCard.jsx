import React from 'react';
import './AppointmentCard.css';

export default function AppointmentCard({id,profession,date,time,status,direction,description,deleteAppointment,editAppointment}){
    //Esto es un comentario

    return (<li className='body__appointmentCardList__element' id={id} key={id}>
        <div className='body__appointmentCardList__element_innerCard'>
            <div className='body__appointmentCardList__element__front'>
                <p className="appointmentCardList__element__header">{profession}</p>
                <p className="appointmentCardList__element__header">{date}</p>
                <p className="appointmentCardList__element__header">{time}</p>
                <p className="appointmentCardList__element__header">{status}</p>
                <p className="appointmentCardList__element__header">{direction}</p>
            </div>
            <div className='body__appointmentCardList__element__back'>
                <div className='body__appointmentCardList__element__back__icons'>
                    <i className='fa fa-trash fa-lg' style={{color: 'rgba(178, 6, 6, 0.773)'}} onClick={deleteAppointment}></i>
                    <i className='fa fa-pencil fa-lg' style={{color: 'rgba(175, 175, 3, 0.79)'}} onClick={editAppointment}></i>
                    <i></i>
                </div>
                <p className='appointmentCardList__element__description'>{description}</p>
            </div>
        </div>
    </li>)
}
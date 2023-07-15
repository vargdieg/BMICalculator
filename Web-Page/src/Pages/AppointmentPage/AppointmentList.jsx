import React from 'react';
import AppointmentCard from '../../Components/AppointmentCard/AppointmentCard.jsx';
import moment from 'moment';

export default function AppointmentList({data,handleAddButton,deleteAppointment,editAppointment}){
    return (<div className='body'>
                <ul id="appointment-list" className="body__appointmentCardList">
                    <li className='body__appointmentaddButton__add' onClick={handleAddButton}><i className='fa fa-plus fa-5x'></i></li>
                    {data.map((appointment,index)=>{
                    let time = moment(appointment.time,'HH:mm').format('h:mm a');
                    return <AppointmentCard id={appointment.identifier} time={time} date={appointment.date} profession={appointment.profession} status={appointment.status} direction={appointment.direction} 
                    description={appointment.description} key={index} deleteAppointment={()=>{deleteAppointment(appointment.identifier)}} 
                    editAppointment={()=>{editAppointment(appointment.identifier,appointment.profession,appointment.status,appointment.date+'T'+appointment.time,appointment.direction,appointment.description)}}/>})}
                </ul>
</div>)
}
import React,{useState} from 'react';
import {appointmentsStatus,professionals} from '../../Controllers/consts/appointmentsConsts.jsx';
import './CardModal.css';
import Modal from '../../Components/Modal/Modal.jsx';
import ManageCardModalForm from './ManageCardModalForm.jsx';
import { createPortal } from 'react-dom';
import {saveUserAppointments,editAppointment} from '../../Services/appointmentCard/ManageAppointments.jsx';
import appointmentCard from '../../Controllers/Classes/appointmentCard.jsx';
import ContentEditable from 'react-contenteditable';

export default function CardModal({modalState,setModalState,state,handleQuit,id,userid,idCardState,save}){

    const validFormEntries = (event)=>{
        return ManageCardModalForm(event,setModalState);
    }

    const [showModal,setShowModal] = useState({
        state: false,
        message: ''
    });

    const handleEditableChange = (value,id) =>{
        setModalState((previousValue)=>{return {
            ...previousValue,
            [id]: [value,true]
        }});
    }

    const quitModal = ()=>{
        setModalState({
            profession:['',false],
            status:['',false],
            date:['',false],
            direction:['',true],
            description:['',true]
        });
        handleQuit();
    }

    const handleSave = ()=>{
        if(modalState.profession[1] && modalState.status[1] &&
            modalState.date[1] && modalState.direction[1]
            && modalState.description[1]){
                let [date,time] = modalState.date[0].split('T');
                if(id === ''){
                    // if id is undefined, means a new date
                    saveUserAppointments(new appointmentCard(modalState.profession[0],date,time,modalState.status[0],modalState.direction[0],modalState.description[0]),userid).then(()=>{
                        quitModal();
                        save();
                        idCardState('');
                    }).catch(()=>{
                        setShowModal((previous) =>{ return {
                            ...previous,
                            state: true,
                            message: 'Error al momento de guardar la cita'
                        }
                        })
                    });
                }else{
                    // if id exist is an already created date                    
                    let appointment = new appointmentCard(modalState.profession[0],date,time,modalState.status[0],modalState.direction[0],modalState.description[0]);
                    appointment.identifier=id;
                    editAppointment(userid,appointment).then(()=>{
                        quitModal();
                        save();
                        idCardState('');
                    }).catch(()=>{
                        setShowModal((previous) =>{ return {
                            ...previous,
                            state: true,
                            message: 'Error al momento de guardar la cita'
                        }
                        })
                    });
                }
            }else{
                setShowModal((previous) =>{ return {
                    ...previous,
                    state: true,
                    message: 'Datos llenados invalidos'
                }
                });
            }
    }

    if(state){
        return (<div className='modal__card'>
             {createPortal(<Modal messageModal={showModal.message} state={showModal.state} handleModal={()=>{setShowModal({state: false,message: ''})}}/>,document.getElementById('modal'))}
             <div className="modal__card__content">
                <div className='modal__card__element__front'>
                    <div className="appointmentCardList__element__header">
                        <label htmlFor="professionselection">Profession:</label>
                        <select name="profession" id="professionselection" required onChange={validFormEntries} value={modalState.profession[0]}>
                        <option disabled defaultValue style={{display:'none'}}></option>
                        {professionals.map((element,index) => createOptionValue(element,index))}
                        </select>
                    </div>
                    <div className="appointmentCardList__element__header">
                        <label htmlFor="statusselection">Status:</label>
                        <select name="status" id="statusselection" required onChange={validFormEntries} value={modalState.status[0]}>
                        <option disabled defaultValue style={{display:'none'}}></option>
                        {appointmentsStatus.map((element,index) => createOptionValue(element,index))}
                        </select>
                    </div>
                    <div className="appointmentCardList__element__header">
                        <label htmlFor="dateOfEntry">date:</label>
                        <input className="body__addentry__element__input" style={{color:"black"}} id="dateOfEntry" type="datetime-local" min="2018-06-07T00:00" max="2052-06-14T00:00" required onChange={validFormEntries} value={modalState.date[0]}/>
                    </div>
                    <p className='appointmentCardList__element__header'>Direccion</p>
                    <ContentEditable className="appointmentCardList__element__description" html={modalState.direction[0]} disabled={false} onChange={(event)=>{handleEditableChange(event.target.value,'direction')}} />
                </div>
                <div className='modal__card__element__back'>
                        <div className="modal__card__element__back__icons">
                            <i className="fa fa-trash fa-lg" style={{color:"rgba(178, 6, 6, 0.771)"}} onClick={quitModal}></i>
                            <i className="fa fa-save fa-lg" style={{color: "black"}} onClick={handleSave}></i>
                        </div>
                        <p className='appointmentCardList__element__header'>Descripcion</p>
                        <ContentEditable className="appointmentCardList__element__description" html={modalState.description[0]} disabled={false} onChange={(event)=>{handleEditableChange(event.target.value,'description')}} />
                </div>
             </div>
        </div>)
    }else{
        return <React.Fragment></React.Fragment>
    }
}

function createOptionValue(value,index){
    return <option value={value} key={index}>{value}</option>
}
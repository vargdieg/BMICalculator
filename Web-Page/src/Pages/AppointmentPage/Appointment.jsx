import React,{useState,useEffect} from 'react';
import { createPortal } from 'react-dom';
import Modal from '../../Components/Modal/Modal.jsx';
import Header from "../../Components/Header/Header.jsx";
import Footer from '../../Components/Footer/Footer.jsx';
import './Appointments.css';
import CardModal from '../../Components/CardModal/CardModal.jsx';
import {loadUserAppointmets,deleteAppointment as deleteappointment} from '../../Services/appointmentCard/ManageAppointments.jsx';
import AppointmentList from './AppointmentList.jsx';
import {getCurrentSession} from '../../Services/ManageUsers/manageSessions.jsx';
import {bmi,appointment,closeSession} from '../../Controllers/navigation.jsx';
import {deleteUser} from '../../Services/ManageUsers/ManageUsers.jsx';
import ModalOption from '../../Components/ModalAcceptCancel/ModalOption';

export default function Appointment(){

    //comentario de prueba

    const Session = getCurrentSession();
    if(Session === null){
        window.location.href = "/";
    }

    const [modalOption,setModalOption] = useState(false);

    const titleNames = ["IMC"];
    const params = new URLSearchParams(window.location.search);
    const idUser = params.get("id");

    const showOptionModal = () =>{
        setModalOption(true);
    }

    const delUser =()=>{
        deleteUser(idUser);
        closeSession();
    }

    let redirect = [{text:"Imc",function: ()=>{bmi(idUser)}},{text:"Citas medicas",function: ()=>{appointment(idUser)}},{text:"Cerrar sesion",function:closeSession},{text:"Eliminar usuario",function:showOptionModal}];    

    const [modalCard,setModalCard] = useState(false);

    const [appointmentData,setAppointmentData] = useState([]);

    const [modalState,setModalState] = useState({
        profession:['',false],
        status:['',false],
        date:['',false],
        direction:['',true],
        description:['',true]
    });

    const [showModal,setShowModal] = useState({
        state: false,
        message: ''
    });

    const [dataChange,stateDataChange] = useState(false);
    const [cardId,stateCardId] = useState('');

    const handleAddButton = ()=>{
        setModalCard(true);
    }

    const handleQuitModal = ()=>{
        setModalCard(false);
    }

    useEffect(()=>{
        loadUserAppointmets(idUser).then(data=>{
            if(data.error){
                setShowModal((previous) =>{ return {
                    ...previous,
                    state: true,
                    message: 'Error al momento de obtener los datos del usuario'
                }
                });
            }else{
                setAppointmentData(data);
            }
        })
    },[dataChange,idUser])

    const changeAppointment = ()=>{
        stateDataChange((previous)=>{return !previous});
    }

    const deleteAppointment = (id)=>{
        deleteappointment(idUser,id).then(()=>{
            changeAppointment();
            stateCardId('');
        }).catch((error)=>{
            console.log(id);
            console.log(error);
            setShowModal((previous) =>{ return {
                ...previous,
                state: true,
                message: 'Error al momento de borrar la cita'
            }
            });
        })
    }

    const editAppoitnment = (id,profession,status,date,direction,description)=>{
        setModalState({
            profession:[profession,true],
            status:[status,true],
            date:[date,true],
            direction:[direction,true],
            description:[description,true]
        })
        stateCardId(id);
        setModalCard(true);
    }

    return (<React.Fragment>
        <Header titleText={titleNames} redirectText={redirect}/>
        <AppointmentList data={appointmentData} handleAddButton={handleAddButton}
        deleteAppointment={deleteAppointment} editAppointment={editAppoitnment}/>
        <CardModal save={changeAppointment} state={modalCard} modalState={modalState} setModalState={setModalState} userid={idUser} id={cardId} idCardState={stateCardId} handleQuit={handleQuitModal}/>
        <ModalOption message={'Eliminar el usuario'} description={'Esta seguro que quiere eliminar el usuario'}
        state={modalOption} accept={'Eliminar'} cancel={'Cancelar'} handleAccept={()=>{delUser()}} handleCancel={()=>{setModalOption(false)}}/>
        {createPortal(<Modal messageModal={showModal.message} state={showModal.state} handleModal={()=>{setShowModal({state: false,message: ''})}}/>,document.getElementById('modal'))}
        <Footer />
    </React.Fragment>)
}
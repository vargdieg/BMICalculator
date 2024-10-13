import React,{useState,useEffect} from 'react';
import { createPortal } from 'react-dom';
import Header from "../../Components/Header/Header.jsx";
import Footer from '../../Components/Footer/Footer.jsx';
import Modal from '../../Components/Modal/Modal.jsx';
import {getUserName} from '../../Services/ManageUsers/ManageUsers.jsx';
import Form from '../../Components/BmiForm/BmiForm.jsx';
import BmiTable from '../../Components/BmiTable/BmiTable.jsx';
import {loadUserData} from '../../Services/userbmidata/ManageUserData.jsx';
import './Bmi.css';
import {getCurrentSession} from '../../Services/ManageUsers/manageSessions.jsx';

import Histogram from '../../Components/BmiHistogram/Histogram.jsx';
import {bmi,appointment,closeSession} from '../../Controllers/navigation.jsx';
import {deleteUser} from '../../Services/ManageUsers/ManageUsers.jsx';
import ModalOption from '../../Components/ModalAcceptCancel/ModalOption';

export default function Bmi(){
    
    const params = new URLSearchParams(window.location.search);
    const idUser = params.get("id");    

    const [titleNames,setTitleNames] = useState(["IMC"]);
    const [modalOption,setModalOption] = useState(false);

    const showOptionModal = () =>{
        setModalOption(true);
    }

    const delUser =()=>{
        deleteUser(idUser);
        closeSession();
    }

    let redirect = [{text:"Imc",function: ()=>{bmi(idUser)}},{text:"Citas medicas",function: ()=>{appointment(idUser)}},{text:"Cerrar sesion",function:closeSession},{text:"Eliminar usuario",function:showOptionModal}];    

    const Session = getCurrentSession();
    if(Session === null){
        window.location.href = "/";
    }

    const [showModal,setShowModal] = useState({
        state: false,
        message: ''
    });

    const [dataChange,stateDataChange] = useState(false);

    
    const [bmiData,setBmiData] = useState([]);

    const loadBmiData = ()=>{
        stateDataChange((previous)=>{return !previous});
    }    
    
    useEffect(() => {
        getUserName(idUser).then(user=>{
            if(user.error){
                setShowModal((previous) =>{ return {
                    ...previous,
                    state: true,
                    message: 'No se pudo obtener el nombre de usuario'
                }
                });
            }else{
                let name = user.username === undefined ? "No identificado" : user.username;
                setTitleNames(["IMC","Hola "+name])
            }
        });
      },[idUser]);

    useEffect(()=>{
        loadUserData(idUser).then(data=>{
            if(data.error){
                setShowModal((previous) =>{ return {
                    ...previous,
                    state: true,
                    message: 'Error al momento de obtener los datos del usuario'
                }
                });
            }else{
                setBmiData(data);
            }
        })
    },[dataChange,idUser])

    return (<React.Fragment>
        {createPortal(<Modal messageModal={showModal.message} state={showModal.state} handleModal={()=>{setShowModal({state: false,message: ''})}}/>,document.getElementById('modal'))}
        <ModalOption message={'Eliminar el usuario'} description={'Esta seguro que quiere eliminar el usuario'}
        state={modalOption} accept={'Eliminar'} cancel={'Cancelar'} handleAccept={()=>{delUser()}} handleCancel={()=>{setModalOption(false)}}/>
        <Header titleText={titleNames} redirectText={redirect}/>
        <div className="body">
            <Form loadBmiData={loadBmiData}/>
            <BmiTable data={bmiData} deleteEntry={loadBmiData}/>
            <Histogram data={bmiData} />
        </div>
        <Footer />
    </React.Fragment>)
}
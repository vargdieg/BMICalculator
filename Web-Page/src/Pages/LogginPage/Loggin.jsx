import React,{useState} from 'react';
import { createPortal } from 'react-dom';
import Header from "../../Components/Header/Header.jsx";
import Form from "../../Components/Form/Form.jsx";
import Footer from '../../Components/Footer/Footer.jsx';
import ManageInputChangeLoggin from './LogginFormChange.jsx';
import '../../Components/Form/form.css';
import Modal from '../../Components/Modal/Modal.jsx';
import {validateLoggin} from '../../Services/ManageUsers/ManageUsers.jsx';
import {redirectHome,redirectRegister} from '../../Controllers/navigation.jsx';
import {getCurrentSession,saveSession} from '../../Services/ManageUsers/manageSessions.jsx';

export default function Loggin(){
    //Esto es un comentario
    let titleInput = ["Pagina IMC","Ingresar"];
    let redirect = [{text:"Home",function:redirectHome},{text:"Registro",function:redirectRegister}];

    const Session = getCurrentSession();
    if(Session !== null){
        window.location.href = "../imc?id="+Session;
    }

    const [showModal,setShowModal] = useState({
        state: false,
        message: ''
    });

    const [initialForm,setInitialForm] = useState({
        username: ["",false],
        password: ["",false]
    });

    const validFormEntries = (event)=>{
        return ManageInputChangeLoggin(event,setInitialForm);
    }

    const formlabel = [{labelText:'usuario',id:'username',inputType:'text',
        data:initialForm.username[0],validField: validFormEntries, requiredInput: true},
        {labelText:'contraseña',id:'password',inputType:'password',
        data:initialForm.password[0],validField: validFormEntries, requiredInput: true}]

    const handleFormButton = async (event) =>{
            event.preventDefault();
            if(initialForm.username[1] && initialForm.password[1]){
                validateLoggin(initialForm.username[0],initialForm.password[0]).then((user)=>{
                    saveSession(user);
                    window.location.href = "../imc?id="+user;
                }).catch(()=>{
                    setShowModal((previous) =>{ return {
                        ...previous,
                        state: true,
                        message: 'Usuario o contraseña incorrectos'
                    }
                    });
                });
                setInitialForm({
                    username: ["",false],
                    password: ["",false]
                });
            }else{
                setShowModal((previous) =>{ return {
                    ...previous,
                    state: true,
                    message: 'Faltan campos por diligenciar o estan mal diligenciados'
                }
                });
            }
        }

    return (<React.Fragment>
        <Header titleText={titleInput} redirectText={redirect}/>
        <div className='Body'>
            <Form height='500px' formlabel={formlabel} title="Buenas" subtitle="Para eso de acceder a su cuenta" 
            handleFormButton={handleFormButton} buttonText="Acceder"/>
        </div>
        {createPortal(<Modal messageModal={showModal.message} state={showModal.state} handleModal={()=>{setShowModal({state: false,message: ''})}}/>,document.getElementById('modal'))}
         <Footer/>
    </React.Fragment>)
}
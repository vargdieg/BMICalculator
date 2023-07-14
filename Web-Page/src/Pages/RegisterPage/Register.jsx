import React,{useState} from 'react';
import { createPortal } from 'react-dom';
import Header from "../../Components/Header/Header.jsx";
import Form from "../../Components/Form/Form.jsx";
import Footer from '../../Components/Footer/Footer.jsx'
import ManageInputChange from './FormChange.jsx';
import '../../Components/Form/form.css';
import {saveUser} from '../../Services/ManageUsers/ManageUsers.jsx';
import user from '../../Controllers/Classes/User.jsx';
import Modal from '../../Components/Modal/Modal.jsx';
import {redirectHome,redirectRegister} from '../../Controllers/navigation.jsx';

export default function Register(){
    let titleInput = ["Pagina IMC","Crear una cuenta"];
    let redirect = [{text:"Home",function:redirectHome},{text:"Registro",function:redirectRegister}];
    
    const [showModal,setShowModal] = useState({
        state: false,
        message: ''
    });

    const [initialForm,setInitialForm] = useState({
        username: ["",false],
        password: ["",false],
        passwordVerifier: ["",false],
        email: ["",false]
    });

    const validFormEntries = (event)=>{
        return ManageInputChange(event,setInitialForm);
    }

    const formlabel = [{labelText:'usuario',id:'username',inputType:'text',
        data:initialForm.username[0],validField: validFormEntries, requiredInput: true},
        {labelText:'contraseña',id:'password',inputType:'password',
        data:initialForm.password[0],validField: validFormEntries, requiredInput: true},
        {labelText:'contraseña',id:'passwordVerifier',inputType:'password',
        data:initialForm.passwordVerifier[0],validField: validFormEntries, requiredInput: true},
        {labelText:'email',id:'email',inputType:'email',
        data:initialForm.email[0],validField: validFormEntries, requiredInput: true}]

    const handleFormButton = (event) =>{
        event.preventDefault();
        if(initialForm.username[1] && initialForm.password[1] && 
            initialForm.passwordVerifier[1] && initialForm.email[1]){
            if(initialForm.password[0] === initialForm.passwordVerifier[0]){
                saveUser(new user(initialForm.username[0],initialForm.password[0],initialForm.email[0]));
                setInitialForm({
                    username: ["",false],
                    password: ["",false],
                    passwordVerifier: ["",false],
                    email: ["",false]
                });
                setShowModal((previous) =>{ return {
                    ...previous,
                    state: true,
                    message: 'Usuario Guardado Con Exito'
                }
                });
            }else{
                setShowModal((previous) =>{ return {
                    ...previous,
                    state: true,
                    message: 'Las contraseñas no concuerdan'
                }
                });
            }
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
            <Form height='650px' formlabel={formlabel} title="Buenas" subtitle="Para eso de crear una cuenta" 
            handleFormButton={handleFormButton} buttonText="Registrar"/>
            {createPortal(<Modal messageModal={showModal.message} state={showModal.state} handleModal={()=>{setShowModal({state: false,message: ''})}}/>,document.getElementById('modal'))}
        </div>
         <Footer/>
    </React.Fragment>)
}
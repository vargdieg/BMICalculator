import React from 'react';
import {errorMessages} from '../../Controllers/consts/ErrorMessages.jsx';
import './Modal.css';

export default function Modal({messageModal,state,handleModal}){
    let message = '';
    const index = errorMessages.indexOf(messageModal);
    (index === -1) ? message = 'Ocurrio un error procesando su solicitud' : message = errorMessages[index];
    if(state){
        return (<div className='modal' id='generatedModal'>
            <div className="modal-content">
                <i className="fa fa-window-close" aria-hidden="true" onClick={handleModal}></i>
                <p data-message>{message}</p>
            </div>
        </div>)
    }else{
        return <React.Fragment></React.Fragment>
    }
}
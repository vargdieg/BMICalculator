import React from 'react';
import './ModalOption.css';

export default function ModalOption({message,description,state,accept,cancel,handleAccept,handleCancel}){
    
    if(state){
        return (<div className='modal' id='optionModal'>
            <div className='card'>
            <div className="content">
                <span className="title">{message}</span>
                <div className="desc">{description}</div>
                    <div className="actions">
                        <button className="download" onClick={handleAccept}>{accept}</button>
                        <button className="notnow" onClick={handleCancel}>{cancel}</button>
                    </div>
                </div>
            </div>
        </div>)
    }else{
        return <React.Fragment></React.Fragment>
    }
}
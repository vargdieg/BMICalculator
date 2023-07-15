import React,{useState} from 'react';

export default function FormsInputs({labelText,id,inputType,data,validField,requiredInput}){
    const [message,stateMessage] = useState('');
    const [label,stateLabel] = useState(labelText);
    function validateFied(event){
        const message = validField(event);
        stateMessage(message);
        if(event._reactName === 'onBlur' && event.target.value !==''){
            stateLabel('');
        }
    }
    function showLabel(){
        stateLabel(labelText);
    }

    return (<div className="form__list__element">
        <input className="form__list__element__input" id={id} type={inputType} placeholder="" onChange={validateFied} onFocus={showLabel} onBlur={validateFied} value={data} required={requiredInput}/>
        <div className="cut"></div>
        <label className="form__list__element__label" htmlFor={id}>{label}</label>
        <p className="bad-input">{message}</p>
    </div>)
}
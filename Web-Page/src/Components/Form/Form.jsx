import React from 'react';
import FormsInputs from './FormInputs.jsx';

export default function Form({formlabel,title,subtitle,handleFormButton,buttonText,height}){
    return (<React.Fragment>
            <div className="form" style={{height: {height}}}>
                <div className="form__title">{title}</div>
                <div className="form__subtitle">{subtitle}</div>
                {formlabel.map((label,index)=>{return <FormsInputs key={index} labelText={label.labelText} id={label.id} 
                inputType={label.inputType} data={label.data}
                validField={label.validField} requiredInput={label.requiredInput}/>})}
                <button className="form__button" type="button" onClick={handleFormButton}>{buttonText}</button>
            </div>
    </React.Fragment>)
}
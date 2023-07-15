import React,{useState} from 'react';
import ManageBmiForm from './ManageBmiForm.jsx';
import {bmiData as bmiClass} from '../../Controllers/Classes/bmiData.jsx';
import {saveData} from '../../Services/userbmidata/ManageUserData.jsx';
import Modal from '../../Components/Modal/Modal.jsx';
import { createPortal } from 'react-dom';

export default function Form({loadBmiData}){
    const params = new URLSearchParams(window.location.search);
    const idUser = params.get("id");
    const [initialForm,setInitialForm] = useState({
        weight: ["",false],
        height: ["",false],
        waist: ["",false],
        dateOfEntry: ["",false]
    });

    const [showModal,setShowModal] = useState({
        state: false,
        message: ''
    });

    const validFormEntries = (event)=>{
        return ManageBmiForm(event,setInitialForm);
    }

    const bmiCalculator = (height,weight)=>{
        let bmi = (100*100*weight)/(height*height);
        return bmi;
    }

    const saveBmiData = (event)=>{
        event.preventDefault();
        let bmi = bmiCalculator(initialForm.height[0],initialForm.weight[0]);
        if(initialForm.weight[1] && initialForm.height[1] &&
            initialForm.dateOfEntry[1] && initialForm.waist[1]){
                saveData(new bmiClass(initialForm.weight[0],initialForm.height[0],
                    initialForm.dateOfEntry[0],bmi.toFixed(2),initialForm.waist[0]),idUser).then((data)=>{
                        if(data.error){
                            setShowModal((previous) =>{ return {
                                ...previous,
                                state: true,
                                message: 'Error al guardar los datos del usuario'
                            }
                            });
                        }else{
                            setInitialForm({
                                weight: ["",false],
                                height: ["",false],
                                waist: ["",false],
                                dateOfEntry: ["",false]
                            })
                            loadBmiData();
                        }
                    });
        }else{
            setShowModal((previous) =>{ return {
                ...previous,
                state: true,
                message: 'Valida los campos del IMC'
            }
            });
        }
    }

    const formValues = [{id:"weight",label:"peso (kg)",type:"number",pattern:"[0-8][0-9][0-9]",required:true,placeholder:"###",handleInputChange:validFormEntries,inputValue:initialForm.weight[0]},
                        {id:"Height",label:"estatura (cm)",type:"number",pattern:"[0-4][0-9][0-9]",required:true,placeholder:"###",handleInputChange:validFormEntries,inputValue:initialForm.height[0]},
                        {id:"waist",label:"cintura (cm)",type:"number",pattern:"[0-4][0-9][0-9]",required:true,placeholder:"###",handleInputChange:validFormEntries,inputValue:initialForm.waist[0]},
                        {id:"dateOfEntry",label:"fecha de entrada",type:"date",pattern:"",required:true,placeholder:"",handleInputChange:validFormEntries,inputValue:initialForm.dateOfEntry[0]}]

    return(<React.Fragment>
        <ul className="body__addentry">
            {formValues.map((formElement,index) => <FormElement id={formElement.id} label={formElement.label}
            type={formElement.type} pattern={formElement.pattern} required={formElement.required} 
            placeholder={formElement.placeholder} handleInputChange={formElement.handleInputChange} 
            inputValue={formElement.inputValue} key={index}/>)}
            <li className="body__addentry__element">
                <button className="body__addentry__button" type="submit" onClick={saveBmiData}>Add</button>
            </li>
        </ul>
        {createPortal(<Modal messageModal={showModal.message} state={showModal.state} handleModal={()=>{setShowModal({state: false,message: ''})}}/>,document.getElementById('modal'))}
    </React.Fragment>)
}

function FormElement({id,label,type,pattern,required,placeholder,handleInputChange,inputValue}){
    return (<li className="body__addentry__element">
        <label className="body__addentry__element__label" htmlFor={id}>{label}</label>
        <input className="body__addentry__element__input" id={id} type={type} required={required} pattern={pattern} 
        onChange={handleInputChange} value={inputValue} placeholder={placeholder}/>
    </li>)
}
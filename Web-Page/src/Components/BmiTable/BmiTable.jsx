import React,{useState} from "react";
import {deleteDataEntry} from '../../Services/userbmidata/ManageUserData.jsx';
import Modal from '../../Components/Modal/Modal.jsx';
import { createPortal } from 'react-dom';

export default function BmiTable({data,deleteEntry}){
    const params = new URLSearchParams(window.location.search);
    const idUser = params.get("id");

    const [showModal,setShowModal] = useState({
        state: false,
        message: ''
    });

    const deleteBmiEntry = (event)=>{
        deleteDataEntry(idUser,event.target.id).then(()=>{
            deleteEntry();
        }).catch(()=>{
            setShowModal({
                state: true,
                message: 'Hubo un error mamada'
            })
        });
    }

    return (<section className="body__table">
        {createPortal(<Modal messageModal={showModal.message} state={showModal.state} handleModal={()=>{setShowModal({state: false,message: ''})}}/>,document.getElementById('modal'))}
        <table className="body__table_content">
            <thead>
                <tr className='body__table_content__header'>
                    <th className='body__table_content__headers'>Fecha</th>
                    <th className='body__table_content__headers'>Peso</th>
                    <th className='body__table_content__headers'>Estatura</th>
                    <th className='body__table_content__headers'>IMC</th>
                    <th className='body__table_content__headers'>Cintura</th>
                    <th className='body__table_content__headers'>Borrar</th>
                </tr>
            </thead>
            <tbody>
                {data.map((entry,index)=>{return <BmiRow date={entry.date} weight={entry.weight} height={entry.height} 
                bmi={entry.bmi} waist={entry.waist} id={entry.id} deleteEntry={deleteBmiEntry} key={index}/>})}
            </tbody>
        </table>
    </section>)
}

function BmiRow({date,weight,height,bmi,waist,id,deleteEntry}){
    return(<React.Fragment>
        <tr className="body__table_content__elements">
            <td className="body__table_content__elements">{date}</td>
            <td className="body__table_content__elements">{weight}</td>
            <td className="body__table_content__elements">{height}</td>
            <td className="body__table_content__elements">{bmi}</td>
            <td className="body__table_content__elements">{waist}</td>
            <td className="fa fa-trash-o body__table_content__erase" id={id} onClick={deleteEntry}></td>
        </tr>
        </React.Fragment>)
}
import {validateInputs} from '../../Controllers/ValidateInputForms/ValidateInputForm.jsx';

const ManageCardModalForm = (event,setInitialForm) =>{
    let id = event.target.id;
    let target = event.target;
    let input = event.target.value;
    let message = '';
    let validInput = false;
    switch(id){
        case 'professionselection':
            message = validateInputs([target],['profesion']);
            (message === '') ? validInput = true: validInput = false
            setInitialForm((previousValue)=>{return {
                 ...previousValue,
                 profession: [input,validInput]
             }})
            return message;
        case 'statusselection':
            message = validateInputs([target],['status']);
            (message === '') ? validInput = true: validInput = false
            setInitialForm((previousValue)=>{return {
                ...previousValue,
                status: [input,validInput]
            }})
            return message;
        case 'dateOfEntry':
            message = validateInputs([target],['fecha']);
            (message === '') ? validInput = true: validInput = false
            setInitialForm((previousValue)=>{return {
                ...previousValue,
                date: [input,validInput]
            }})
            return message;
        default:
            return 'Eso es un campo que esta mas alla del bien y el mal'
    }
}

export default ManageCardModalForm;
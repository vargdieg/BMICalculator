import {validateInputs} from '../../Controllers/ValidateInputForms/ValidateInputForm.jsx';

const ManageMessageInput = (event,setInitialForm) =>{
    let id = event.target.id;
    let target = event.target;
    let input = event.target.value;
    let message = '';
    let validInput = false;
    switch(id){
        case 'opinionUser':
            message = validateInputs([target],['usuario']);
            (message === '') ? validInput = true: validInput = false
            setInitialForm((previousValue)=>{return {
                ...previousValue,
                user: [input,validInput]
            }})
            return message;
        case 'opinionMessage':
            message = validateInputs([target],['mensaje']);
            (message === '') ? validInput = true: validInput = false
            setInitialForm((previousValue)=>{return {
                ...previousValue,
                usermessage: [input,validInput]
            }})
            return message;
        default:
            return 'Eso es un campo que esta mas alla del bien y el mal'
    }
}

export default ManageMessageInput;
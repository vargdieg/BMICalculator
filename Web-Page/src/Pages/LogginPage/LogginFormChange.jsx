import {validateInputs} from '../../Controllers/ValidateInputForms/ValidateInputForm.jsx';

const ManageInputChangeLoggin = (event,setInitialForm) =>{
    let id = event.target.id;
    let target = event.target;
    let input = event.target.value;
    let message = '';
    let validInput = false;
    switch(id){
        case 'username':
            message = validateInputs([target],['usuario']);
            (message === '') ? validInput = true: validInput = false
            setInitialForm((previousValue)=>{return {
                ...previousValue,
                username: [input,validInput]
            }})
            return message;
        case 'password':
            message = validateInputs([target],['contraseña']);
            (message === '') ? validInput = true: validInput = false
            setInitialForm((previousValue)=>{return {
                ...previousValue,
                password: [input,validInput]
            }})
            return message;
        default:
            return 'Eso es un campo que esta mas alla del bien y el mal'
    }
}

export default ManageInputChangeLoggin;
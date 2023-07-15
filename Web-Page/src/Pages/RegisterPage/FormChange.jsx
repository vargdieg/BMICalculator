import {validateRegex,validateInputs} from '../../Controllers/ValidateInputForms/ValidateInputForm.jsx';

const ManageInputChange = (event,setInitialForm) =>{
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
            message = validateRegex(input,['oneUpper','oneLowerCase','specialCharacter']);
            if(message === ''){
                message = validateInputs([target],['contraseña']);
            }
            (message === '') ? validInput = true: validInput = false
            setInitialForm((previousValue)=>{return {
                ...previousValue,
                password: [input,validInput]
            }})
            return message;
        case 'passwordVerifier':
            message = validateInputs([target],['validacion contraseña']);
            (message === '') ? validInput = true: validInput = false
            setInitialForm((previousValue)=>{return {
                ...previousValue,
                passwordVerifier: [input,validInput]
            }})
            return message;
        case 'email':
            message = validateInputs([target],['email']);
            (message === '') ? validInput = true: validInput = false
            setInitialForm((previousValue)=>{return {
                ...previousValue,
                email: [input,validInput]
            }})
            return message;
        default:
            return 'Eso es un campo que esta mas alla del bien y el mal'
    }
}

export default ManageInputChange;
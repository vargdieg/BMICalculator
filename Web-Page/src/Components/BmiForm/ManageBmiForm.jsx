import {validateInputs} from '../../Controllers/ValidateInputForms/ValidateInputForm.jsx';

const ManageBmiForm = (event,setInitialForm) =>{
    let id = event.target.id;
    let target = event.target;
    let input = event.target.value;
    let message = '';
    let validInput = false;
    switch(id){
        case 'weight':
            message = validateInputs([target],['peso']);
            (message === '') ? validInput = true: validInput = false
            setInitialForm((previousValue)=>{return {
                 ...previousValue,
                 weight: [input,validInput]
             }})
            return message;
        case 'Height':
            message = validateInputs([target],['altura']);
            (message === '') ? validInput = true: validInput = false
            setInitialForm((previousValue)=>{return {
                ...previousValue,
                height: [input,validInput]
            }})
            return message;
        case 'waist':
            message = validateInputs([target],['cintura']);
            (message === '') ? validInput = true: validInput = false
            setInitialForm((previousValue)=>{return {
                ...previousValue,
                waist: [input,validInput]
            }})
            return message;
        case 'dateOfEntry':
            message = validateInputs([target],['fecha de entrada']);
            (message === '') ? validInput = true: validInput = false
            setInitialForm((previousValue)=>{return {
                ...previousValue,
                dateOfEntry: [input,validInput]
            }})
            return message;
        default:
            return 'Eso es un campo que esta mas alla del bien y el mal'
    }
}

export default ManageBmiForm;
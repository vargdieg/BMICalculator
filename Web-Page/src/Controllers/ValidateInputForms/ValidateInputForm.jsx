export function validateInputs (fieldstoValidate,fieldNames) {
    let reason = "";
    for(let i = 0;i<fieldstoValidate.length;i++){
        reason = validateInput(fieldstoValidate[i]);
        if(reason !== ''){
            switch(reason){
                case "bad input":
                    reason = "El campo "+fieldNames[i]+" no es valido";
                    break;
                case "patternMismatch":
                    reason = "El campo "+fieldNames[i]+" no tiene el formato correcto";
                    break;
                case "rangeOverflow":
                    reason = "El campo "+fieldNames[i]+" no tiene el formato correcto";
                    break;
                case "rangeUnderflow":
                    reason = "El campo "+fieldNames[i]+" no tiene el formato correcto";
                    break;
                case "typeMismatch":
                    reason = "El campo "+fieldNames[i]+" es invalido";
                    break;
                case "valueMissing":
                    reason = "El campo "+fieldNames[i]+" esta vacio";
                    break;
                case "invalid":
                    reason = "El campo "+fieldNames[i]+" es invalido";
                    break;
                default:
                    reason = "There was an error trying to validate the form please try again";
                    break;
            }
            return reason;
        }
    }
    return reason;
}

function validateInput(input){
    if(input.validity.badInput){
        return "bad input";
    }
    if(input.validity.patternMismatch){
        return "patternMismatch";
    }
    if(input.validity.rangeOverflow){
        return "rangeOverflow";
    }
    if(input.validity.rangeUnderflow){
        return "rangeUnderflow";
    }
    if(input.validity.typeMismatch){
        return "typeMismatch";
    }
    if(input.validity.valueMissing){
        return "valueMissing";
    }
    if(!input.validity.valid){
        return "invalid";
    }
    return "";
}

export function validateInputEnum(searchValue , fieldName, possibleEntries){
    let index = possibleEntries.indexOf(searchValue);
    if(index === -1){
        return "El campo "+fieldName+" no es valido"
    }
    return ""
}

export function validateRegex(inputString,regexPattern){
    for(let i = 0;i<regexPattern.length;i++){
        let regexinputPattern = regexPattern[i];
        let regex = new RegExp('[A-Z]');
        switch(regexinputPattern){
            case 'oneUpper':
                regex = /[A-Z]/;
                if(! regex.test(inputString)){return 'el campo debe tener un caracter en mayuscula'};
                break;
            case 'oneLowerCase':
                regex = /[a-z]/;
                if(! regex.test(inputString)){return 'el campo debe tener un caracter en minuscula'};
                break;
            case 'specialCharacter':
                regex = /(?=[@$!%*#?&])/
                if(! regex.test(inputString)){return 'el campo debe tener un caracter de tipo especial'};
                break;
            default:
                return 'Ha ocurrido un error mas alla del bien y el mal';
        }
    }
    return '';
}
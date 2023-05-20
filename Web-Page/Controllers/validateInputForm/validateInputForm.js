export function validateInputs (fieldstoValidate,fieldNames) {
    let validate = true;
    let reason = "";
    for(let i = 0;i<fieldstoValidate.length;i++){
        
        [validate,reason] = validateInput(fieldstoValidate[i]);
        if(!validate){
            switch(reason){
                case "bad input":
                    reason = "The field "+fieldNames[i]+" has not supported characters";
                    break;
                case "patternMismatch":
                    reason = "The field "+fieldNames[i]+" does not satisfies the pattern";
                    break;
                case "rangeOverflow":
                    reason = "The field "+fieldNames[i]+" has more characters than required";
                    break;
                case "rangeUnderflow":
                    reason = "The field "+fieldNames[i]+" has less characters than required";
                    break;
                case "typeMismatch":
                    reason = "The field "+fieldNames[i]+" is not of the right type";
                    break;
                case "valueMissing":
                    reason = "The field "+fieldNames[i]+" is empty";
                    break;
                case "invalid":
                    reason = "The field "+fieldNames[i]+" is not valid";
                    break;
                default:
                    reason = "There was an error trying to validate the form please try again";
                    break;
            }
            return [validate,reason];
        }
    }
    return [validate,reason];
}

function validateInput(input){
    if(input.validity.badInput){
        return [false,"bad input"];
    }
    if(input.validity.patternMismatch){
        return [false,"patternMismatch"];
    }
    if(input.validity.rangeOverflow){
        return [false,"rangeOverflow"];
    }
    if(input.validity.rangeUnderflow){
        return [false,"rangeUnderflow"];
    }
    if(input.validity.typeMismatch){
        return [false,"typeMismatch"];
    }
    if(input.validity.valueMissing){
        return [false,"valueMissing"];
    }
    if(!input.validity.valid){
        return [false,"invalid"];
    }
    return [true,""];
}
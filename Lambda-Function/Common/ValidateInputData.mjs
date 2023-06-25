import {HandlerClientError} from "./handlerException.mjs";
/**
 * 
 * @param {The value of the entry which is going to be inputted} entry 
 * @param {The name of the field} entryName 
 * @param {The type of data} dataType 
 * @param {In case the datatype is a date, it is needed to specify between 'DD/MM/YYYY' or 'DD-MM-YYYY'} format 
 * @returns 
 */
export function validateEntry(entry,entryName,dataType,format){
    if(entry == null || entry == ""){
      return HandlerClientError("BAD_REQUEST","The field "+entryName+" is empty","Could no process the petition","400");
    }
    switch (dataType){
      case 'String':
        if(!(typeof entry === "string"))
        return HandlerClientError("BAD_REQUEST","The field "+entryName+" has not the valid data type","Could no process the petition","400");
          return true;
      case 'Integer':
        if(!(typeof entry === "number"))
        return HandlerClientError("BAD_REQUEST","The field "+entryName+" has not the valid data type","Could no process the petition","400");
          return true;
      case 'Date':
        switch(format){
          case('DD/MM/YYYY'):
            return valDate(entry,/^(0?[1-9]|[1-2][0-9]|3[01])[\/](0?[1-9]|1[0-2])/,'/') ? true: HandlerClientError("BAD_REQUEST","The field "+entryName+" has not the valid data type","Could no process the petition","400");
          case('DD-MM-YYYY'):
            return valDate(entry,/^(0?[1-9]|[1-2][0-9]|3[01])[\-](0?[1-9]|1[0-2])/,'-') ? true: HandlerClientError("BAD_REQUEST","The field "+entryName+" has not the valid data type","Could no process the petition","400");
          default:
            return HandlerClientError("BAD_REQUEST","The format is not valid","Could no process the petition","400");
        }
      default:
        return HandlerClientError("BAD_REQUEST","The dataType specified is not valid","Could no process the petition","400");
    }
  }

function valDate(date,dateformat,separator) {
    // Matching the date through regular expression      
    if (date.match(dateformat)) {
        let operator = date.split(separator);

        // Extract the string into month, date and year      
        let datepart = [];
        if (operator.length > 1) {
            datepart = date.split(separator);
        }
        let day = parseInt(datepart[0]);
        let month = parseInt(datepart[1]);
        let year = parseInt(datepart[2]);

        // Create a list of days of a month      
        let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (month == 1 || month > 2) {
            if (day > ListofDays[month - 1]) {
                //to check if the date is out of range 
                return false;
            }
        } else if (month == 2) {
            let leapYear = false;
            if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
            if ((leapYear == false) && (day >= 29)) {
                return false;
            }
            else
                if ((leapYear == true) && (day > 29)) {
                    return false;
                }
        }
    } else {
        return false;
    }
    return true;
}

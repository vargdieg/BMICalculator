import { DynamoDBClient, GetItemCommand,UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import {validateEntry} from "./ValidateInputData.mjs";
import {handlingError} from "./handlerException.mjs";
import moment from "moment/moment.js";

/**
 * 
 * @param {Region in which the customer appointment list is deployed} region 
 * @param {the uuid of the customer} customerIdentification 
 * @returns Return the appointment data
 */
export async function GetUserAppointments(region,customerIdentification){
    return new Promise(async(resolve,reject)=>{
      if(validateEntry(customerIdentification,'Customer Identification','String').error){return resolve(validateEntry(customerIdentification,'Customer Identification','String'));}
    
      const client = new DynamoDBClient({ region: region});
          
      var params = {
        TableName: 'CUSTOMER_APPOINTMENT_LIST',
        Key: {
          'CUSTOMER_IDENTIFICATION': {S:customerIdentification},
        }
      };
          
      const command = new GetItemCommand(params);
        try {
          const response = await client.send(command);
          let CustomerData = [];
          response.Item.CUSTOMER_APPOINTMENT.L.forEach(element => {
            let dataObject = {
              profession: element.M.profession.S,
              date: element.M.date.S,
              time: element.M.time.S,
              status: element.M.status.S,
              direction: element.M.direction.S,
              description: element.M.description.S,
              identifier: element.M.identifier.S,
            };
            CustomerData.push(dataObject);
          });
          return resolve(CustomerData);
        }catch(error){
          return resolve(handlingError(error));
        }
    })
  }

  export async function PutUserAppointments(region,customerIdentification,data){
    const client = new DynamoDBClient({ region: region});
    
    var params = {
        ExpressionAttributeNames: {
         "#LD": "CUSTOMER_APPOINTMENT"
        }, 
        ExpressionAttributeValues: {
         ":d": {
           L: data
          }
        }, 
        Key: {
            'CUSTOMER_IDENTIFICATION': {S:customerIdentification},
        }, 
        ReturnValues: "ALL_NEW", 
        TableName: "CUSTOMER_APPOINTMENT_LIST", 
        UpdateExpression: "SET #LD = :d"
       };
  
       const command = new UpdateItemCommand(params);
       try {
         const response = await client.send(command);
         let responseMessage = {
           "Code": response.$metadata.httpStatusCode
         }
         return responseMessage;
       }catch(error){
         return handlingError(error);
       }
  }

/**
 * 
 * @param {Array containing the appointment data of an user} appointment 
 * @returns the array sort using first the state of the appointment, then the date and last the profession
 */
export function OrderData(appointment){
    appointment.sort(function(a,b){
        const firstDate = moment(a.date, 'YYYY-MM-DD');
        const secondDate = moment(b.date, 'YYYY-MM-DD');
        const firstHour = moment(a.time,'hh:mm');
        const SecondHour = moment(b.time,'hh:mm');
        return a.status.localeCompare(b.status) || firstDate - secondDate || firstHour - SecondHour ||
        a.profession.localeCompare(b.profession);
      });
    return appointment;
}

/**
* 
* @param {Object containing the appointment data registry} appointmentObject 
* @returns the object adding the fields necessary to put the data on a dynamo table
*/
function createDataObject({profession,date,time,status,direction,description,identifier}){
    let object ={ 
      M : {
      profession: {S:profession},
      date: {S:date},
      time: {S:time},
      status: {S:status},
      direction: {S:direction},
      description: {S:description},
      identifier: {S:identifier},
    }
  }
    return object;
  }

/**
 * 
 * @param {Array containing the appointment data of an user} array 
 * @returns Array of the bmi data of the user, adding the fields necessary to put the data on a dynamo table
 */
export function createDataArray(array){
      let CustomerData = [];
      array.forEach(element => {
          CustomerData.push(createDataObject(element));
        });
      return CustomerData;
  }
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import {validateEntry} from "./ValidateInputData.mjs";
import {handlingError,HandlerClientError} from "./handlerException.mjs";
import moment from "moment/moment.js";

/**
 * 
 * @param {Region in which the customer data list is deployed} region 
 * @param {uuid of the user} customerIdentification 
 * @returns return the data in json object or return an json object if error encountered
 */
export async function GetUserData(region,customerIdentification){
    return new Promise(async(resolve,reject)=>{
      if(validateEntry(customerIdentification,'customerIdentification','String').error){return resolve(validateEntry(customerIdentification,'customerIdentification','String'))};
    
      const client = new DynamoDBClient({ region: region});
          
      var params = {
        TableName: 'CUSTOMER_DATA_LIST',
        Key: {
          'CUSTOMER_IDENTIFICATION': {S:customerIdentification},
        }
      };
          
      const command = new GetItemCommand(params);
        try {
          const response = await client.send(command);
          if(response.Item == undefined){
            return resolve(HandlerClientError("NOT_FOUND","the username could not be found","Error while processing the request","404"));
          }
          let CustomerData = [];
          response.Item.CUSTOMER_DATA.L.forEach(element => {
            let dataObject = {
              date: element.M.date.S,
              weight: element.M.weight.N,
              id: element.M.id.S,
              height: element.M.height.N,
              bmi: element.M.bmi.N,
              waist: element.M.waist.N
            };
            CustomerData.push(dataObject);
          });
          return resolve(CustomerData);
        }catch(error){
          return resolve(handlingError(error));
        }
    })
  }

/**
 * 
 * @param {Array containing the bmi data of an user} datos 
 * @returns the array sort using the date of the registries
 */
export function orderData(datos){
  datos.sort(function(a,b){
      const firstDate = moment(a.date, 'DD/MM/YYYY');
      const secondDate = moment(b.date, 'DD/MM/YYYY');
      return firstDate - secondDate;
    });
  return datos;
}

/**
* 
* @param {Object containing the bmi data registry} bmiObject 
* @returns the object adding the fields necessary to put the data on a dynamo table
*/
export function createDataObject({weight,height,date,bmi,id,waist}){
  let object ={ 
    M : {
    weight: {N:""+weight},
    height: {N:""+height},
    date: {S:""+date},
    bmi: {N:""+bmi},
    id: {S:""+id},
    waist: {N: ""+waist}
  }
}
  return object;
}

/**
 * 
 * @param {Array containing the bmi data of an user} array 
 * @returns Array of the bmi data of the user, adding the fields necessary to put the data on a dynamo table
 */
 export function createDataArray(array){
    let CustomerData = [];
    array.forEach(element => {
        CustomerData.push(createDataObject(element));
      });
    return CustomerData;
}
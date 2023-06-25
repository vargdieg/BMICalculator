import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import {handlingError,validResponse} from "/opt/handlerException.mjs";
import { validateEntry } from "/opt/ValidateInputData.mjs";

/**
 * 
 * @param {Region in which the tables Customer data, Customer list and Customer appointments are deployed} region 
 * @param {uuid belonging to the user} CustomerId 
 * @returns Return an json object indicating if the user could be deleted of the 3 tables or an error ocurred
 */
export async function DeleteUser(region,CustomerId){
  return new Promise(async (resolve,reject)=>{
    if(validateEntry(CustomerId,'customer id','String').error){return resolve(validateEntry(CustomerId,'customer id','String'))}
    
        Promise.all([DeleteUserTableUsers(region,CustomerId),DeleteUserTableData(region,CustomerId),DeleteUserTableAppointment(region,CustomerId)]).then(()=>{
          return resolve(validResponse("OK","200","User deleted suscessfully"));
        }).catch(error=>{return resolve(error)})
      });
}

/**
 * 
 * @param {Region in which the table Customer list is deployed} region 
 * @param {uuid belonging to the user} CustomerId 
 * @returns returned json object if ocurred an error with reason, if susccess is returned an ok json
 */
async function DeleteUserTableUsers(region,CustomerId){
  return new Promise(async (resolve,reject)=>{
    const client = new DynamoDBClient({ region: region});
  
    var params = {
        TableName: 'CUSTOMER_LIST',
        Key: {
            'CUSTOMER_IDENTIFICATION': {S:CustomerId},
        }
      };
  
      const command = new DeleteItemCommand(params);
  
      try {
        const response = await client.send(command);
        let responseMessage = {
          "Code": response.$metadata.httpStatusCode
        }
        return resolve(responseMessage);
      }catch(error){
        return reject(handlingError(error))
      }
  })
}

/**
 * 
 * @param {Region in which the table Customer data is deployed} region 
 * @param {uuid belonging to the user} CustomerId 
 * @returns returned json object if ocurred an error with reason, if susccess is returned an ok json
 */
async function DeleteUserTableData(region,CustomerId){
  return new Promise(async (resolve,reject)=>{
    const client = new DynamoDBClient({ region: region});
  
    var params = {
        TableName: 'CUSTOMER_DATA_LIST',
        Key: {
            'CUSTOMER_IDENTIFICATION': {S:CustomerId},
        }
      };
  
      const command = new DeleteItemCommand(params);
  
      try {
        const response = await client.send(command);
        let responseMessage = {
          "Code": response.$metadata.httpStatusCode
        }
        return resolve(responseMessage);
      }catch(error){
        return reject(handlingError(error))
      }
  });
}

/**
 * 
 * @param {Region in which the table Customer data is deployed} region 
 * @param {uuid belonging to the user} CustomerId 
 * @returns returned json object if ocurred an error with reason, if susccess is returned an ok json
 */
async function DeleteUserTableAppointment(region,CustomerId){
  return new Promise(async (resolve,reject)=>{
    const client = new DynamoDBClient({ region: region});
    var params = {
        TableName: 'CUSTOMER_APPOINTMENT_LIST',
        Key: {
            'CUSTOMER_IDENTIFICATION': {S:CustomerId},
        }
      };
  
      const command = new DeleteItemCommand(params);
  
      try {
        const response = await client.send(command);
        let responseMessage = {
          "Code": response.$metadata.httpStatusCode
        }
        return resolve(responseMessage);
      }catch(error){
        return reject(handlingError(error))
      }
  });
}
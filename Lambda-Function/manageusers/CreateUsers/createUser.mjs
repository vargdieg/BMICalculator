import {handlingError,HandlerClientError,validResponse} from "/opt/handlerException.mjs";
import {validateEntry} from "/opt/ValidateInputData.mjs";
import { DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";

export async function CreateUser(region,customerName,customerPassword,customerEmail,customerIdentification){
    return new Promise(async (resolve,reject)=>{
      if(validateEntry(customerName,'username','String').error){return resolve(validateEntry(customerName,'username','String'))};
      if(validateEntry(customerPassword,'password','String').error){return resolve(validateEntry(customerPassword,'password','String'))};
      if(validateEntry(customerEmail,'email','String').error){return resolve(validateEntry(customerEmail,'email','String'))};
      if(validateEntry(customerIdentification,'identification','String').error){return resolve(validateEntry(customerIdentification,'identification','String'))};
      
        Promise.all([validateUser(region,"CUSTOMER_NAME",customerName,"username"),validateUser(region,"CUSTOMER_EMAIL",customerEmail,"mail")])
        .then(()=>{
            Promise.all([createUserTableUser(region,customerName,customerPassword,customerEmail,customerIdentification),createUserTableAppointment(region,customerIdentification),createUserTableData(region,customerIdentification)])
              .then(()=>{
                return resolve(validResponse("OK","200","User created suscessfully"));
              }).catch((err)=>{
                return resolve(err);
            })
        }).catch((err)=>{
          return resolve(err);
        });
    })
}
/**
 * 
 * @param {Region in wich the customer appoitnment list table is deployed} region 
 * @param {The uuid identifier wich is used to store the user} customerIdentification 
 * @returns returns an true object if the user could be created, otherwise return a json object indicating the error
 */
async function createUserTableData(region,customerIdentification){
  return new Promise(async (resolve,reject)=>{
    const client = new DynamoDBClient({ region: region});
    var params = {
      TableName: 'CUSTOMER_DATA_LIST',
      Item: {
        'CUSTOMER_IDENTIFICATION': {S:customerIdentification},
        'CUSTOMER_DATA': {L:[]}
      }
    };
    
    const command = new PutItemCommand(params);
  
    try {
      const response = await client.send(command);
      let responseMessage = {
        "Code": response.$metadata.httpStatusCode
      }
      return resolve(responseMessage);
    }catch(error){
      return reject(handlingError(error));
    }
  });
  
}
/**
 * 
 * @param {Region in wich the customer appoitnment list table is deployed} region 
 * @param {The uuid identifier wich is used to store the user} customerIdentification 
 * @returns returns an true object if the user could be created, otherwise return a json object indicating the error
 */
async function createUserTableAppointment(region,customerIdentification){
  return new Promise(async (resolve,reject)=>{
    const client = new DynamoDBClient({ region: region});
    var params = {
    TableName: 'CUSTOMER_APPOINTMENT_LIST',
    Item: {
      'CUSTOMER_IDENTIFICATION': {S:customerIdentification},
      'CUSTOMER_APPOINTMENT': {L:[]}
    }
  };
  
  const command = new PutItemCommand(params);
  
  try {
    const response = await client.send(command);
    let responseMessage = {
      "Code": response.$metadata.httpStatusCode
    }
    return resolve(responseMessage);
  }catch(error){
    return reject(handlingError(error));
  }
  })
}
/**
 * 
 * @param {Region in wich the customer list table is deployed} region 
 * @param {The username to be stored} customerName 
 * @param {The password of the account created by the user} customerPassword 
 * @param {The user email} customerEmail 
 * @param {The uuid identifier wich is used to store the user} customerIdentification 
 * @returns returns an true object if the user could be created, otherwise return a json object indicating the error
 */
async function createUserTableUser(region,customerName,customerPassword,customerEmail,customerIdentification){
  return new Promise(async (resolve,reject)=>{
    const client = new DynamoDBClient({ region: region});
    var params = {
        TableName: 'CUSTOMER_LIST',
        Item: {
          'CUSTOMER_NAME' : {S: customerName},
          'CUSTOMER_PASSWORD' : {S: customerPassword},
          'CUSTOMER_EMAIL': {S:customerEmail},
          'CUSTOMER_IDENTIFICATION': {S:customerIdentification}
        }
      };
      
      const command = new PutItemCommand(params);
    
      try {
        const response = await client.send(command);
        let responseMessage = {
          "Code": response.$metadata.httpStatusCode
        }
        return resolve(responseMessage);
      }catch(error){
        return reject(handlingError(error));
      }
  })
}

/**
 * 
 * @param {Region in wich the customer list is deployed} region 
 * @param {The name of the attibute on the table} attrName 
 * @param {The value to check the attribute} attrValue 
 * @returns return true if the attribute is not in the table, otherwise return a json object indicating the error
 */
async function validateUser(region,attrName,attrValue,fieldname){
  return new Promise(async (resolve,reject)=>{
    const client = new DynamoDBClient({ region: region});
    var params = {
      TableName: 'CUSTOMER_LIST',
      ProjectionExpression: "CUSTOMER_NAME, CUSTOMER_EMAIL, CUSTOMER_IDENTIFICATION",
      ExpressionAttributeNames: {
          "#AN": attrName,
        },
        ExpressionAttributeValues: {
          ':AV':{S: attrValue}
        },
      FilterExpression: "#AN = :AV"
    };

  const command = new ScanCommand (params);
  const response = await client.send(command);
  if(response.Items.length >= 1){
    return reject(HandlerClientError('CONFLICT','The '+fieldname+' is already taken','The '+fieldname+' is already taken','409'));
  }else{
    return resolve(true);
  }
  });
}
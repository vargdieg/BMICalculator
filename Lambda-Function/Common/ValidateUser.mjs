import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import {HandlerClientError,defaultError} from "./handlerException.mjs";

/**
 * 
 * @param {Region in wich the Customer_List table is deployed} region @type {string}
 * @param {The uuid identifier of the user to be checked in the table} customerIdentification @type {string} 
 * @returns return an value true boolean in case the operation is done suscessfully, in case an error, it is returned in json format
 */

export async function validateUser(region,customerIdentification){

  const client = new DynamoDBClient({ region: region});
  
  var params = {
    TableName: 'CUSTOMER_LIST',
    Key: {
      'CUSTOMER_IDENTIFICATION': {S:customerIdentification},
    }
  };
  
  const command = new GetItemCommand(params);
    try {
      const response = await client.send(command);
      if(response.Item == undefined){
        return HandlerClientError("NOT_FOUND","The client was not found","Encounter error while processing your request",404);
      }else{
        return true;
      }
    }catch(error){
      return defaultError();
    }
}
import {DynamoDBClient, DeleteItemCommand,GetItemCommand } from "@aws-sdk/client-dynamodb";
import {validateEntry} from "/opt/ValidateInputData.mjs";
import {handlingError,HandlerClientError,validResponse,validDataResponse} from "/opt/handlerException.mjs";

/**
 * 
 * @param {Region in which the customer opinion list is deployed} region 
 * @param {uuid of the opinion to be deleted} OpinionId 
 * @returns 
 */
export async function DeleteOpinion(region,OpinionId){
    return new Promise(async(resolve,reject)=>{
      if(validateEntry(OpinionId,'OpinionId','String').error){return resolve(validateEntry(OpinionId,'OpinionId','String'));}
  
      const response = await GetOpinion(region,OpinionId);

      if(response.error){return resolve(response)}

      const client = new DynamoDBClient({ region: region});
          
      var params = {
          TableName: 'CUSTOMER_OPINION_LIST',
          Key: {
              'MESSAGE_IDENTIFIER': {S:""+OpinionId},
          }
        };
        
        const command = new DeleteItemCommand(params);
        
        try {
          const response = await client.send(command);
          let responseMessage = {
            "Code": response.$metadata.httpStatusCode
          }
          return resolve(validResponse("Ok","200","Opinion deleted susccessfully"));
        }catch(error){
          return resolve(handlingError(error));
        }
    })
  }

/**
 * 
 * @param {Region in which the customer opinion list is deployed} region 
 * @param {uuid of the opinion to search and retrieve} id 
 * @returns return json object with the message data or the error
 */
export async function GetOpinion(region,id){
    new Promise(async (resolve,reject)=>{
      if(validateEntry(id,'OpinionId','String').error){return resolve(validateEntry(id,'OpinionId','String'))}
      const client = new DynamoDBClient({ region: region});

      var params = {
        TableName: 'CUSTOMER_OPINION_LIST',
        Key: {
          'MESSAGE_IDENTIFIER': {S:""+id}
        }
      };
      const command = new GetItemCommand(params);
      try {
        const response = await client.send(command);
        if(response.Item == undefined){
          return resolve(HandlerClientError("NOT_FOUND","The message was not found on the table","The opinion was not found","404"));
        }else{
        let dataMessage = {
          "CUSTOMER_OPINION": response.Item.CUSTOMER_OPINION.S,
          "CUSTOMER_NAME": response.Item.CUSTOMER_NAME.S,
          "MESSAGE_IDENTIFIER": response.Item.MESSAGE_IDENTIFIER.S
        }
        return resolve(validDataResponse("OK","200","The opinion was retrieved",dataMessage));
      }
      }catch(error){
        return resolve(handlingError(error));
      }

    })
  }
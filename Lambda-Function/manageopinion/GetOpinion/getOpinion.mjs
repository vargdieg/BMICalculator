import {DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import {validateEntry} from "/opt/ValidateInputData.mjs";
import {handlingError,HandlerClientError,validDataResponse} from "/opt/handlerException.mjs";

/**
 * 
 * @param {Region in which the customer opinion list is deployed} region 
 * @param {uuid of the opinion to search and retrieve} id 
 * @returns return json object with the message data or the error
 */
export async function GetOpinion(region,id){
    return new Promise(async (resolve,reject)=>{
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
          return resolve(HandlerClientError("NOT_FOUND","The message was not found on the table","error retrieving the opinion","404"));
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
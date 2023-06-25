import { DynamoDBClient, PutItemCommand,GetItemCommand } from "@aws-sdk/client-dynamodb";
import {handlingError,HandlerClientError,validResponse} from "/opt/handlerException.mjs";
import {validateEntry} from "/opt/ValidateInputData.mjs";

/**
 * 
 * @param {Region in which the customer opinion table is deployed} region 
 * @param {user who created the opinion} customerName 
 * @param {Message body of the created opinion} customerOpinion 
 * @param {uuid of the new opinion to be added to the table} messageIdentifier 
 * @returns
 */
export async function PutOpinion(region,customerName,customerOpinion,messageIdentifier){
    return new Promise(async (resolve,reject)=>{
      if(validateEntry(customerName,'Customer Name','String').error){return resolve(validateEntry(customerName,'Customer Name','String'))};
      if(validateEntry(customerOpinion,'Customer Opinion','String').error){return resolve(validateEntry(customerOpinion,'Customer Opinion','String'))};
      if(validateEntry(messageIdentifier,'Identifier','String').error){return resolve(validateEntry(messageIdentifier,'Identifier','String'))};
      
      const Opinion = await GetOpinion(region,messageIdentifier);

      if(Opinion.error){return resolve(Opinion)}
      if(Opinion == false){return resolve(HandlerClientError("CONFLICT","The uuid for the opinion is taken","Could not upload the opinion","409"));}
      const client = new DynamoDBClient({ region: region});
        
          var params = {
          TableName: 'CUSTOMER_OPINION_LIST',
          Item: {
            'CUSTOMER_NAME' : {S: ""+customerName},
            'CUSTOMER_OPINION' : {S: ""+customerOpinion},
            'MESSAGE_IDENTIFIER': {S:""+messageIdentifier}
          }};
          const command = new PutItemCommand(params);
          const response = await client.send(command);
          if(response.error){return resolve(handlingError(response))};
          return resolve(validResponse("Ok","200","Opinion upload sussccesfully"));

    })
}

async function GetOpinion(region,id){
  return new Promise(async(resolve,reject)=>{
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
        if(response.Item == null){
          return resolve(true);
        }else{
          return resolve(false);
      }
      }catch(error){
        reject(handlingError(error));
      }
  })
}
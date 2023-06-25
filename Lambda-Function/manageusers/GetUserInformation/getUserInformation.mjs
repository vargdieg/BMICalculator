import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import {validateEntry} from "/opt/ValidateInputData.mjs";
import {handlingError,validDataResponse} from "/opt/handlerException.mjs";

/**
 * 
 * @param {region in wich the table is deployed*} region 
 * @param {userName} name 
 * @param {Password} password 
 * @returns The return values can be a true value in case the user is susccessfully authenticated or an error format json
 */
export async function getUserInformation(region,userId){ 
  return new Promise(async (resolve,reject)=>{
    if(validateEntry(userId,'user Id','String').error){return resolve(validateEntry(userId,'user Id','String'))}

    const client = new DynamoDBClient({ region: region});
    
    var params = {
        TableName: 'CUSTOMER_LIST',
        Key: {
          'CUSTOMER_IDENTIFICATION': {S:userId},
        }
      };

    const command = new GetItemCommand(params);
    try {
        const response = await client.send(command);
        let userdata = {};
        userdata.username = response.Item.CUSTOMER_NAME.S;
        userdata.email = response.Item.CUSTOMER_EMAIL.S;
        return resolve(validDataResponse("OK","200","User retrieved ok",userdata));
      }catch(error){
        return resolve(handlingError(error));
      }
  })
}
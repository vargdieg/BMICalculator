import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import {validateEntry} from "/opt/ValidateInputData.mjs";
import {HandlerClientError,handlingError,validDataResponse} from "/opt/handlerException.mjs";

/**
 * 
 * @param {region in wich the table is deployed*} region 
 * @param {userName} name 
 * @param {Password} password 
 * @returns The return values can be a true value in case the user is susccessfully authenticated or an error format json
 */
export async function validateCredentials(region,name,password){ 
  return new Promise(async (resolve,reject)=>{
    if(validateEntry(name,'customer name','String').error){return resolve(validateEntry(password,'Customer Password','String'))}

    const client = new DynamoDBClient({ region: region});
    
    var params = {
        TableName: 'CUSTOMER_LIST',
        ExpressionAttributeNames: {
            "#CN": "CUSTOMER_NAME",
            "#CP": "CUSTOMER_PASSWORD"
          },
          ExpressionAttributeValues: {
            ':CN':{S: name},
            ':CP':{S: password}
          },
        FilterExpression: "#CN = :CN and #CP = :CP"
      };

    const command = new ScanCommand (params);
    try {
        const response = await client.send(command);
        if(response.Items.length == 1){
          return resolve(validDataResponse("OK","200","user suscessfully authenticated",response.Items[0].CUSTOMER_IDENTIFICATION.S));  
        }
        return resolve(HandlerClientError("CONFLICT","The username or password are incorrect","The username or password are incorrect","409"));
      }catch(error){
        return resolve(handlingError(error));
      }
  })
}
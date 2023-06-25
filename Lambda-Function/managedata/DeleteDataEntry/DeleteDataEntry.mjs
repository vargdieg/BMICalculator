import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import {handlingError,HandlerClientError,validResponse} from "/opt/handlerException.mjs";
import {GetUserData,createDataArray,orderData} from "/opt/CommonBmiData.mjs";


/**
 * 
 * @param {Region in which the bmi data table is deployed} region 
 * @param {the uuid of the user} customerIdentification 
 * @param {the uuid of the bmi data to be deleted} dataId 
 * @returns it is returned an json object
 */
export async function deleteDataEntry(region,customerIdentification,dataId){
    return new Promise(async (resolve,reject)=>{
      const userData = await GetUserData(region,customerIdentification);
      if(userData.error){return resolve(userData);}
      
      const index = userData.findIndex((item) => item.id === dataId);
      if(index != -1){userData.splice(index, 1);}else{return resolve(HandlerClientError("NOT_FOUND","The uuid of the bmi data could not be found","Error while deleting the data","404"));}
      
      const client = new DynamoDBClient({ region: region});
      let customData = createDataArray(orderData(userData));

      var params = {
          ExpressionAttributeNames: {
           "#LD": "CUSTOMER_DATA"
          }, 
          ExpressionAttributeValues: {
           ":d": {
             L: customData
            }
          }, 
          Key: {
              'CUSTOMER_IDENTIFICATION': {S:customerIdentification},
          }, 
          ReturnValues: "ALL_NEW", 
          TableName: "CUSTOMER_DATA_LIST", 
          UpdateExpression: "SET #LD = :d"
         };
        
         const command = new UpdateItemCommand(params);
         
         try {
           const response = await client.send(command);
           let responseMessage = {
             "Code": response.$metadata.httpStatusCode
           }
           return resolve(validResponse("Ok","200","Deleted data susccessfully"));
         }catch(error){
           return resolve(handlingError(error));
         }
    })
  }
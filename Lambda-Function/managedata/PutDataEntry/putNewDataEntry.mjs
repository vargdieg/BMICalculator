import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import {handlingError,defaultError,HandlerClientError,validResponse} from "/opt/handlerException.mjs";
import {GetUserData,createDataArray,orderData} from "/opt/CommonBmiData.mjs";

/**
 * 
 * @param {Region in which the customer data is deployed} region 
 * @param {uuid of the user} customerIdentification 
 * @param {new bmi data object} customerData 
 * @returns 
 */
export async function putNewDataEntry(region,customerIdentification,customerData){
  return new Promise(async (resolve,reject)=>{
    const userData = await GetUserData(region,customerIdentification);
    if(userData.error){return resolve(userData);}
    let userDataList = userData;
    try{
        if(validateId(userDataList,customerData.id)){
          userDataList = createArray(userDataList,customerData);
        }else{return resolve(HandlerClientError("CONFLICT","The uuid exist","could not update the data, please try later","409"));}
    }catch{
      return resolve(defaultError());
    }
    const client = new DynamoDBClient({ region: region});
        
    let customData = createDataArray(userDataList);
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
         return resolve(validResponse("Ok","200","data created susccessfully"));
       }catch(error){
        return resolve(handlingError(error));
       }
  })
  }
/**
 * 
 * @param {array of the bmi data} customerdata 
 * @param {uuid of the new bmi data} id 
 * @returns returns true if the id of the new object is unique in teh data array 
 */
function validateId(customerdata,id){
  for(let i = 0;i<customerdata.length;i++){
    if(customerdata[i].id == id){
      return false;
    }
  }
  return true;
}

/**
 * 
 * @param {array of the bmi data} initialArray 
 * @param {new bmi data object} newInput 
 * @returns appends the new Data into the initial array
 */
function createArray(initialArray,newInput){
  let usData = [];
  initialArray.forEach(element =>{
    usData.push(element);
  });
  usData.push(newInput);
  return orderData(usData);
}
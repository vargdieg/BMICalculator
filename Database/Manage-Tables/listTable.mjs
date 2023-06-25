import { DynamoDBClient, ListTablesCommand} from "@aws-sdk/client-dynamodb";
var region = process.argv[2];
let profile = process.argv[3];

ListTable(profile,region).then(response => {
    console.log(response);
});

async function ListTable(profilename,region){
  const client = new DynamoDBClient({ region: region ,profile: profilename});
  
  const command = new ListTablesCommand({Limit: 10});
   try {
     const response = await client.send(command);
     let responseMessage = {
      "Tables": response.TableNames,
      "details":{
        "Code": response.$metadata.httpStatusCode,
        "AmazonIdCode": response.$metadata.requestId
      }
     }
     return responseMessage;
   }catch(error){
     let response = handlingError(error);
     return response;
   }
}

function handlingError(error){
  const ClientError = [
    'ConditionalCheckFailedException',
    'ItemCollectionSizeLimitExceededException',
    'LimitExceededException',
    'MissingAuthenticationTokenException',
    'ResourceInUseException',
    'ResourceNotFoundException',
    'UnrecognizedClientException',
    'ValidationException',
    'ProvisionedThroughputExceeded',
    'ProvisionedThroughputExceededException',
    'RequestLimitExceeded',
    'ThrottlingException',
  ]
  if(ClientError.includes(error.name)){
    let response = {
      "name": error.name,
      "message": error.message,
      "error": {
        "errorCode": error.$metadata.httpStatusCode
      }
    }
    return response;
  }
  if(error.name && error.message){
    let response = {
      "name": error.name,
      "message": error.message,
      "error": {
        "errorCode": 500
      }
    }
    return response;
  }
  let response = {
    "name": 'Unknown error',
    "message": 'unknown error at the moment of making the request',
    "error":{
      "errorCode": '500'
    }
  }
  return response;
}
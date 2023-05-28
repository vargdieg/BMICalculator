import { DynamoDBClient, DeleteTableCommand} from require("@aws-sdk/client-dynamodb");

let tableName = process.argv[2];
let region = process.argv[3];
let profile = process.argv[4];

DeleteTable(profile,region,tableName).then(response => {
    console.log(response);
});

async function DeleteTable(profilename,region,tableName){
    const client = new DynamoDBClient({ region: region ,profile: profilename});
    var params = {
      TableName: tableName
    };
    const command = new DeleteTableCommand(params);
    try {
      const response = await client.send(command);
      let responseMessage = {
        "TableName": response.TableDescription.TableName,
        "TableId": response.TableDescription.TableArn,
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
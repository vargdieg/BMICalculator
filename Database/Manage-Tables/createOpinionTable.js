const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb");

var region = process.argv[2];
let profile = process.argv[3];

createOpinionTable(profile,region).then(response => {
    console.log(response);
});

async function createOpinionTable(profilename,region){
  const client = new DynamoDBClient({ region: region ,profile: profilename});

  var params = {
    AttributeDefinitions: [
      {
        AttributeName: 'MESSAGE_IDENTIFIER',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'MESSAGE_IDENTIFIER',
        KeyType: 'HASH'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
    TableName: 'CUSTOMER_OPINION_LIST',
    StreamSpecification: {
      StreamEnabled: false
    }
};
const command = new CreateTableCommand(params);
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
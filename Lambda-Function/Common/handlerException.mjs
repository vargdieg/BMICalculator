/**
 * 
 * @param {this is the AWS error that can output} error 
 * @returns the error response in json format
 */
export function handlingError(error){
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
        "user_message": "Encounter error while processing your request",
        "error": {
          "errorCode": error.$metadata.httpStatusCode,
          "TypeOfError": "Technical"
        }
      }
      return {
        statusCode: response.error.errorCode,
        headers:{
          "Access-Control-Allow-Headers":"*",
          "Access-Control-Allow-Methods":"*",
          "Access-Control-Allow-Origin":"*"
        },
        body: JSON.stringify(response),
      };
    }
    if(error.name && error.message){
      let response = {
        "name": error.name,
        "message": error.message,
        "user_message": "Encounter error while processing your request",
        "error": {
          "errorCode": 500,
          "TypeOfError": "Technical"
        }
      }
      return {
        statusCode: response.error.errorCode,
        headers:{
          "Access-Control-Allow-Headers":"*",
          "Access-Control-Allow-Methods":"*",
          "Access-Control-Allow-Origin":"*"
        },
        body: JSON.stringify(response),
      };
    }
    return defaultError();
}

/**
 * 
 * @param {The http name of the code} name 
 * @param {Thecnical message to be used to debug} message 
 * @param {Friendly user message meant to pass it to the user} userMessage 
 * @param {The http code to be returned} code 
 * @returns the error response in json format
 */
export function HandlerClientError(name,message,userMessage,code){
  let response = {
    "name": name,
    "message": message,
    "user_message": userMessage,
    "error": {
      "errorCode": code,
      "TypeOfError": "Non-Technical"
    }
  }
  return {
    statusCode: response.error.errorCode,
    headers:{
      "Access-Control-Allow-Headers":"*",
      "Access-Control-Allow-Methods":"*",
      "Access-Control-Allow-Origin":"*"
    },
    body: JSON.stringify(response),
  };
}

/**
 * 
 * @returns Return a default json error
 */
export function defaultError(){
    let response = {
      "name": 'Internal_Server_Error',
      "message": "Encounter error while processing your request",
      "user_message": "Encounter error while processing your request",
      "error":{
        "errorCode": '500',
        "TypeOfError": "Non-Technical"
      }
    }
    return {
      statusCode: response.error.errorCode,
      headers:{
        "Access-Control-Allow-Headers":"*",
        "Access-Control-Allow-Methods":"*",
        "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify(response),
    };
}

/**
 * 
 * @param {name of the http code} name 
 * @param {http code} code 
 * @param {user friendly message} message 
 * @returns returns an json object wich describes that the operation was done suscessfully
 */
export function validResponse(name,code,message){
  let response = {
    "name": name,
    "code": code,
    "message": message
  }
  return {
    statusCode: response.code,
    headers:{
      "Access-Control-Allow-Headers":"*",
      "Access-Control-Allow-Methods":"*",
      "Access-Control-Allow-Origin":"*"
    },
    body: JSON.stringify(response),
  };
}

/**
 * 
 * @param {name of the http code} name 
 * @param {http code} code 
 * @param {user friendly message} message 
 * @param {all the retrieve bmi data} data
 * @returns returns an json object wich describes that the operation was done suscessfully
 */
export function validDataResponse(name,code,message,data){
  let response = {
    "name": name,
    "code": code,
    "message": message,
    "data": data
  }
  return {
    statusCode: response.code,
    headers:{
      "Access-Control-Allow-Headers":"*",
      "Access-Control-Allow-Methods":"*",
      "Access-Control-Allow-Origin":"*"
    },
    body: JSON.stringify(response),
  };
}
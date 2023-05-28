import {validateCredentials} from "./ValidateCredentials.mjs";

export async function handler(event,context,callback){
  var body = JSON.parse(event.body);
  let name = body.customerName;
  let password = body.customerPassword;
  let region = body.region;

  const response = await validateCredentials(region,name,password);
  return response;
}
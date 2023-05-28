import {getUserInformation} from "./getUserInformation.mjs";

export async function handler(event,context,callback){
  let userId = event.queryStringParameters.id;
  let region = event.queryStringParameters.region;

  const response = await getUserInformation(region,userId);
  return response;
}
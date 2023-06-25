import {GetOpinion} from "./getOpinion.mjs";

export async function handler(event,context,callback){

  let region = event.queryStringParameters.region;
  let id = event.queryStringParameters.id;

  const response = await GetOpinion(region,id);
  return response;
}
import {PutOpinion} from "./putOpinion.mjs";

export async function handler(event,context,callback){
  var body = JSON.parse(event.body);
  let region = body.region;
  let customerName = body.customerName;
  let customerOpinion = body.customerOpinion;
  let messageIdentifier = body.messageIdentifier;
  const response = await PutOpinion(region,customerName,customerOpinion,messageIdentifier);
  return response;
}
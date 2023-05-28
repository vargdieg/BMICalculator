import {DeleteOpinion} from "./deleteOpinion.mjs";

export async function handler(event,context,callback){
  var body = JSON.parse(event.body);
  let region = body.region;
  let OpinionId = body.id;
  const response = await DeleteOpinion(region,OpinionId);
  return response;
}
import {DeleteUser} from "./deleteUserFromTables.mjs";

export async function handler(event,context,callback){
  var body = JSON.parse(event.body);
  let region = body.region;
  let customerIdentification = body.customerIdentification;
  const response = await DeleteUser(region,customerIdentification);
  return response;
}
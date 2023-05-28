import {deleteDataEntry} from "./DeleteDataEntry.mjs";

export async function handler(event,context,callback){
  var body = JSON.parse(event.body);
  let region = body.region;
  let customerIdentification = body.customerIdentification;
  let Dataid = body.bmiDataIdentification;
  const response = await deleteDataEntry(region,customerIdentification,Dataid);
  return response;
}
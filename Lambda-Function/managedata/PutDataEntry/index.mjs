import {putNewDataEntry} from "./putNewDataEntry.mjs";

export async function handler(event,context,callback){
  var body = JSON.parse(event.body);
  let region = body.region;
  let customerIdentification = body.customerIdentification;
  let newData = body.bmiNewData;
  const response = await putNewDataEntry(region,customerIdentification,newData);
  return response;
}
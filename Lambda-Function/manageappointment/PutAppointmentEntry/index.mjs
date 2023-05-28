import {putNewAppointmentEntry} from "./putNewAppointmentEntry.mjs";

export async function handler(event,context,callback){
  var body = JSON.parse(event.body);
  let region = body.region;
  let customerIdentification = body.id;
  let newAppointment = body.data;
  const response = await putNewAppointmentEntry(region,customerIdentification,newAppointment);
  return response;
}
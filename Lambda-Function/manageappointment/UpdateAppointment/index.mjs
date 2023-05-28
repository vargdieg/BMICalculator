import {UpdateAppointmentEntry} from "./UpdateAppointmentEntry.mjs";

export async function handler(event,context,callback){
  var body = JSON.parse(event.body);
  let region = body.region;
  let customerIdentification = body.id;
  let Appoitnmentid = body.Appoitnmentid;
  let newAppointment = body.Appoitnment;
  const response = await UpdateAppointmentEntry(region,customerIdentification,Appoitnmentid,newAppointment);
  return response;
}
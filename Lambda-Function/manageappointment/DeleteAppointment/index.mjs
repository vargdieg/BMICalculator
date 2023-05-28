import {deleteAppointmentEntry} from "./DeleteAppointmentEntry.mjs";

export async function handler(event,context,callback){
  var body = JSON.parse(event.body);
  let region = body.region;
  let customerIdentification = body.id;
  let Appoitnmentid = body.Appointmentid;
  const response = await deleteAppointmentEntry(region,customerIdentification,Appoitnmentid);
  return response;
}
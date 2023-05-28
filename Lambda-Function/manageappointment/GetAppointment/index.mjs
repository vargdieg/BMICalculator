import {GetUserAppointments} from "/opt/CommonAppointmentData.mjs";
import {validDataResponse} from "/opt/handlerException.mjs";

export async function handler(event,context,callback){
  let region = event.queryStringParameters.region;
  let customerIdentification = event.queryStringParameters.id;
  const response = await GetUserAppointments(region,customerIdentification);
  if(response.error){
    return response;
  }
  return validDataResponse("OK","200","Retrieved data",response);
}
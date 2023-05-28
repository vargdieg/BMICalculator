import {HandlerClientError,validResponse} from "/opt/handlerException.mjs";
import {GetUserAppointments,PutUserAppointments,createDataArray,OrderData} from "/opt/CommonAppointmentData.mjs";

/**
 * 
 * @param {Region in which the table of appointment is deployed} region 
 * @param {uuid of the user} customerIdentification 
 * @param {New Appointment to be included in table} newAppointment 
 * @returns 
 */
export async function putNewAppointmentEntry(region,customerIdentification,newAppointment){
    return new Promise(async (resolve,reject)=>{
      let userAppointment = await GetUserAppointments(region,customerIdentification);

      if(userAppointment.error){return resolve(userAppointment);}
      
      if(validateId(userAppointment,newAppointment.identifier)){return resolve(HandlerClientError("CONFLICT","The uuid already exist","Could not add the appointment","409"));}
          
      let customData = createDataArray(OrderData(createArray(userAppointment,newAppointment)));
      
      const response = await PutUserAppointments(region,customerIdentification,customData);
      
      if(response.error){return resolve(response)}
      
      return resolve(validResponse("Ok","200","appointment created susccessfully"));
    })
  }
/**
 * 
 * @param {array containing the appointment information of the user} customerData 
 * @param {uuid of the new element to add} id 
 * @returns return true if the uuid is in the appointment array
 */
function validateId(customerData,id){
  for(let i = 0;i<customerData.length;i++){
    if(customerData[i].identifier == id){
      return true;
    }
  }
  return false;
}

/**
 * 
 * @param {array of appointments} array 
 * @param {new appointment to add to the array} newElement 
 * @returns return the array adding the new element at the end of the array
 */
function createArray(array,newElement){
  let usData = [];
  array.forEach(element=>{
    usData.push(element)
  })
  usData.push(newElement);
  return usData;
}
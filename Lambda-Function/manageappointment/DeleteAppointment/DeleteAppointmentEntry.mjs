import {defaultError,HandlerClientError,validResponse} from "/opt/handlerException.mjs";
import {GetUserAppointments,PutUserAppointments,createDataArray,OrderData} from "/opt/CommonAppointmentData.mjs";

/**
 * 
 * @param {Region in which the customer appointment table is deployed} region 
 * @param {uuid of the user} customerIdentification 
 * @param {uuid of the appoitnment to be deleted} AppointmentId 
 * @returns 
 */
export async function deleteAppointmentEntry(region,customerIdentification,AppointmentId){
    return new Promise(async (resolve,reject)=>{
        const userData = await GetUserAppointments(region,customerIdentification);
        try{
            const index = userData.findIndex((item) => item.identifier === AppointmentId);
            console.log(index);
                if(index != -1){
                    userData.splice(index, 1);
                }else{
                    return resolve(HandlerClientError('CONFLICT','The uuid passed could not be found','Error while deleting the appointment','409'))
                }
        }catch{
            return resolve(defaultError());
        }
        let customData = createDataArray(OrderData(userData));
        const response = await PutUserAppointments(region,customerIdentification,customData);
            
        if(response.error){return resolve(response)}
        return resolve(validResponse("OK","200","Appointment deleted susccessfully"));
    })
  }
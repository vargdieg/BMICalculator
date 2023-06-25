import {defaultError,validResponse} from "/opt/handlerException.mjs";
import {GetUserAppointments,PutUserAppointments,OrderData,createDataArray} from "/opt/CommonAppointmentData.mjs";

export async function UpdateAppointmentEntry(region,customerIdentification,AppointmentId,newAppointment){
    return new Promise(async (resolve,reject)=>{
        const userData = await GetUserAppointments(region,customerIdentification);

        if(userData.error){return resolve(userData);}
        
        try{
            const index = userData.findIndex((item) => item.identifier === AppointmentId);
            if(index != -1){userData[index] = newAppointment;}
        }catch{return resolve(defaultError());}
        
        let customData = createDataArray(OrderData(userData));
        let response = await PutUserAppointments(region,customerIdentification,customData)
            
        if(response.error){return resolve(response)}
        return resolve(validResponse("OK","200","Appointment updated"));
    })
  }
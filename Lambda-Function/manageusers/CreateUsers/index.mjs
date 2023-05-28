import {CreateUser} from "./createUser.mjs";

export async function handler(event,context,callback){
    var body = JSON.parse(event.body);
    let region = body.region;
    let customerName = body.customerName;
    let customerPassword = body.customerPassword;
    let customerEmail = body.customerEmail;
    let customerIdentification = body.customerIdentification;    
    const response = await CreateUser(region,customerName,customerPassword,customerEmail,customerIdentification)
    return response;
}
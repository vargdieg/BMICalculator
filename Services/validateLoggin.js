import {LoadUsers} from "../Services/saveNewUsers.js"

export function validateLoggin(username,password){
    const Users = LoadUsers();
    let validation = false;
    let identifier = "";
    Users.forEach(user => {
        if(user.username == username && user.password == password){
            validation = true;
            identifier = user.identifier;
        }
    });
    return [validation,identifier];
}
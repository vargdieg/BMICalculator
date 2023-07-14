import { v4 as uuidv4 } from 'uuid';

export default class User{
    constructor(username,password,email){
        this.username = username;
        this.password = password;
        this.email = email;
        this.identifier = uuidv4();
    }
}
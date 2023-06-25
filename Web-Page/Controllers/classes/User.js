export class User{
    constructor(username,password,email,identifier){
        this.username = username;
        this.password = password;
        this.email = email;
        this.identifier = uuid.v4();
    }

}
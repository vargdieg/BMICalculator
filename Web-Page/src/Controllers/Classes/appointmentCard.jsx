import { v4 as uuidv4 } from 'uuid';

export default class appointmentCard{
    constructor(profession,date,time,status,direction,description){
        this.profession = profession;
        this.date = date;
        this.time = time;
        this.status = status;
        this.direction = direction;
        this.description = description;
        this.identifier = uuidv4();
    }
}
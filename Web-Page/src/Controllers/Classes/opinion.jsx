import { v4 as uuidv4 } from 'uuid';

export class opinion{
    constructor(name,opinion){
            this.name = name;
            this.opinion = opinion;
            this.identifier = uuidv4();
    }
}
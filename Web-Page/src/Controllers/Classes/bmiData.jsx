import { v4 as uuidv4 } from 'uuid';

export class bmiData{
    constructor(weight,height,date,bmi,waist){
        this.weight = weight;
        this.height = height;
        this.date = date;
        this.bmi = bmi;
        this.waist = waist;
        this.id = uuidv4();
    }
}
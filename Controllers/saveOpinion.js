import {getOpinion,uploadOpinion} from "../Services/manageOpinion.js"

export function addOpinion(){
    const opinionName = document.querySelector("[data-opinionname]");
    const opinionMessage = document.querySelector("[data-opinionmessage]");
    let opinions = getOpinion();
    const newOpinion = {
        name: opinionName.value,
        opinion: opinionMessage.value,
        identifier: uuid.v4()
    };
    opinions.push(newOpinion);
    uploadOpinion(opinions);

    opinionName.value="";
    opinionMessage.value="";
}
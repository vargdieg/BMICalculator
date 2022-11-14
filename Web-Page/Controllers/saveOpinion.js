import {uploadOpinion} from "../Services/manageOpinion.js"

export function addOpinion(){
    const opinionName = document.querySelector("[data-opinionname]");
    const opinionMessage = document.querySelector("[data-opinionmessage]");
    const newOpinion = {
        name: opinionName.value,
        opinion: opinionMessage.value,
        identifier: uuid.v4()
    };
    opinionName.value="";
    opinionMessage.value="";
    uploadOpinion(newOpinion).then(() => alert("Opinion subida")).catch((error)=>{
        alert(error);
    });
}
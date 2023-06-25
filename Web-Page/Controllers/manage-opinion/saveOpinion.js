import {uploadOpinion} from "../../Services/ManageOpinion/manageOpinion.js"
import {opinion} from "../classes/opinion.js"
import {showModalCommon} from "../manage-modal/manage-commonmodal.js"

export function addOpinion(){
    const opinionName = document.querySelector("[data-opinionname]");
    const opinionMessage = document.querySelector("[data-opinionmessage]");
    let newOpinion = new opinion(opinionName.value,opinionMessage.value,uuid.v4())
    opinionName.value="";
    opinionMessage.value="";
    uploadOpinion(newOpinion).then(() => alert("Opinion subida")).catch((error)=>{
        showModalCommon(error);
    });
}
import { createtable } from "./createTable.js";
import {createHistogram} from "./histogram.js";
import {loadUserData} from "../../Services/ManageUsers/ManageUserData.js";
import {getUserName} from "../../Services/ManageUsers/ManageUsers.js";
import { showModalCommon } from "../manage-modal/manage-commonmodal.js";

const params = new URLSearchParams(window.location.search);
const idUser = params.get("id");

export function displayPage(){
    loadUserData(idUser).then((data)=>{
        CleanScreen();
        createtable(data);
        createHistogram(data);
        ResetEntries();
    }).catch((error)=>{
        showModalCommon(error);
    });
}

function CleanScreen(){
    document.querySelector("[data-table]").innerHTML = "";
    document.querySelector("[data-histogram]").innerHTML = "";
    getUserName(idUser).then((response) => {
        document.querySelector("[data-welcome]").innerHTML ="Hello there "+ response.username;
    }).catch((error)=>{
        showModalCommon(error);
    })
}

function ResetEntries(){
    document.querySelector("[data-weight]").value = "";
    document.querySelector("[data-height]").value = "";
    document.querySelector("[data-waist]").value = "";
    document.querySelector("[data-date]").value = "";
}
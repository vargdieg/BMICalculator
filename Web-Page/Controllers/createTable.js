import {loadUserData,saveData} from "../Services/ManageUsers/ManageUserData.js"
import {displayPage} from "./displayImcPage.js";

const params = new URLSearchParams(window.location.search);
const idUser = params.get("id");

const deleteIcon = (id) => {
    const i = document.createElement('td');
    i.classList.add('fa', 'fa-trash-o', 'body__table_content__erase');
    i.addEventListener('click', () => deleteTask(id));
    return i;
};

const deleteTask = (id) => {
    loadUserData(idUser).then((loadData)=>{
        let datos = loadData;
        const index = datos.findIndex((item) => item.id === id);
        datos.splice(index, 1);
        saveData(datos,idUser).then(()=>{
            displayPage();
        });
    });    
};

export function createtable(data){
    createHeaderRow();
    data.forEach(element => {
        createRow(element.height,element.weight,element.date,element.bmi,element.waist,element.id);
    });
}

function createHeaderRow(){
    let headers = ["Date","Weight","Height","IMC","Waist","Erase"];
    let header = document.createElement("tr");
    header.classList.add("body__table_content__header");
    headers.forEach(element => {
        let headerdata = document.createElement("th");
        headerdata.classList.add("body__table_content__headers");
        headerdata.innerHTML=element;
        header.appendChild(headerdata);
    });
    let table = document.querySelector("[data-table]");
    table.appendChild(header);
}

function createRow(height,weight,date,imc,waist,id){
    let elementsOnRow = [date,weight,height,imc,waist,""];
    let tableRow = document.createElement("tr");
    tableRow.classList.add("body__table_content__elements");
    elementsOnRow.forEach(element=>{
        if(element == ""){
            tableRow.appendChild(deleteIcon(id));
        }else{
            let tableData = document.createElement("td");
            tableData.innerHTML=element;
            tableData.classList.add("body__table_content__elements");
            tableRow.appendChild(tableData);
        }
    });
    let table = document.querySelector("[data-table]");
    table.appendChild(tableRow);
}
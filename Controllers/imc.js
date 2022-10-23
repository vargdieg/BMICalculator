import {loadUserData,saveData} from "../Services/loadUserData.js"
import { closeSession } from "./navigation.js";
import {addOpinion} from "./saveOpinion.js";

const params = new URLSearchParams(window.location.search);
const idUser = params.get("id");

const button = document.querySelector("[data-button]");
const closeSessionButton = document.querySelector("[data-session]");
const saveOpinion = document.querySelector("[data-opinion]");

const deleteIcon = (id) => {
    const i = document.createElement('td');
    i.classList.add('fa', 'fa-trash-o', 'body__table_content__erase');
    i.addEventListener('click', () => deleteTask(id));
    return i;
};
displayPage();

closeSessionButton.addEventListener("click",()=>{
    closeSession();
});

saveOpinion.addEventListener("click",()=>{
    addOpinion();
});
  
const deleteTask = (id) => {
    let datos = loadUserData(idUser);
    const index = datos.findIndex((item) => item.id === id);
    datos.splice(index, 1);
    saveData(datos,idUser);
    displayPage();
};

function displayPage(){
    let datos = loadUserData(idUser);
    CleanScreen();
    createtable(datos);
    createHistogram(datos);
}

function CleanScreen(){
    document.querySelector("[data-table]").innerHTML = "";
}

button.addEventListener("click",() =>{
    const [condition,weight,height,date] = validateEntries();
    if(!condition){
        alert("datos no correctos");
    }else{
        const params = new URLSearchParams(window.location.search);
        const idUser = params.id;
        const imc = imcCalculator(height,weight).toFixed(2);
        const data = {
            weight: weight,
            height: height,
            date: date,
            imc: imc,
            id: uuid.v4()
        }
        let datos = loadUserData(idUser);
        datos.push(data);
        datos = ordenarDatos(datos);
        saveData(datos,idUser);
        displayPage();
    }
});

function validateEntries(){
    let weight = document.querySelector("[data-weight]");
    let height = document.querySelector("[data-height]");
    let date = document.querySelector("[data-date]");
    if(weight.validity.valid && height.validity.valid && date.validity.valid){
        const dateTime = moment(date.value).format('DD/MM/YYYY');
        return [true,weight.value,height.value,dateTime];
    }else{
        return [false,weight.value,height.value,date.value];
    }
};

function ordenarDatos(datos){
    datos.sort(function(a,b){
        const firstDate = moment(a.date, 'DD/MM/YYYY');
        const secondDate = moment(b.date, 'DD/MM/YYYY');
        return firstDate - secondDate;
      });
    return datos;
}

function createtable(data){
    createHeaderRow();
    data.forEach(element => {
        createRow(element.height,element.weight,element.date,element.imc,element.id);
    });
}

function createHeaderRow(){
    let headers = ["Date","Weight","Height","IMC","Erase"];
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

function createRow(height,weight,date,imc,id){
    let elementsOnRow = [date,weight,height,imc,""];
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

function imcCalculator(height,weight){
    let imc = (100*100*weight)/(height*height);
    return imc;
}

//Entender como junciona esta vaina del histograma
//Solo chuchito y el que hizo esta vaina sabe como funciona
//https://www.w3schools.com/js/js_graphics_chartjs.asp
function getDateImc(data){
    const dataValues = [];
    const imcValues = [];
    data.forEach(element =>{
        dataValues.push(element.date);
        imcValues.push(element.imc);
    });
    return [dataValues,imcValues];
}

function createHistogram(data){
    const [date,imc] = getDateImc(data);
    const barColors = [];
    date.forEach(element => {
        barColors.push("black");
    })

    new Chart("myChart", {
        type: "bar",
        data: {
          labels: date,
          datasets: [{
            backgroundColor: barColors,
            data: imc
          }]
        },
        options: {
          legend: {display: false},
          title: {
            display: true,
            text: "BMI Progression"
          }
        }
      });
};
//Entender como junciona esta vaina del histograma
//Solo chuchito y el que hizo esta vaina sabe como funciona
//https://www.w3schools.com/js/js_graphics_chartjs.asp

export function createHistogram(data){
    const histogram = document.querySelector("[data-histogram]");
    let chartTag = document.createElement("canvas");
    chartTag.id = "myChart";
    chartTag.style.maxWidth = "600px";
    histogram.appendChild(chartTag);
    const [date,bmi] = getDateImc(data);
    const barColors = [];
    date.forEach(() => {
        barColors.push("black");
    })
    new Chart("myChart", {
        type: "bar",
        data: {
          labels: date,
          datasets: [{
            backgroundColor: barColors,
            data: bmi
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

function getDateImc(data){
    const dateValues = [];
    const imcValues = [];
    data.forEach(element =>{
        dateValues.push(element.date);
        imcValues.push(element.bmi);
    });
    return [dateValues,imcValues];
}
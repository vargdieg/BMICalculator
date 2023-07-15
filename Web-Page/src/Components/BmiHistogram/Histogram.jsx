import React from 'react';
import {
    Chart as ChartJS,
  } from 'chart.js';
import './Histogram.css';

export default function Histogram({data}){
    return (<canvas className="body__histogram" id="histogram">
            {CreateHistogram(data)}
        </canvas>)
}

function CreateHistogram(data){
    let histogramTag = document.getElementById('histogram');
    if(data !== undefined && histogramTag!==null){
        const [date,bmi] = getDateImc(data);
        const barColors = [];
            date.forEach(() => {
                barColors.push("black");
            })
          new ChartJS(histogramTag, {
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
    }
}

function getDateImc(data){
    const dateValues = [];
    const imcValues = [];
    data.forEach(element =>{
        dateValues.push(element.date);
        imcValues.push(element.bmi);
    });
    return [dateValues,imcValues];
}
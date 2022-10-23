export function uploadOpinion(opinions){
    localStorage.setItem("opinions",JSON.stringify(opinions));
}

export function getOpinion(){
    let opinions = JSON.parse(localStorage.getItem("opinions")) || [];
    return opinions;
}
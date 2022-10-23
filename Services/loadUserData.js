export function loadUserData(id){
    let userData = JSON.parse(localStorage.getItem("data")) || [];
    return userData
}

export function saveData(userNewData,id){
    localStorage.setItem("data",JSON.stringify(userNewData));
}
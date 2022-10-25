export function loadUserData(id){
    let userData = JSON.parse(localStorage.getItem("data"+id)) || [];
    return userData
}

export function saveData(userNewData,id){
    localStorage.setItem("data"+id,JSON.stringify(userNewData));
}
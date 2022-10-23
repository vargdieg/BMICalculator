export function saveUser(userInfo){
    let UsersAlready = LoadUsers();
    UsersAlready.push(userInfo);
    localStorage.setItem("usuarios",JSON.stringify(UsersAlready));
}

export function LoadUsers(){
    let Users = JSON.parse(localStorage.getItem("usuarios")) || [];
    return Users
}
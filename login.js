function login(){

let id = document.getElementById("studentId").value
let pass = document.getElementById("password").value

// demo login credentials
let studentId = "CSE001"
let password = "1234"

if(id === studentId && pass === password){

window.location.href = "dashboard.html"

}
else{

document.getElementById("error").innerText="Invalid ID or Password"

}

}
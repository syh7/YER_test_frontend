
let tablesDiv = document.getElementById("tablesDiv");
let requestTarget = "http://nos.nl";

function getTables(){
    let req = new XMLHttpRequest();
    req.open("GET", requestTarget, true);
    req.onload = onResponse;
    req.send();
}

function onResponse(){
    tablesDiv.innerHTML = this.response;
}

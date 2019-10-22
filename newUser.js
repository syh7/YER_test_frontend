let requestTarget = "http://localhost:8082/";

function newUser() {
    let req = new XMLHttpRequest();
    req.open("POST", requestTarget + "participants", true);
    req.onload = onResponse;
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(getUserInput()));
}
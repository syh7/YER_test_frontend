let requestTarget = "http://localhost:8082/";

function newUser() {
    let req = new XMLHttpRequest();
    req.open("POST", requestTarget + "participants", true);
    req.responseType = "json";

    req.onload = console.log(JSON.parse(this.response));
    //openUser.bind(this, this.response)
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(getUserInput()));
}

function getUserInput() {
    let participant = {};
    participant.email = document.getElementById("email").value;
    participant.password = document.getElementById("password").value;
    participant.firstName = document.getElementById("firstName").value;
    participant.lastName = document.getElementById("lastName").value;
    participant.playerLevel = document.getElementById("playerLevel").value;
    participant.dateOfBirth = document.getElementById("dateOfBirth").value;
    participant.leagueNumber = document.getElementById("leagueNumber").value;
    return participant;
}

function openUser(userId){
    console.log(userId);
    //window.location.href = 'participant.html?id=' + userId;
}
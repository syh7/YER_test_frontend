let requestTarget = "http://localhost:8082/";

function newUser() {
    let req = new XMLHttpRequest();
    req.open("POST", requestTarget + "participants", true);
  //  req.responseType = "json";
    
    req.onload = function() {
        console.log(JSON.parse(this.responseText).id);
        openUser(JSON.parse(this.responseText).id);
    }
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
    console.log("In openUser(): " + userId);
    window.location.href = 'participant.html?id=' + userId;
}
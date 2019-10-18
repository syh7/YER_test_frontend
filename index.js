
let participantsDiv = document.getElementById("participantsDiv");
let allParticipantsTarget = "http://localhost:8082/participants";

function getAllParticipants(){
    let req = new XMLHttpRequest();
    req.open("GET", allParticipantsTarget, true);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function(){
        let participants = JSON.parse(this.response);
        for(let i = 0; i < participants.length; i++){
            let div = document.createElement("div");
            let span = document.createElement("span");
            span.classList.add("participantSpan");
            let para = document.createElement("p");
            para.classList.add("participantName");

            let name = participants[i].firstName + " " + participants[i].lastName;
            let playerLevel = participants[i].playerLevel;
            let dateOfBirth = participants[i].dateOfBirth;
            let email = participants[i].email;

            para.appendChild(document.createTextNode(name));
            span.appendChild(para);
            span.appendChild(document.createTextNode("Email: " + email));
            span.appendChild(document.createTextNode("Playerlevel: " + playerLevel));
            span.appendChild(document.createTextNode("Date of birth: " + dateOfBirth));

            div.appendChild(span);
            participantsDiv.appendChild(div);
        }
    };
    req.send();
}

function makeNewParticipant(){
    let participant = {};
    participant.firstName = "newName";
    participant.lastName = "lastName";
    participant.dateOfBirth = "10182019";
    participant.playerLevel = 2;
    participant.email = "test@test.com";
    participant.password = "wachtwoord123";
    return participant;
}

function sendParticipant(participant){
    let req = new XMLHttpRequest;
    req.open("POST", allParticipantsTarget, true);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function(){
        console.log(this.response);
    }
    req.send(JSON.stringify(participant));
}




let requestTarget = "http://localhost:8082/";
let tournamentDiv = document.getElementById("tournaments");

function newUser() {
    let req = new XMLHttpRequest();
    req.open("POST", requestTarget + "participants", true);
    req.onload = onResponse;
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(getUserInput()));
}

function onResponse() {
    alert(this.response);
}

function getUserInput() {
    let participant = {};
    participant.email = document.getElementById("email").value;
    participant.password = document.getElementById("password").value;
    participant.firstName = document.getElementById("firstName").value;
    participant.lastname = document.getElementById("lastName").value;
    participant.playerLevel = document.getElementById("playerLevel").value;
    participant.dateOfBirth = document.getElementById("dateOfBirth").value;
    participant.leagueNumber = document.getElementById("leagueNumber").value;
    return participant;
}

function searchTournament() {
    var search = document.getElementById("searchbar").value;
    console.log("Search: " + search);
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        //xhttp.responseType = "application/json";
        if (this.readyState == 4 && this.status == 200) {
            var tournaments = JSON.parse(req.responseText);
            console.log(tournaments);
            var table = document.createElement("TABLE");
            for (var i = 0; i < tournaments.length; i++) {
                var row = table.insertRow(i);
                row.insertCell(0).innerHTML = tournaments[i].name;
                var cell = row.insertCell(1);
                for (var j = 0; j < tournaments[i].categories.length; j++) {                  
                    cell.innerHTML += tournaments[i].categories[j] + ", ";
                }
                row.insertCell(2).innerHTML = tournaments[i].startDate;
                row.insertCell(3).innerHTML = tournaments[i].enrolDate;
                
                let button = document.createElement('BUTTON');
                button.innerHTML = "View";
                row.insertCell(4).appendChild(button);

            }
            if(tournamentDiv.hasChildNodes()){
                tournamentDiv.removeChild(tournamentDiv.children[0]);
            }
            tournamentDiv.appendChild(table);

        }
    }
    req.open("GET", requestTarget + "tournaments/?mode=contains&search=" + search, true);
    req.send();
}

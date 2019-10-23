let requestTarget = "http://localhost:8082/";
let tournamentDiv = document.getElementById("tournaments");
let tournaments;

load();

function searchTournament() {
    var search = document.getElementById("searchbar").value;
    console.log("Search: " + search);
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        //xhttp.responseType = "application/json";
        if (this.readyState == 4 && this.status == 200) {
            tournaments = JSON.parse(req.responseText);
            console.log("Tournaments: " + tournaments);
            var table = document.createElement("TABLE");
            for (var i = 0; i < tournaments.length; i++) {
                var row = table.insertRow(i);
                row.insertCell(0).innerHTML = tournaments[i].name;
                var cell = row.insertCell(1);
                if(tournaments[i].categories == null){
                    cell.innerHTML = "No categories known yet";
                } else {
                    for (var j = 0; j < tournaments[i].categories.length; j++) {                  
                        cell.innerHTML += tournaments[i].categories[j] + ", ";
                    }
                }
                row.insertCell(2).innerHTML = tournaments[i].startDate;
                row.insertCell(3).innerHTML = tournaments[i].enrolDate;
                
                let button = document.createElement('BUTTON');
                button.innerHTML = "View";
                console.log("In onclick, id=: " + tournaments[i].id);
                button.addEventListener('click', openTournament.bind(this, tournaments[i].id));
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

function openTournament(tournamentId){
    console.log("In function, id=: " + tournamentId);
    window.location.href = 'tournament.html?id=' + tournamentId;

}

function load(){
    let id = new URL(location.href).searchParams.get('id')
    console.log(id);
    let req = new XMLHttpRequest();
    req.open("GET", requestTarget + "participants/" + id, true);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function(){
        let participant = JSON.parse(this.response);
        console.log(participant);
        document.getElementById("name").innerHTML = participant.firstName + " " + participant.lastName;
        
    };
    req.send();
}

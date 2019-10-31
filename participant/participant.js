let requestTarget = "http://localhost:8082/";
let tournamentDiv = document.getElementById("tournaments");
let tournaments;
let participant = {};

load();

/*Checks the search field and builds a table containing matching tournaments
*/
function searchTournament() {
    var search = document.getElementById("searchbar").value;
    console.log("Search: " + search);
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        //Get tournaments from backend
        if (this.readyState == 4 && this.status == 200) {
            tournaments = JSON.parse(req.responseText);
            console.log("Tournaments: " + tournaments);
            var table = document.createElement("TABLE");
            //Build table
            if(tournaments.length > 0){
                //Build rows
                for (var i = 0; i < tournaments.length; i++) {
                    var row = table.insertRow(i);
                    row.insertCell(0).innerHTML = tournaments[i].name;
                    var cell = row.insertCell(1);
                    //Check number of categories
                    if(tournaments[i].levels == null){
                        cell.innerHTML = "No categories known yet";
                    } else {
                        var string = "";
                        for (var j = 0; j < tournaments[i].levels.length; j++) {
                            string = string.concat(tournaments[i].levels[j] + ", ");
                            console.log("String: " + string);
                        }
                        cell.innerHTML = string.substring(0, string.length -2);
                    }
                    row.insertCell(2).innerHTML = tournaments[i].startDate;
                    row.insertCell(3).innerHTML = tournaments[i].endDate;
                    row.insertCell(4).innerHTML = tournaments[i].enrolDate;
                    
                    let button = document.createElement('BUTTON');
                    button.innerHTML = "View";
                    console.log("In onclick, id=: " + tournaments[i].id);
                    button.addEventListener('click', openTournament.bind(this, tournaments[i].id));
                    row.insertCell(5).appendChild(button);

                }
                //Build headers
                var header = table.createTHead();
                row = header.insertRow(0);
                row.insertCell(0).innerHTML = "<b>Tournament</b>";
                row.insertCell(1).innerHTML = "<b>Player Levels</b>";
                row.insertCell(2).innerHTML = "<b>Start Date</b>";
                row.insertCell(3).innerHTML = "<b>End Date<b>";
                row.insertCell(4).innerHTML = "<b>Enrol Date</b>";
                //Refresh table
                if(tournamentDiv.hasChildNodes()){
                    tournamentDiv.removeChild(tournamentDiv.children[0]);
                }
                tournamentDiv.appendChild(table);
            }
        }
    }
    req.open("GET", requestTarget + "tournaments/?mode=contains&search=" + search, true);
    req.send();
}

//Redirect to tournament page
function openTournament(tournamentId){
    console.log("In function, id=: " + tournamentId);
    window.location.href = 'tournament/tournament.html?id=' + tournamentId;

}

//Loads the participant from the backend
function load(){
    let id = new URL(location.href).searchParams.get('id')
    console.log(id);
    let req = new XMLHttpRequest();
    req.open("GET", requestTarget + "participants/" + id, true);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function(){
        participant = JSON.parse(this.response);
        localStorage.setItem("participant", this.response);
        console.log("Participant= " + localStorage.getItem("participant"));
        document.getElementById("name").innerHTML = participant.firstName + " " + participant.lastName;
        
    };
    req.send();
}

//Redirect to newUser page
function editUser(){
    window.location.href = 'newUser/newUser.html?id=' + participant.id;
}
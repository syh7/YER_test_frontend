let tournamentDiv = document.getElementById("tournaments");
let tournaments;
let participant = {};
let enrolledTournamentsDiv = document.getElementById("enrolledTournaments");

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
            if(tournamentDiv.hasChildNodes()){
                tournamentDiv.removeChild(tournamentDiv.children[0]);
            }
            makeTournamentTable(tournaments, tournamentDiv);
        }
    }
    req.open("GET", serverIP + "tournaments/?mode=contains&search=" + search, true);
    req.send();
}

//Loads the participant from the backend
function load(){
    let id = new URL(location.href).searchParams.get('id')
    console.log(id);
    let req = new XMLHttpRequest();
    req.open("GET", serverIP + "participants/" + id, true);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function(){
        participant = JSON.parse(this.response);
        localStorage.setItem("participant", this.response);
        console.log("Participant= " + localStorage.getItem("participant"));
        document.getElementById("name").innerHTML = participant.firstName + " " + participant.lastName;
        requestEnrolledTournaments();
    };
    req.send();
}

function requestEnrolledTournaments(){
    let req = new XMLHttpRequest();
    req.open("GET", serverIP + "participants/" + participant.id + "/tournaments", true);
    req.onload = function(){
        makeTournamentTable(JSON.parse(this.response), enrolledTournamentsDiv);
    }
    req.send();
}

function makeTournamentTable(tournaments, tourDiv){
    let table = document.createElement("table");
    //Build headers
    var header = table.createTHead();
    row = header.insertRow(0);
    row.insertCell(0).innerHTML = "<b>Tournament</b>";
    row.insertCell(1).innerHTML = "<b>Player Levels</b>";
    row.insertCell(2).innerHTML = "<b>Start Date</b>";
    row.insertCell(3).innerHTML = "<b>End Date<b>";
    row.insertCell(4).innerHTML = "<b>Enrol Date</b>";
    for(tournament of tournaments){
        row = table.insertRow();
        row.insertCell(-1).innerHTML = tournament.name;
        var levelsCell = row.insertCell(1);
        //Check number of categories
        if(tournament.levels == null){
            levelsCell.innerHTML = "No categories known yet";
        } else {
            for (level of tournament.levels) {
                levelsCell.innerHTML += level + ", ";
            }
            levelsCell.innerHTML = levelsCell.innerHTML.substring(0, levelsCell.innerHTML.length -2);
        }
        row.insertCell(-1).innerHTML = tournament.startDate;
        row.insertCell(-1).innerHTML = tournament.endDate;
        row.insertCell(-1).innerHTML = tournament.enrolDate;
        let button = document.createElement('BUTTON');
        button.innerHTML = "View";
        button.addEventListener('click', openTournament.bind(this, tournament.id));
        row.insertCell(-1).appendChild(button);
    }
    tourDiv.appendChild(table);
}

function requestGameStatistics(){
    let req = new XMLHttpRequest();
    req.open("GET", serverIP + "participants/" + participant.id + "/results", true);
    req.onload = function(){
        makeGamesChart(JSON.parse(this.response));
    }
    req.send();
}

function makeGamesChart(data){
    var options = {
        title: {
            text: "Total of won and lost games"
        },
        data: [{
                type: "pie",
                startAngle: 45,
                showInLegend: "true",
                legendText: "{label}",
                indexLabel: "{label} ({y})",
                yValueFormatString:"#,##0.#"%"",
                dataPoints: data
        }]
    };
    $("#chartContainer").CanvasJSChart(options);
}

//Redirect to newUser page
function editUser(){
    window.location.href = 'newUser/newUser.html?id=' + participant.id;
}

//Redirect to tournament page
function openTournament(tournamentId){
    console.log("In function, id=: " + tournamentId);
    window.location.href = '../tournament/tournament.html?id=' + tournamentId;
}
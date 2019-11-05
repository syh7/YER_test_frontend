let admin = {};
let tournamentsTable = document.getElementById("tournamentsTable");

load();

//Loads the participant from the backend
function load() {
    let id = new URL(location.href).searchParams.get('id');
    let req = new XMLHttpRequest();
    req.open("GET", serverIP + "admins/" + id, true);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function () {
        admin = JSON.parse(this.response);
        localStorage.setItem("admin", this.response);
        console.log("Admin= " + localStorage.getItem("admin"));
        document.getElementById("name").innerHTML = "Adminaccount " + admin.name;
        requestTournaments();
    };
    req.send();
}

function requestTournaments() {
    var header = tournamentsTable.createTHead();
    row = header.insertRow(0);
    row.insertCell(0).innerHTML = "<b>Tournament</b>";
    row.insertCell(1).innerHTML = "<b>Player Levels</b>";
    row.insertCell(2).innerHTML = "<b>Start Date</b>";
    row.insertCell(3).innerHTML = "<b>End Date<b>";
    row.insertCell(4).innerHTML = "<b>Enrol Date</b>";
    for (let i = 0; i < admin.tournamentIds.length; i++) {
        let req = new XMLHttpRequest();
        req.open("GET", serverIP + "tournaments/" + admin.tournamentIds[i], true);
        req.onload = function () {
            addTournament(JSON.parse(this.response));
        }
        req.send();
    }
}

function addTournament(tournament) {
    row = tournamentsTable.insertRow();
    row.insertCell(-1).innerHTML = tournament.name;
    var levelsCell = row.insertCell(1);
    //Check number of categories
    if (tournament.levels == null) {
        levelsCell.innerHTML = "No categories known yet";
    } else {
        for (level of tournament.levels) {
            levelsCell.innerHTML += level + ", ";
        }
        levelsCell.innerHTML = levelsCell.innerHTML.substring(0, levelsCell.innerHTML.length - 2);
    }
    row.insertCell(-1).innerHTML = tournament.startDate;
    row.insertCell(-1).innerHTML = tournament.endDate;
    row.insertCell(-1).innerHTML = tournament.enrolDate;
    let button = document.createElement('BUTTON');
    button.innerHTML = "View";
    button.addEventListener('click', openTournament.bind(this, tournament.id));
    row.insertCell(-1).appendChild(button);

}

//Redirect to newUser page
function editUser() {
    window.location.href = '../newadmin/newadmin.html?id=' + admin.id;
}

//Redirect to tournament page
function openTournament(tournamentId) {
    console.log("In function, id=: " + tournamentId);
    window.location.href = '../tournament/tournament.html?id=' + tournamentId;
}

function logout() {
    let b = confirm("Are you sure you want to logout?");
    if (b) {
        alert("You have logged out.");
        window.location.href = "../index/index.html";
    }
}
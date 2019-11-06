let searchTournamentContainer = document.getElementById("searchTournamentContainer");
let enrolledTournamentContainer = document.getElementById("enrolledTournamentContainer");
let chartDiv = document.getElementById("pieChart");
let tournaments;
let participant = {};

load();

/*Checks the search field and builds a table containing matching tournaments
*/
function searchTournament() {
    var search = document.getElementById("searchbar").value;
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        //Get tournaments from backend
        if (this.readyState == 4 && this.status == 200) {
            tournaments = JSON.parse(req.responseText);
            if (searchTournamentContainer.hasChildNodes()) {
                searchTournamentContainer.removeChild(searchTournamentContainer.children[0]);
            }
            makeTournamentTable(tournaments, searchTournamentContainer);
        }
    }
    req.open("GET", serverIP + "tournaments/?mode=contains&search=" + search, true);
    req.send();
}

//Loads the participant from the backend
function load() {
    let id = new URL(location.href).searchParams.get('id');
    let req = new XMLHttpRequest();
    req.open("GET", serverIP + "participants/" + id, true);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function () {
        participant = JSON.parse(this.response);
        localStorage.setItem("participant", this.response);
        console.log("Participant= " + localStorage.getItem("participant"));
        document.getElementById("name").innerHTML = participant.firstName + " " + participant.lastName;
        fillPersonalData();
    };
    req.send();
}

function fillPersonalData() {
    let h4 = document.createElement("h4");
    if (participant.enrolments[0] != undefined) {
        h4.innerHTML = "Enrolled tournaments"
        enrolledTournamentContainer.appendChild(h4);
        requestEnrolledTournaments();
        requestGameStatistics();
    } else {
        h4.innerHTML = "You have not enrolled in any tournaments yet. Go have some fun!"
        enrolledTournamentContainer.appendChild(h4);
    }
}

function requestEnrolledTournaments() {
    let req = new XMLHttpRequest();
    req.open("GET", serverIP + "participants/" + participant.id + "/tournaments", true);
    req.onload = function () {
        makeTournamentTable(JSON.parse(this.response), enrolledTournamentContainer);
    }
    req.send();
}

function makeTournamentTable(tournaments, tourDiv) {
    let table = document.createElement("table");
    table.classList.add("table", ".table-striped", ".table-bordered");
    //Build headers
    var header = table.createTHead();
    row = header.insertRow(0);
    row.insertCell(0).innerHTML = "<b>Tournament</b> &#x2193;";
    row.insertCell(1).innerHTML = "<b>Player Levels</b> &#x2193;";
    row.insertCell(2).innerHTML = "<b>Start Date</b> &#x2193;";
    row.insertCell(3).innerHTML = "<b>End Date<b> &#x2193;";
    row.insertCell(4).innerHTML = "<b>Enrol Date</b> &#x2193;";

    for (let i = 0; i < row.cells.length; i++) {
        row.cells[i].onclick = function () {
            sortTable(table, i);
        }
    }

    for (tournament of tournaments) {
        row = table.insertRow();
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
    tourDiv.appendChild(table);
    sortTable(table, 0);
}

function sortTable(table, n) {
    let rows, switching, i, x, y, shouldSwitch;
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function requestGameStatistics() {
    let req = new XMLHttpRequest();
    req.open("GET", serverIP + "participants/" + participant.id + "/results", true);
    req.onload = function () {
        let parsedResponse = JSON.parse(this.response);
        if (parsedResponse[0] > 0) {
            makeGamesChart(parseStatistics(parsedResponse));
        }
    }
    req.send();
}

function parseStatistics(data) {
    let parsedData = [];
    parsedData.push({ y: data[1], indexLabel: "Won", color: "#00ff00" });
    parsedData.push({ y: data[2], indexLabel: "Lost", color: "#ff0000" });
    return parsedData;
}
function makeGamesChart(participantData) {
    let myPieChart = new CanvasJS.Chart(chartDiv, {
        backgroundColor: "white",
        colorSet: "colorSet2",
        title: {
            text: "Game statistics"
        },
        animationEnabled: true,
        interactivityEnabled: false,
        data: [{
            indexLabelFontSize: 15,
            indexLabelFontFamily: "Monospace",
            indexLabelFontColor: "darkgrey",
            indexLabelLineColor: "darkgrey",
            indexLabelPlacement: "outside",
            type: "pie",
            showInLegend: true,
            legendText: "{indexLabel}",
            toolTipContent: "<strong>#percent%</strong>",
            dataPoints: participantData
        }]
    });
    myPieChart.render();
}

//Redirect to newUser page
function editUser() {
    window.location.href = '../newparticipant/newparticipant.html?id=' + participant.id;
}

//Redirect to tournament page
function openTournament(tournamentId) {
    window.location.href = '../tournament/tournament.html?id=' + tournamentId;
}

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        alert("You have logged out.");
        window.location.href = "../index.html";
    }
}
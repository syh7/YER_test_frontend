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
    let header = tournamentsTable.createTHead();
    row = header.insertRow(0);
    row.insertCell(0).innerHTML = "<b>Tournament</b>&#x2193;";
    row.insertCell(1).innerHTML = "<b>Player Levels</b> &#x2193;";
    row.insertCell(2).innerHTML = "<b>Start Date</b> &#x2193;";
    row.insertCell(3).innerHTML = "<b>End Date<b> &#x2193;";
    row.insertCell(4).innerHTML = "<b>Enrol Date</b> &#x2193;";
    
    for(let i = 0; i < row.cells.length; i++){
        console.log("test " + i);
        row.cells[i].onclick = function(){
            sortTable(i);
        }
    }

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
    let levelsCell = row.insertCell(1);
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
    sortTable(0);
}

function sortTable(n) {
    let rows, switching, i, x, y, shouldSwitch;
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = tournamentsTable.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
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
    if (confirm("Are you sure you want to logout?")) {
        alert("You have logged out.");
        window.location.href = "../index.html";
    }
}
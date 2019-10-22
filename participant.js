let requestTarget = "http://localhost:8082/";
let tournamentDiv = document.getElementById("tournaments");

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
                button.onclick = openTournament(tournaments[i].id);
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
    window.location.href = 'tournament/?id=' + tournamentId;

}
/* send request to localhost, get info for (get param)
            get document etc info .innerhtml = tournament.info */

let requestTarget = "http://localhost:8082/";
let tournament = {};

load();

function load(){
    let id = new URL(location.href).searchParams.get('id')
    console.log(id);
    let req = new XMLHttpRequest();
    req.open("GET", requestTarget + "tournaments/" + id, true);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function(){
        tournament = JSON.parse(this.response);
        console.log(tournament);
        document.getElementById("tournamentName").innerHTML = tournament.name;
        document.getElementById("info").innerHTML = tournament.description;
    };
    req.send();
}

function enrol(){
    console.log("In enrol(): " + tournament.id);
    window.location.href = "enrolment.html?id=" + tournament.id + "&t=" + tournament.name;
}
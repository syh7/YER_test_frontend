let tournament = {};

load();

/* Load tournament info from backend, also save it locally
*/
function load(){
    let id = new URL(location.href).searchParams.get('id')
    console.log(id);
    let req = new XMLHttpRequest();
    req.open("GET", serverIP + "tournaments/" + id, true);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function(){
        tournament = JSON.parse(this.response);
        localStorage.setItem("tournament", this.response);
        console.log(localStorage.getItem("tournament"));
        document.getElementById("tournamentName").innerHTML = tournament.name;
        document.getElementById("info").innerHTML = tournament.description;
    };
    req.send();
}

/* Redirect to enrolment page
*/
function enrol(){
    console.log("In enrol(): " + tournament.id);
    //window.localStorage.setItem("tournament", tournament);
    window.location.href = "../enrolment/enrolment.html";
}
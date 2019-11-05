let tournament = {};

load();

/* Load tournament info from backend, also save it locally
*/
function load() {
    let id = new URL(location.href).searchParams.get('id')
    console.log(id);
    let req = new XMLHttpRequest();
    req.open("GET", serverIP + "tournaments/" + id, true);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function () {
        tournament = JSON.parse(this.response);
        localStorage.setItem("tournament", this.response);
        console.log(localStorage.getItem("tournament"));
        document.getElementById("tournamentName").innerHTML = tournament.name;
        document.getElementById("info").innerHTML = tournament.description;
        setPhaseDiv();
    };
    req.send();
}

function setPhaseDiv(){
    let phaseDiv = document.getElementById("phaseDiv");
    let currentDate = new Date();
    if(new Date(tournament.enrolDate) > currentDate){ //enroldate not yet then enrolment phase
        phaseDiv.innerHTML = "Enrolments are open.";
        phaseDiv.classList.add("enrolment");
    } else if(new Date(tournament.startDate) > currentDate){ //enroldate passed, not started yet
        phaseDiv.innerHTML = "Enrolments are closed.";
    } else if(new Date(tournament.endDate) > currentDate){ //started, not finished yet
        phaseDiv.innerHTML = "Tournament has started.";
        phaseDiv.classList.add("started");
    } else { //finished
        phaseDiv.innerHTML = "Tournament has finished.";
    }
}

/* Redirect to enrolment page
*/
function enrol() {
    console.log("In enrol(): " + tournament.id);
    //window.localStorage.setItem("tournament", tournament);
    window.location.href = "enrolment/enrolment.html";
}

function goHome(){
    let participant = localStorage.getItem("participant");
    if(participant !== null){
        window.location.href = "../participant/participant.html?id=" + participant.id;
    } else {
        let admin = localStorage.getItem("admin");
        if(admin !== null){
            window.location.href = "../admin/admin.html?id=" + admin.id;
        } else {
            alert("Not logged in as participant or admin.");
        }
    }
}

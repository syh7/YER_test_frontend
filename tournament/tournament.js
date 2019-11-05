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
        setInfoDiv();
        setPhaseDiv();
    };
    req.send();
}

function setInfoDiv(){
    document.getElementById("levelsDiv").innerHTML = tournament.levels;
    document.getElementById("locationDiv").innerHTML = tournament.location;
    document.getElementById("disciplinesDiv").innerHTML = tournament.maxDisciplines;
    setAdminName();

    document.getElementById("refereeDiv").innerHTML = tournament.referee;
    document.getElementById("descriptionDiv").innerHTML = tournament.description;
}

function setAdminName(){
    let req = new XMLHttpRequest();
    req.open("GET", serverIP + "admins/" + tournament.adminId, true);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function () {
        document.getElementById("adminDiv").innerHTML = JSON.parse(this.response).name;
    };
    req.send();
}

/* Sets tournament phase dependant on tournament dates
*/
function setPhaseDiv(){
    let phaseDiv = document.getElementById("phaseDiv");
    let currentDate = new Date();
    if(new Date(tournament.enrolDate) > currentDate){ //enroldate not yet then enrolment phase
        phaseDiv.innerHTML = "Enrolments are open.";
        phaseDiv.classList.add("enrolment");

        let button = document.createElement("button");
        button.onclick = function(){
            enrol();
        }
        button.classList.add("btn");
        button.innerHTML = "Enrol in tournament.";
        document.getElementById("infoDiv").after(button);

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
    window.location.href = "../enrolment/enrolment.html";
}

/* If participant, goes to participant/participant. Otherwise checks if admin, then goes to admin/admin.
    Otherwise, gives error that you're not logged in.
*/
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

function goBack(){
    window.history.back();
}

function editUser(){
    let participant = JSON.parse(localStorage.getItem("participant"));
    if(participant !== null){
        window.location.href = "../newparticipant/newparticipant.html?id=" + participant.id;
    } else {
        let admin = JSON.parse(localStorage.getItem("admin"));
        if(admin !== null){
            window.location.href = "../newadmin/newadmin.html?id=" + admin.id;
        } else {
            alert("Not logged in as participant or admin.");
        }
    }
}

function logout() {
    let b = confirm("Are you sure you want to logout?");
    if (b) {
        alert("You have logged out.");
        window.location.href = "../index/index.html";
    }
}
let tournament = {};
let enrolment = {};
let participant = {};
let newEnrolmentWrapper = {};

load()

/* Load tournament and participant data
*  Displays # of enrolmentforms equal to maxDisciplines
*/
function load() {
    tournament = JSON.parse(localStorage.getItem("tournament"));
    participant = JSON.parse(localStorage.getItem("participant"));
    console.log(tournament);
    console.log(participant);
    document.getElementById("name").innerHTML = tournament.name;
    if (tournament.maxDisciplines > 1) {
        for (let i = 1; i < tournament.maxDisciplines; i++) {
            let disc = $("#disciplineRow1").clone();
            disc[0].id = "disciplineRow" + (i + 1);
            disc.appendTo($("#disciplineDiv"));
        }
    }
}

/* Disables partner inputfield if it is a singles discipline
*/
function checkPartner(disciplineDropdown) {
    console.log(disciplineDropdown);
    console.log(disciplineDropdown.value);
    if (disciplineDropdown.value.includes("SINGLE")) {
        console.log("true");
        $(disciplineDropdown).siblings(".leagueNumber")[0].disabled = true;
        $(disciplineDropdown).siblings(".leagueNumber")[0].value = "";
    } else {
        console.log("false");
        $(disciplineDropdown).siblings(".leagueNumber")[0].disabled = false;
    }
}

/* Sends new enrolment to the backend 
*/
function sendEnrolment() {
    buildNewEnrolmentWrapper();
    let JSONnewEnrolmentWrapper = JSON.stringify(newEnrolmentWrapper);
    console.log(JSONnewEnrolmentWrapper);
    let req = new XMLHttpRequest();
    req.open("POST", serverIP + "tournaments/" + tournament.id + "/enrol", true);
    req.onload = function () {
        console.log(JSON.parse(this.responseText));
        alert(participant.firstName + " " + participant.lastName + " has enrolled.");
    }
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSONnewEnrolmentWrapper);
}

/*  Constructs the JSON file containing enrolmentDTOs
*/
function buildNewEnrolmentWrapper() {
    let enrolmentDTOs = [];
    for (let i = 1; i < tournament.maxDisciplines + 1; i++) {
        let enrolmentDTO = {};
        enrolmentDTO.tournamentId = tournament.id;
        enrolmentDTO.participantIds = [3];
        let discipline = $("#disciplineRow" + i).children(".discipline")[0];
        if ($(discipline).val() != "DEFAULT") {
            enrolmentDTO.discipline = $(discipline).val();
            console.log(discipline);
            console.log(enrolmentDTO.discipline);
            let level = $("#disciplineRow" + i).children(".playerLevel")[0];
            enrolmentDTO.playerLevel = $(level).val();
            console.log(enrolmentDTO.playerLevel);
            let partnerLeagueNumber = $("#disciplineRow" + i).children(".leagueNumber")[0];
            if (partnerLeagueNumber.disabled) {
                enrolmentDTO.partnerLeagueNumber = 0;
            } else {
                enrolmentDTO.partnerLeagueNumber = $(partnerLeagueNumber).val();
            }
            console.log(enrolmentDTO.partnerLeagueNumber);
            enrolmentDTOs[i - 1] = enrolmentDTO;
            console.log(enrolmentDTOs);
        }
    }
    newEnrolmentWrapper.participantId = participant.id;
    newEnrolmentWrapper.enrolmentDTOs = enrolmentDTOs;
}

/* If participant, goes to participant/participant. Otherwise checks if admin, then goes to admin/admin.
    Otherwise, gives error that you're not logged in.
*/
function goHome(){
    let participant = JSON.parse(localStorage.getItem("participant"));
    if(participant !== null){
        window.location.href = "../participant/participant.html?id=" + participant.id;
    } else {
        let admin = JSON.parse(localStorage.getItem("admin"));
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
    if (confirm("Are you sure you want to logout?")) {
        alert("You have logged out.");
        window.location.href = "../index/index.html";
    }
}
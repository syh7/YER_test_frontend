let tournament = {};
let enrolment = {};
let participant = {};

load()

/* Load tournament and participant data
*  Displays # of enrolmentforms equal to maxDisciplines
*/
function load() {
    tournament = JSON.parse(localStorage.getItem("tournament"));
    participant = JSON.parse(localStorage.getItem("participant"));
    console.log(tournament);
    console.log("Tournament.id: = " + tournament.id);
    console.log("Participant.firstName = " + participant.firstName)
    document.getElementById("name").innerHTML = tournament.name;
    if (tournament.maxDisciplines > 1) {
        console.log("Max Disciplines: " + tournament.maxDisciplines);

        for (let i = 1; i < tournament.maxDisciplines; i++) {
            console.log("Building " + i + " clone");
            let disc = $("#disciplineRow1").clone();
            console.log(disc);
            disc[0].id = "disciplineRow" + (i + 1);
            disc.appendTo($("#disciplineDiv"));
            console.log($("#disciplineDiv"));
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

/* TODO
*  Sends new enrolment to the backend 
*/
function submit() {
    alert(participant.firstName + " " + participant.lastName + " has enrolled!")
    buildJSON();
}

/*  Constructs the JSON file containing enrolmentDTOs
*/
function buildJSON() {
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
            enrolmentDTOs[i-1] = enrolmentDTO;
            console.log(enrolmentDTOs);
        }
    }
    let newEnrolmentWrapper = {}
    newEnrolmentWrapper.participantId = participant.id;
    newEnrolmentWrapper.enrolmentDTOs = enrolmentDTOs;
    let JSONnewEnrolmentWrapper = JSON.stringify(newEnrolmentWrapper);
    console.log(JSONnewEnrolmentWrapper);
}
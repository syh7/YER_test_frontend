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

/*  Constructs the JSON file containing enrolmentDTO
*/
function buildJSON() {
    let enrolments = [];
    for (let i = 1; i < tournament.maxDisciplines + 1; i++) {
        let enrolment = {};
        let discipline = $("#disciplineRow" + i).children(".discipline")[0];
        if ($(discipline).val() != "DEFAULT") {
            
            enrolment.discipline = $(discipline).val();
            console.log(discipline);
            //enrolment.discipline = $("#disciplineRow" + i).find(":selected").val();
            console.log(enrolment.discipline);
            let level = $("#disciplineRow" + i).children(".playerLevel")[0];
            enrolment.playerLevel = $(level).val();
            console.log(enrolment.playerLevel);
            let partnerLeagueNumber = $("#disciplineRow" + i).children(".leagueNumber")[0];
            if (partnerLeagueNumber.disabled) {
                enrolment.partnerLeagueNumber = 0;
            } else {
                enrolment.partnerLeagueNumber = $(partnerLeagueNumber).val();
            }
            console.log(enrolment.partnerLeagueNumber);
            enrolments[i-1] = enrolment;
            console.log(enrolments);
        }
    }
    let JSONenrolmentDTO = JSON.stringify(participant.id + enrolments);
    console.log(JSONenrolmentDTO);
}
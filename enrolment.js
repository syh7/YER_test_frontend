let requestTarget = "http://localhost:8082/";
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
    if(tournament.maxDisciplines > 1){
        console.log("Max Disciplines: " + tournament.maxDisciplines);
        
        for(let i = 1; i < tournament.maxDisciplines; i++){
            console.log("Building " + i + " clone");
            let disc = $("#disciplineRow1").clone();
    //TOFIX
            disc.id = "disciplineRow2";
            disc.appendTo($("#disciplineDiv"));
        }
    }
}

/* Disables partner inputfield if it is a singles discipline
*/
function checkPartner(disciplineDropdown){
    console.log(disciplineDropdown);
    console.log(disciplineDropdown.value);
    if(disciplineDropdown.value.includes("SINGLE")){
        console.log("true");
        $(disciplineDropdown).siblings(".leagueNumber")[0].disabled = true;
        $(disciplineDropdown).siblings(".leagueNumber")[0].value="";
    } else {
        console.log("false");
        $(disciplineDropdown).siblings(".leagueNumber")[0].disabled = false;
    }
}

/* TODO
*  Sends new enrolment to the backend 
*/
function submit(){
    buildJSON();
}

/*  Constructs the JSON file containing enrolmentDTO
*/
function buildJSON(){
    let enrolments = [];
    for(let i = 0; i < tournament.maxDisciplines; i++){
        //enrolment.partnerLeagueNumber = ;
    }
    console.log(JSON.stringify(participant.id + enrolments));

    
}
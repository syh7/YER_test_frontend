let requestTarget = "http://localhost:8082/";
let tournament = {};

load()
function load() {
    tournament = JSON.parse(localStorage.getItem("tournament"));
    console.log(tournament);
    console.log("Tournament.id: " + tournament.id);
    document.getElementById("name").innerHTML = tournament.name;
    if(tournament.maxDisciplines > 1){
        console.log("Max Disciplines: " + tournament.maxDisciplines);
        
        for(let i = 1; i < tournament.maxDisciplines; i++){
            console.log("Building " + i + " clone");
            let disc = $("#disciplineRow1").clone();
            disc.appendTo($("#disciplineDiv"));
        }
    }
}

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

function submit(){
    
}
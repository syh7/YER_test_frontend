let requestTarget = "http://localhost:8082/";
let tournament = {};

load()
function load() {
    tournament = JSON.parse(window.localStorage.getItem("tournament"));
    console.log(tournament);
    console.log("Tournament.id: " + tournament.id);
    document.getElementById("name").innerHTML = tournament.name;
}

function submit(){
    
}
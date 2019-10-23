/* send request to localhost, get info for (get param)
            get document etc info .innerhtml = tournament.info */

let requestTarget = "http://localhost:8082/";

load();

function load(){
    let id = new URL(location.href).searchParams.get('id')
    console.log(id);
    let req = new XMLHttpRequest();
    req.open("GET", requestTarget + "tournaments/" + id, true);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function(){
        let tournament = JSON.parse(this.response);
        console.log(tournament);
        document.getElementById("tournamentName").innerHTML = tournament.name;
        //document.getElementById("info").innerHTML = tournament.info;
    };
    req.send();
}

//TODO
function enrol(){
    
}
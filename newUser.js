let requestTarget = "http://localhost:8082/";
let participant;
let urlId;
onLoad();


function onLoad(){
    urlId = new URL(location.href).searchParams.get('id');
    if(urlId == null){
        console.log("No user");
        participant = {};
    } else {
        getParticipant();
        console.log(participant);
        loadUserInput();
        console.log("Participant= " + participant.firstName);
        document.getElementById("newUser").onclick = function(){
            update();
        };
    }
}

function newParticipant() {
    if(checkPassword()){  
        let req = new XMLHttpRequest();
        req.open("POST", requestTarget + "participants", true);
        //req.responseType = "json";
        req.onload = function() {
            console.log(JSON.parse(this.responseText).id);
            openUser(JSON.parse(this.responseText).id);
        }
        req.setRequestHeader("Content-Type", "application/json");
        participant = req.send(JSON.stringify(getUserInput()));
        localStorage.setItem("participant", participant);
    } else {
        alert("Passwords do not matchTEST");
    }
}

function getParticipant(){
    let req = new XMLHttpRequest();
    req.open("GET", requestTarget + "participants/" + urlId, false);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function(){
        participant = JSON.parse(this.response);
        localStorage.setItem("participant", this.response);
        console.log(JSON.parse(localStorage.getItem("participant")));
    };
    req.send();
}

function getUserInput() {
    participant.email = document.getElementById("email").value;
    participant.password = document.getElementById("password").value;
    participant.firstName = document.getElementById("firstName").value;
    participant.lastName = document.getElementById("lastName").value;
    participant.playerLevel = document.getElementById("playerLevel").value;
    participant.dateOfBirth = document.getElementById("dateOfBirth").value;
    participant.leagueNumber = document.getElementById("leagueNumber").value;
    let gender = $("input[type='radio'][name='gender']:checked").val();
    participant.isMale = gender == "male";
    console.log(JSON.stringify(participant));
    return participant;
}

function loadUserInput() {
    console.log(participant.email);
    document.getElementById("email").value = participant.email;
    document.getElementById("password").value = participant.password;
    document.getElementById("firstName").value = participant.firstName;
    document.getElementById("lastName").value = participant.lastName;
    document.getElementById("playerLevel").value = participant.playerLevel;
    document.getElementById("dateOfBirth").value = participant.dateOfBirth;
    document.getElementById("leagueNumber").value = participant.leagueNumber;
    console.log(participant.male);
    if(participant.male == true){
        $("input[type='radio'][value='male']").attr("checked", true);
    } else {
        $("input[type='radio'][name='female'']").attr("checked", true);
    }
}

function checkPassword(){
    if(document.getElementById("password").value == document.getElementById("passwordConfirm").value){
        return true;
    } else {
        return false;
    }
}

function update(){
    if(checkPassword()){  
        let req = new XMLHttpRequest();
        req.open("PUT", requestTarget + "participants/" + participant.id, true);
        //req.responseType = "json";
        req.onload = function() {
            console.log(JSON.parse(this.responseText).id);
            alert("User updated");
            openUser(JSON.parse(this.responseText).id);
        }
        req.setRequestHeader("Content-Type", "application/json");
        participant = req.send(JSON.stringify(getUserInput()));
        localStorage.setItem("participant", participant);
    } else {
        alert("Passwords do not matchTEST");
    }
}

function openUser(userId){
    console.log("In openUser(): " + userId);
    //alert("In openUser()");
    window.location.href = 'participant.html?id=' + userId;
}
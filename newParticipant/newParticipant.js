let participant = {};
let urlId;
onLoad();

/*Check if user is already logged in, in that case fill in their
* data and change the function to updating
*/
function onLoad() {
    urlId = new URL(location.href).searchParams.get('id');
    if (urlId == null) {
        console.log("No user");
    } else {
        getParticipant();
        loadUserInput();
        document.getElementById("newParticipantBtn").onclick = function () {
            update();
        };
        document.getElementById("backBtn").onclick = function () {
            goBack();
        };
    }
}

/*Post a new Participant to the backend, also saves 
* participantdata locally
*/
function newParticipant() {
    if (checkPassword() && checkLeagueNumber() && checkNotNull()) {
        let req = new XMLHttpRequest();
        console.log("URL = " + serverIP + "participants");
        req.open("POST", serverIP + "participants", true);
        req.onload = function () {
            localStorage.setItem("participant", participant);
            alert(participant.firstName + " " + participant.lastName + " aangemaakt");
            openUser(JSON.parse(this.responseText).id);
        }
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(getUserInput()));
    }
}

/*Gets participantdata from the backend
*/
function getParticipant() {
    let req = new XMLHttpRequest();
    req.open("GET", serverIP + "participants/" + urlId, false);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function () {
        localStorage.setItem("participant", this.response);
    };
    req.send();
}

/*Puts data from inputfields into participant object
*/
function getUserInput() {
    participant.email = document.getElementById("email").value;
    participant.password = document.getElementById("password").value;
    participant.firstName = document.getElementById("firstName").value;
    participant.lastName = document.getElementById("lastName").value;
    participant.playerLevel = document.getElementById("playerLevel").value;
    participant.dateOfBirth = document.getElementById("dateOfBirth").value;
    participant.leagueNumber = document.getElementById("leagueNumber").value;
    let gender = $("input[type='radio'][name='gender']:checked").val();
    participant.male = gender == "male";
    return participant;
}

/*Loads data from participant object into inputfields
*/
function loadUserInput() {
    console.log(participant.email);
    document.getElementById("email").value = participant.email;
    document.getElementById("password").value = participant.password;
    document.getElementById("firstName").value = participant.firstName;
    document.getElementById("lastName").value = participant.lastName;
    document.getElementById("playerLevel").value = participant.playerLevel;
    document.getElementById("dateOfBirth").value = participant.dateOfBirth;
    document.getElementById("leagueNumber").value = participant.leagueNumber;
    if (participant.male == true) {
        $("input[type='radio'][value='male']").attr("checked", true);
    } else {
        $("input[type='radio'][name='female']").attr("checked", true);
    }
}

/*Checks if passwords in inputfields match
*/
function checkPassword() {
    if (document.getElementById("password").value == document.getElementById("passwordConfirm").value) {
        return true;
    } else {
        alert("Passwords do not match.");
        return false;
    }
}

/*Check input is not null
*/
function checkNotNull(){
    if(document.getElementById("email").value === "" || document.getElementById("password").value === ""
        || document.getElementById("firstName").value === "" || document.getElementById("lastName").value === ""
        || document.getElementById("playerLevel").value === "" || document.getElementById("dateOfBirth").value === ""
        || document.getElementById("leagueNumber").value === ""){
        alert("Please fill in all the fields.")
        return false;
    }
    return true;
}

/*Check league number is not 0
*/
function checkLeagueNumber(){
    if(document.getElementById("leagueNumber").value === "0"){
        alert("League number cannot be 0.");
        return false;
    }
    return true;
}

/*Updates the database with new participant data
*/
function update() {
    if (checkPassword() && checkLeagueNumber() && checkNotNull()) {
        let req = new XMLHttpRequest();
        req.open("PUT", serverIP + "participants/" + participant.id, true);
        req.onload = function () {
            alert("User updated");
        }
        req.setRequestHeader("Content-Type", "application/json");
        participant = req.send(JSON.stringify(getUserInput()));
        localStorage.setItem("participant", participant);
    }
}

/*Redirect to participant page
*/
function openUser(userId) {
    window.location.href = '../participant/participant.html?id=' + userId;
}

function goBack(){
    window.history.back();
}

function goSignIn(){
    window.location.href = "../index.html";
}
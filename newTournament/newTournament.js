let tournament = {};
let admin = {};

load();
function load() {
    admin = JSON.parse(localStorage.getItem("admin"));
}

function newTournament() {
    if (checkNotNull()) {
        if (levelsFormatCorrect()) {
            fillTournament();
            sendTournament(makeWrapper());
        } else {
            alert("Use the correct format for levels");
        }
    }
}

function fillTournament() {
    tournament.name = document.getElementById("name").value;
    tournament.description = document.getElementById("description").value;
    tournament.referee = document.getElementById("referee").value;
    tournament.location = document.getElementById("location").value;
    tournament.startDate = document.getElementById("startDate").value;
    tournament.endDate = document.getElementById("endDate").value;
    tournament.enrolDate = document.getElementById("enrolDate").value;
    tournament.maxDisciplines = document.getElementById("maxDisciplines").value;
    tournament.levels = document.getElementById("levels").value.replace(' ', '').replace(',', '').split("");
    tournament.admin = admin;
}

function makeWrapper() {
    let obj = {};
    obj.adminId = admin.id;
    obj.tournament = tournament;
    return obj;
}

function sendTournament(wrapper) {
    let req = new XMLHttpRequest();
    req.open("POST", serverIP + "tournaments", true);
    req.onload = function () {
        alert(tournament.name + " has been made.");
        goHome();
    }
    req.setRequestHeader("Content-Type", "application/json");
    admin = req.send(JSON.stringify(wrapper));
}

function checkNotNull() {
    if (document.getElementById("name").value === "" || document.getElementById("startDate").value === ""
        || document.getElementById("endDate").value === "" || document.getElementById("enrolDate").value === "") {
        alert("Please fill in all required fields.")
        return false;
    }
    return true;
}

function levelsFormatCorrect() {
    let pattern = /^[0-9],?\s?[0-9],?\s?[0-9]$/;
    return pattern.test(document.getElementById("levels").value) || document.getElementById("levels").value === "";
}

function goHome() {
    let admin = JSON.parse(localStorage.getItem("admin"));
    window.location.href = "../admin/admin.html?id=" + admin.id;
}

function goBack() {
    window.history.back();
}

function editUser() {
    let admin = JSON.parse(localStorage.getItem("admin"));
    window.location.href = "../newadmin/newadmin.html?id=" + admin.id;
}

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        alert("You have logged out.");
        window.location.href = "../index/index.html";
    }
}
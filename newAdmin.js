let requestTarget = "http://localhost:8082/";
let admin;
let urlId;
onLoad();


function onLoad(){
    urlId = new URL(location.href).searchParams.get('id');
    if(urlId == null){
        console.log("No user");
        admin = {};
    } else {
        getAdmin();
        console.log(admin);
        loadUserInput();
        console.log("Admin= " + admin.name);
        document.getElementById("newUser").onclick = function(){
            update();
        };
    }
}

function newAdmin() {
    if(checkPassword()){  
        let req = new XMLHttpRequest();
        req.open("POST", requestTarget + "admins", true);
        //req.responseType = "json";
        req.onload = function() {
            console.log(JSON.parse(this.responseText).id);
            openUser(JSON.parse(this.responseText).id);
        }
        req.setRequestHeader("Content-Type", "application/json");
        admin = req.send(JSON.stringify(getUserInput()));
        localStorage.setItem("admin", admin);
    } else {
        alert("Passwords do not matchTEST");
    }
}

function getAdmin(){
    let req = new XMLHttpRequest();
    req.open("GET", requestTarget + "admins/" + urlId, false);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function(){
        admin = JSON.parse(this.response);
        localStorage.setItem("admin", this.response);
        console.log(JSON.parse(localStorage.getItem("admin")));
    };
    req.send();
}

function getUserInput() {
    admin.name = document.getElementById("name").value;
    admin.email = document.getElementById("email").value;
    admin.password = document.getElementById("password").value;
    console.log(JSON.stringify(admin));
    return admin;
}

function loadUserInput() {
    console.log(admin.email);
    document.getElementById("firstName").value = admin.name;
    document.getElementById("email").value = admin.email;
    document.getElementById("password").value = admin.password;
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
        req.open("PUT", requestTarget + "admins/" + participant.id, true);
        //req.responseType = "json";
        req.onload = function() {
            console.log(JSON.parse(this.responseText).id);
            alert("User updated");
            openUser(JSON.parse(this.responseText).id);
        }
        req.setRequestHeader("Content-Type", "application/json");
        participant = req.send(JSON.stringify(getUserInput()));
        localStorage.setItem("admin", admin);
    } else {
        alert("Passwords do not matchTEST");
    }
}

function openUser(userId){
    console.log("In openUser(): " + userId);
    alert("In openUser()");
    //window.location.href = 'admin.html?id=' + userId;
}
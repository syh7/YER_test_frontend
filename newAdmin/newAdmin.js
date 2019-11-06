let admin = {};
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
        getAdmin();
        loadUserInput();
        document.getElementById("newAdminBtn").onclick = function () {
            update();
        };
        document.getElementById("backBtn").onclick = function () {
            goBack();
        };
    }
}

/*Post a new Admin to the backend, also saves admindata locally
*/
function newAdmin() {
    if (checkPassword() && checkNotNull()) {
        let req = new XMLHttpRequest();
        req.open("POST", serverIP + "admins", true);
        req.onload = function () {
            localStorage.setItem("admin", admin);
            alert(admin.name + " aangemaakt");
            openUser(JSON.parse(this.responseText).id);
        }
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(getUserInput()));
    }
}

/*Gets admindata from the backend
*/
function getAdmin() {
    let req = new XMLHttpRequest();
    req.open("GET", serverIP + "admins/" + urlId, false);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function () {
        admin = JSON.parse(this.response);
        localStorage.setItem("admin", this.response);
    };
    req.send();
}

/*Puts data from inputfields into admin object
*/
function getUserInput() {
    admin.name = document.getElementById("name").value;
    admin.email = document.getElementById("email").value;
    admin.password = document.getElementById("password").value;
    return admin;
}

/*Loads data from admin object into inputfields
*/
function loadUserInput() {
    document.getElementById("name").value = admin.name;
    document.getElementById("email").value = admin.email;
    document.getElementById("password").value = admin.password;
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

/*Updates the database with new admin data
*/
function update() {
    if (checkPassword()) {
        let req = new XMLHttpRequest();
        req.open("PUT", serverIP + "admins/" + admin.id + "/newPassword", true);
        //req.responseType = "json";
        req.onload = function () {
            alert("User updated");
            openUser(JSON.parse(this.responseText).id);
        }
        req.setRequestHeader("Content-Type", "application/json");
        admin = req.send(JSON.stringify(getUserInput()));
        localStorage.setItem("admin", admin);
    }
}

/*Redirect to admin page
*/
function openUser(userId) {
    window.location.href = '../admin/admin.html?id=' + userId;
}

function goBack(){
    window.history.back();
}

function goSignIn(){
    window.location.href = "../index.html";
}
let admin;
let urlId;
onLoad();

/*Check if user is already logged in, in that case fill in their
* data and change the function to updating
*/
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

/*Post a new Admin to the backend, also saves admindata locally
*/
function newAdmin() {
    if(checkPassword()){  
        let req = new XMLHttpRequest();
        req.open("POST", serverIP + "admins", true);
        //req.responseType = "json";
        req.onload = function() {
            console.log(JSON.parse(this.responseText).id);
            localStorage.setItem("admin", admin);
            alert(admin.name + " aangemaakt");
            openUser(JSON.parse(this.responseText).id);
        }
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(getUserInput()));
        
    } else {
        alert("Passwords do not matchTEST");
    }
}

/*Gets admindata from the backend
*/
function getAdmin(){
    let req = new XMLHttpRequest();
    req.open("GET", serverIP + "admins/" + urlId, false);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function(){
        admin = JSON.parse(this.response);
        localStorage.setItem("admin", this.response);
        console.log(JSON.parse(localStorage.getItem("admin")));
    };
    req.send();
}

/*Puts data from inputfields into admin object
*/
function getUserInput() {
    admin.name = document.getElementById("name").value;
    admin.email = document.getElementById("email").value;
    admin.password = document.getElementById("password").value;
    console.log(JSON.stringify(admin));
    return admin;
}

/*Loads data from admin object into inputfields
*/
function loadUserInput() {
    console.log(admin.email);
    document.getElementById("name").value = admin.name;
    document.getElementById("email").value = admin.email;
    document.getElementById("password").value = admin.password;
}

/*Checks if passwords in inputfields match
*/
function checkPassword(){
    if(document.getElementById("password").value == document.getElementById("passwordConfirm").value){
        return true;
    } else {
        return false;
    }
}

/*Updates the database with new admin data
*/
function update(){
    if(checkPassword()){  
        let req = new XMLHttpRequest();
        req.open("PUT", serverIP + "admins/" + admin.id + "/newPassword", true);
        //req.responseType = "json";
        req.onload = function() {
            console.log(JSON.parse(this.responseText).id);
            alert("User updated");
            openUser(JSON.parse(this.responseText).id);
        }
        req.setRequestHeader("Content-Type", "application/json");
        admin = req.send(JSON.stringify(getUserInput()));
        localStorage.setItem("admin", admin);
    } else {
        alert("Passwords do not matchTEST");
    }
}

/*Redirect to admin page
*/
function openUser(userId){
    console.log("In openUser(): " + userId);
    alert("In openUser()");
    //window.location.href = 'admin.html?id=' + userId;
}
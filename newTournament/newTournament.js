function newTournament(){
    alert("Not implemented yet");
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
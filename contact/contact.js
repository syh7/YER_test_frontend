function goHome(){
    let participant = JSON.parse(localStorage.getItem("participant"));
    if(participant !== null){
        window.location.href = "../participant/participant.html?id=" + participant.id;
    } else {
        let admin = JSON.parse(localStorage.getItem("admin"));
        if(admin !== null){
            window.location.href = "../admin/admin.html?id=" + admin.id;
        } else {
            alert("Not logged in as participant or admin.");
        }
    }
}

function goBack(){
    window.history.back();
}

function editUser(){
    let participant = JSON.parse(localStorage.getItem("participant"));
    if(participant !== null){
        window.location.href = "../newparticipant/newparticipant.html?id=" + participant.id;
    } else {
        let admin = JSON.parse(localStorage.getItem("admin"));
        if(admin !== null){
            window.location.href = "../newadmin/newadmin.html?id=" + admin.id;
        } else {
            alert("Not logged in as participant or admin.");
        }
    }
}

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        alert("You have logged out.");
        window.location.href = "../index.html";
    }
}
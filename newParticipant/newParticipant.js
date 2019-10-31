
let firstNameInput = document.getElementById("firstNameInput");
let lastNameInput = document.getElementById("lastNameInput");
let dateOfBirthInput = document.getElementById("dateOfBirthInput");
let playerLevelInput = document.getElementById("playerLevelInput");
let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");

let players = [];
if(localStorage.players){
    players = JSON.parse(localStorage.getItem("players"));
}

function saveNewPlayer(){
    let player = {};
    if(firstNameInput.value == ""){
        alert("First name cannot be empty.");
        return;
    } else if(lastNameInput.value == ""){
        alert("Last name cannot be empty.");
        return;
    } else if(dateOfBirthInput.value == ""){
        alert("Date of birth must be entered.");
        return;
    } else if(emailInput.value == ""){
        alert("Email cannot be empty.");
        return;
    } else if(passwordInput.value == ""){
        alert("Password cannot be empty.");
        return;
    } else {
        player.firstName = firstNameInput.value;
        player.lastName = lastNameInput.value;
        player.dateOfBirth = dateOfBirthInput.value;
        player.playerLevel = playerLevelInput.value;
        player.email = emailInput.value;
        player.password = passwordInput.value;

        for(let i = 0; i < players.length; i++){
            if(isSamePlayer(player, players[i])){
                alert("This player already exists!")
                return;
            }
        }

        players.push(player);
        localStorage.setItem("players", JSON.stringify(players));

        console.log(players);
    }
}

function isSamePlayer(player0, player1){
    return player0.firstName == player1.firstName && player0.lastName == player0.lastName 
        && player0.dateOfBirth == player1.dateOfBirth && player0.playerLevel == player1.playerLevel
        && player0.email == player1.email;
}
let requestTarget = "http://localhost:8082/";


load()

function load() {
    let id = new URL(location.href).searchParams.get('id')
    let name = new URL(location.href).searchParams.get('t')
    console.log("Tournament.id: " + id);
    document.getElementById("name").innerHTML = name;
}
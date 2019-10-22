/* send request to localhost, get info for (get param)
            get document etc info .innerhtml = tournament.info */

let requestTarget = "http://localhost:8082/";

load();

function load(){
    console.log(window.location.search);
}

function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
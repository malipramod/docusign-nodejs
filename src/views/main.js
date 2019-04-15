let baseUrl = "http://localhost:3000/";
var http = new XMLHttpRequest();
var accountId = '4f03944f-318e-411d-9c58-7cf39c8855ff';


function helo(){
    location.href='http://localhost:3000/api/docusign/getToken';    
}

function checkStatus() {    
    let envId = document.getElementById('envolopId').value;
    let url = `${baseUrl}api/docusign/checkStatus`;
    let params = {
        "accountId": accountId,
        "envId": envId
    };
    http.open('POST', url);
    http.setRequestHeader('Content-type', 'application/json');
    http.send(JSON.stringify(params));
    http.onload = function () {
        document.getElementById("output").innerHTML = http.responseText;
    }
}
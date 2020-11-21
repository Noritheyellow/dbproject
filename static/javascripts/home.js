/*
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log(xhr.responseText);
            localStorage.setItem('receivedData', xhr.responseText);
        } else {
            console.log(xhr.responseText);
        }
    }
}
xhr.open('POST', '/read');
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send(JSON.stringify({
    msg : "send data from home"
}));


let test = document.getElementsByClassName('card-text');
console.log(test);
console.log(localStorage.getItem('receivedData'));
test[0].innerHTML = localStorage.getItem('receivedData');*/

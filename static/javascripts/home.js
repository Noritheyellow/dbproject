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

/*const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
            if (xhr.responseText) {
                console.log(xhr.responseText);
                if (xhr.responseText[0].customer_id) {
                    console.log(`Update Customer ${xhr.responseText}`);
                    localStorage.setItem('customData', xhr.responseText);
                }
                if (xhr.responseText[0].account_type) {
                    console.log(`Update Account ${xhr.responseText}`);
                    localStorage.setItem('accountData', xhr.responseText);
                }
                if (xhr.responseText[0].card_idx) {
                    console.log(`Update Card ${xhr.responseText}`);
                    localStorage.setItem('cardData', xhr.responseText);
                }
                if (xhr.responseText[0].dealing_idx) {
                    console.log(`Update Dealing ${xhr.responseText}`);
                    localStorage.setItem('dealingData', xhr.responseText);
                }
            }
        } else {
            console.log(xhr.responseText);
        }
    }
}

$(function () {
    xhr.open('POST', '/customer/read');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({
        msg : "send data from home"
    }));

    xhr.open('GET', '/account');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(null);
})*/

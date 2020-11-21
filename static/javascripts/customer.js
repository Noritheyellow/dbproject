console.log(`this is planning dept JS`);

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log(xhr.responseText);
            localStorage.setItem('customerData', xhr.responseText);
        } else {
            console.log(xhr.responseText);
        }
    }
}
let datasource = JSON.parse(localStorage.getItem('customerData'));

$(function() {
    xhr.open('POST', '/customer/read');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({
        msg : "send data from home"
    }));

    console.log(localStorage.getItem('customerData'));
    let dataGrid = $('#gridContainer').dxDataGrid({
        dataSource: datasource,
        allowColumnResizing: true,
        columnAutoWidth: true,
        columnResizingMode: "widget",
        highlightChanges: true,
        repaintChangesOnly: true,
        showBorders: true,
        loadPanel: {
            enabled: true
        },
        scrolling: {
            mode: "virtual"
        },
        selection: {
            mode: "multiple"
        },
        headerFilter: {
            visible: true
        },
        editing: {
            mode: "batch",
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            popup: {
                showTitle: true,
                width: 800,
                height: 300,
                position: {
                    my: "center",
                    at: "center",
                    of: window
                }
            }
        },
        onRowInserted: event => {
            // customer_id로 delete
            console.log(event, " added");
            xhr.open('POST', '/customer');
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(event.key));
        },
        onRowUpdated: event => {
            console.log(event, " updated");
            console.log(event.key.customer_id, "check");
            xhr.open('POST', `/customer/update`);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(event.key));
        },
        onRowRemoved: event => {
            console.log(event.key.customer_id, " deleted");
            // 이건 http 방식이고 xhr에서는 send에다가 param을 넘겨줘야 한다.
            xhr.open('POST', `/customer/delete`);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(event.key));
        },
        columns : [
            {caption: "고객 IDX", dataField: "customer_idx"},
            {caption: "주민번호", dataField: "customer_id"},
            {caption: "이름", dataField: "customer_name"},
            {caption: "주소", dataField: "customer_address"},
            {caption: "생년월일", dataField: "customer_birthday"},
            {caption: "이메일", dataField: "customer_email"},
            {caption: "전화번호", dataField: "customer_phone"},
            {caption: "직업", dataField: "customer_job"}
        ]
    })
})
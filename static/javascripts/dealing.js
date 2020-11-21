console.log(`this is dealing JS`);

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log(xhr.responseText);
            localStorage.setItem('dealingData', xhr.responseText);
        } else {
            alert(xhr.responseText);
        }
    }
}
let datasource = JSON.parse(localStorage.getItem('dealingData'));

$(function() {
    xhr.open('POST', '/dealing/readAll');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({
        msg : "send data from home"
    }));

    console.log(localStorage.getItem('dealingData'));
    let dataGrid = $('#gridContainer').dxDataGrid({
        dataSource: datasource? datasource : {},
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
            if (event.key.dealing_idx) {
                xhr.open('POST', '/dealing');
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.send(JSON.stringify(event.key));
            } else {
                alert('예금주 IDX를 입력하십시오');
            }
        },
        onRowUpdated: event => {
            xhr.open('PUT', `http://localhost:8080/dealing/${event.key.dealing_idx}`);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(event.key));
        },
        onRowRemoved: event => {
            // 이건 http 방식이고 xhr에서는 send에다가 param을 넘겨줘야 한다.
            xhr.open('DELETE', `http://localhost:8080/dealing/${event.key.dealing_idx}`);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(null);
        },
        columns : [
            {caption: "거래 번호", dataField: "dealing_idx"},
            {caption: "거래 금액", dataField: "amount"},
            {caption: "예금 잔고", dataField: "balance"},
            {caption: "입금 날짜", dataField: "deposit_date"},
            {caption: "출금 날짜", dataField: "withdrawl_date"},
            {caption: "예금 계좌 종류", dataField: "account_type"},
            {caption: "계좌 IDX", dataField: "account_idx"},
            {caption: "거래 내용", dataField: "account_detail"}
        ]
    })
})
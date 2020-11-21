console.log(`this is card JS`);

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log(xhr.responseText);
            localStorage.setItem('cardData', xhr.responseText);
        } else {
            console.log(xhr.responseText);
        }
    }
}
let datasource = JSON.parse(localStorage.getItem('cardData'));

$(function() {
    xhr.open('POST', '/card/read');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({
        msg : "send data from home"
    }));

    console.log(localStorage.getItem('cardData'));
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
            console.log(event, " added");
            xhr.open('POST', '/card');
            xhr.setRequestHeader('Content-type', 'application/json');
            // 여기서 { event.key, 요청자 id, 요청자의 account id 만약 없다면 null }
            xhr.send(JSON.stringify(event.key));
        },
        onRowUpdated: event => {
            xhr.open('PUT', `http://localhost:8080/card/${event.key.card_idx}`);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(event.key));
        },
        onRowRemoved: event => {
            // 이건 http 방식이고 xhr에서는 send에다가 param을 넘겨줘야 한다.
            xhr.open('DELETE', `http://localhost:8080/card/${event.key.card_idx}`);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(null);
        },
        columns : [
            {caption: "카드번호", dataField: "card_idx"},
            {caption: "카드 한도 금액", dataField: "card_limit"},
            {caption: "카드 종류", dataField: "card_type"},
            {caption: "카드 신청 일자", dataField: "card_reqdate"},
            {caption: "카드 결제 일자", dataField: "card_payment"},
            {caption: "카드 소유자 IDX", dataField: "customer_idx"},
            {caption: "카드 연결 계좌 IDX", dataField: "account_idx"}
        ]
    })
})
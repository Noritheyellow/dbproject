console.log(`this is account JS`);

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === xhr.DONE) {
    if (xhr.status === 200 || xhr.status === 201) {
      console.log(xhr.responseText);
      localStorage.setItem("accountData", xhr.responseText);
    } else {
      alert(xhr.responseText);
    }
  }
};
let datasource = JSON.parse(localStorage.getItem("accountData"));

$(function () {
  xhr.open("POST", "/account/readAll");
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(
    JSON.stringify({
      msg: "send data from home",
    })
  );

  console.log(localStorage.getItem("accountData"));
  let dataGrid = $("#gridContainer").dxDataGrid({
    dataSource: datasource ? datasource : {},
    allowColumnResizing: true,
    columnAutoWidth: true,
    columnResizingMode: "widget",
    highlightChanges: true,
    repaintChangesOnly: true,
    showBorders: true,
    loadPanel: {
      enabled: true,
    },
    scrolling: {
      mode: "virtual",
    },
    selection: {
      mode: "multiple",
    },
    headerFilter: {
      visible: true,
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
          of: window,
        },
      },
    },
    onRowInserted: (event) => {
      // customer_id로 delete
      console.log(event, " added");
      if (event.key.account_idx) {
        xhr.open("POST", "/account");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(event.key));
      } else {
        alert("예금주 IDX를 입력하십시오");
      }
    },
    onRowUpdated: (event) => {
      console.log(event, " updated");
      xhr.open("PUT", `http://localhost:8080/account/${event.key.account_idx}`);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify(event.key));
    },
    onRowRemoved: (event) => {
      // 이건 http 방식이고 xhr에서는 send에다가 param을 넘겨줘야 한다.
      xhr.open("DELETE", `http://localhost:8080/account/${event.key.account_idx}`);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(null);
    },
    columns: [
      { caption: "계좌 종류", dataField: "account_type" },
      { caption: "계좌 잔고", dataField: "account_balance" },
      { caption: "카드 신청 여부", dataField: "card_requested" },
      { caption: "계좌 개설 일자", dataField: "account_date" },
      { caption: "예금주 명", dataField: "customer_name" },
      { caption: "예금주 전화번호", dataField: "customer_phone" },
      { caption: "예금주 이메일", dataField: "customer_email" },
      { caption: "예금주 IDX", dataField: "customer_idx" },
      { caption: "계좌 IDX", dataField: "account_idx" },
    ],
  });
});

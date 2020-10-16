console.log(`this is planning dept JS`);

/*let datasource = [{
    "plan_id": "abcdefg",
    "name": "hwang",
    "email": "dav@dav.com",
    "phone": "01011112222"
}, {
    "plan_id": "dddcccc",
    "name": "kim",
    "email": "kim@kim.com",
    "phone": "01033334444"
}]*/
let datasource = JSON.parse(localStorage.getItem('receivedData'));

$(function() {
    console.log(localStorage.getItem('receivedData'));
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
            console.log(event, " added");
        },
        onRowUpdated: event => {
            console.log(event, " updated");
        },
        onRowRemoved: event => {
            console.log(event, " deleted");
        },
        columns : [
            {caption: "ID", dataField: "plan_id"},
            {caption: "Name", dataField: "name"},
            {caption: "E-mail", dataField: "email"},
            {caption: "Phone Number", dataField: "phone"},
            {caption: "비고"}
        ]
    })
})
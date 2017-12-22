// specify the columns
var columnDefs = [
    { headerName: "Identifier", field: "Identifier"},
    {
        headerName: "Task",
        children: [
            { headerName: "Name", field: "TaskName" },
            { headerName: "Action", field: "TaskAction" },
            { headerName: "Project", field: "TaskProjectName" }
        ]
    },
    {
        headerName: "Developer",
        children: [
            {
                headerName: "Nickname", field: "DeveloperName"
            }
        ]
    },
    { headerName: "Started", field: "Started" },
    { headerName: "Finished", field: "Finished" },
    { headerName: "Breakpoints", field: "BreakpointCount" },
    { headerName: "Events", field: "EventCount" },
    { headerName: "PathNodes", field: "PathNodeCount" },
];

var rowData = [];

// let the grid know which columns and what data to use
var gridOptions = {
    columnDefs: columnDefs,
    onGridReady: function () {
        gridOptions.api.sizeColumnsToFit();
    },
    rowSelection: 'multiple',
    enableColResize: true,
    enableSorting: true,
    enableFilter: true,
    enableRangeSelection: true,
    suppressRowClickSelection: true,
    animateRows: true,
    onModelUpdated: modelUpdated,
    debug: true
};

function modelUpdated() {
    var model = gridOptions.api.getModel();
    var totalRows = model.getTopLevelNodes().length;
    var processedRows = model.getRowCount();
    var eSpan = document.querySelector('#rowCount');
    eSpan.innerHTML = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
}

function addQuickFilterListener() {
    var eInput = document.querySelector('#quickFilterInput');
    eInput.addEventListener("input", function () {
        var text = eInput.value;
        gridOptions.api.setQuickFilter(text);
    });
}

function onBtResetGrid() {

    gridOptions.api.destroy();

    createDataGrid();
}

function onBtReloadFromServer() {

    gridOptions.api.destroy();

    loadDataFromServer();
}

function createDataGrid() {
    var eGridDiv = document.querySelector('#sessionDataGrid');

    new agGrid.Grid(eGridDiv, gridOptions);

    gridOptions.api.setRowData(rowData);
}

function loadDataFromServer() {
    $.get("api/sessiongriddata", function (data) {
        rowData = data;

        createDataGrid();
    });
}

var btResetGrid;
var btReloadFromServer;

$(function () {
    //first load data form server
    loadDataFromServer();

    //initializers some grid controls
    btResetGrid = document.querySelector('#btResetGrid');
    btReloadFromServer = document.querySelector('#btReloadFromServer');

    if (btResetGrid) 
        btResetGrid.addEventListener('click', onBtResetGrid);

    if (btReloadFromServer)
        btReloadFromServer.addEventListener('click', onBtReloadFromServer);

    addQuickFilterListener();
});
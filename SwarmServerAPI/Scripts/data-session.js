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

// let the grid know which columns and what data to use
var gridOptions = {
    columnDefs: columnDefs,
    rowData: [],
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

// used in our jasmine test
function selectAllRows() {
    gridOptions.api.selectAll();
}

var self = this;

$(function () {
    $.get("api/sessiongriddata", function (data) {
        self.gridOptions.rowData = data;

        var eGridDiv = document.querySelector('#sessionDataGrid');

        new agGrid.Grid(eGridDiv, gridOptions);
    });
});
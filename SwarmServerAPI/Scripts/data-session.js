// specify the columns
var columnDefs = [
    { headerName: "Identifier", field: "Identifier"},
    { headerName: "Label", field: "Label"},
    { headerName: "Description", field: "Description" },
    { headerName: "Purpose", field: "Purpose" },
    { headerName: "Started", field: "Started" },
    { headerName: "Finished", field: "Finished" }
];

// let the grid know which columns and what data to use
var gridOptions = {
    columnDefs: columnDefs,
    rowData: [],
    onGridReady: function () {
        gridOptions.api.sizeColumnsToFit();
    }
};

// used in our jasmine test
function selectAllRows() {
    gridOptions.api.selectAll();
}

var self = this;

$(function () {
    $.get("api/sessiongriddata", function (data) {
        self.gridOptions.rowData = data;

        var eGridDiv = document.querySelector('#myGrid');

        new agGrid.Grid(eGridDiv, gridOptions);
    });
});
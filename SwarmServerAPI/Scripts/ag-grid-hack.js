function setDynamicGridHeight(currentRowsCount) {
    var offSet = 1.005;

    if (currentRowsCount <= 700)
        offSet = 1.01;

    if (currentRowsCount <= 250)
        offSet = 1.02;

    if (currentRowsCount <= 120)
        offSet = 1.04;

    if (currentRowsCount <= 60)
        offSet = 1.05;

    if (currentRowsCount <= 30)
        offSet = 1.1;

    if (currentRowsCount <= 20)
        offSet = 1.2;

    if (currentRowsCount <= 10)
        offSet = 1.3;

    var height = currentRowsCount * 25 * offSet;

    if (currentRowsCount <= 5)
        height = 300;

    $('.ag-body, .ag-scrolls').height(height);
}
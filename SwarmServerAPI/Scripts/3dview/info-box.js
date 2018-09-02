var infoBoxHeight = 30;
var infoBoxWidth = 400;
var infoMarginLeftHoldAdjustment = 20;
var infoBoxTop = 150;

function relocateInfoBox(box, canvasWidth, canvasHeight) {
    box.style.width = infoBoxWidth + 'px';
    box.style.height = infoBoxHeight + 'px';
    box.style.top = infoBoxTop + 'px';
    box.style.left = (canvasWidth - infoBoxWidth + infoMarginLeftHoldAdjustment) + 'px';
}

function initInfoBox(canvasWidth, canvasHeight) {
    var box = document.getElementsByClassName("info-box")[0];

    relocateInfoBox(box, canvasWidth, canvasHeight);
}
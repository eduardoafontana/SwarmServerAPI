var infobox = (function () {

    var infoBoxHeight = 30;
    var infoBoxWidth = 400;
    var infoMarginLeftHoldAdjustment = 20;
    var infoBoxTop = 150;

    var relocate = function (box, canvasWidth, canvasHeight) {
        box.style.width = infoBoxWidth + 'px';
        box.style.height = infoBoxHeight + 'px';
        box.style.top = infoBoxTop + 'px';
        box.style.left = (canvasWidth - infoBoxWidth + infoMarginLeftHoldAdjustment) + 'px';
    }

    var init = function (canvasWidth, canvasHeight, box) {
        infobox.relocate(box, canvasWidth, canvasHeight);
    };

    return {
        init: init,
        relocate: relocate,
    };

}());
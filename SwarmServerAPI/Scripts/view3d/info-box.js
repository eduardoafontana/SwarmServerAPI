var infobox = (function () {

    var infoBoxHeight = 30;
    var infoBoxWidth = 400;
    var infoMarginLeftHoldAdjustment = 20;
    var infoBoxTop = 150;

    var relocate = function () {
        var box = document.getElementsByClassName("info-box")[0];

        box.style.width = infoBoxWidth + 'px';
        box.style.height = infoBoxHeight + 'px';
        box.style.top = infoBoxTop + 'px';
        box.style.left = (render.getWidth() - infoBoxWidth + infoMarginLeftHoldAdjustment) + 'px';
    }

    var init = function () {
        infobox.relocate();
    };

    return {
        init: init,
        relocate: relocate,
    };

}());
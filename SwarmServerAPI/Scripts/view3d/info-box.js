var infobox = (function () {

    var infoBoxHeight = 30;
    var infoBoxWidth = 400;
    var infoMarginLeftHoldAdjustment = 20;
    var infoBoxTop = 150;

    function relocate() {
        var box = document.getElementsByClassName("info-box")[0];

        box.style.width = infoBoxWidth + 'px';
        box.style.height = infoBoxHeight + 'px';
        box.style.top = infoBoxTop + 'px';
        box.style.left = (render.getDimensions().width - infoBoxWidth + infoMarginLeftHoldAdjustment) + 'px';
    }

    var init = function () {
        relocate();
    };

    var setHtml = function (html) {
        var box = document.getElementsByClassName("info-box")[0];

        box.innerHTML = html;
    };

    var canClear = function () {
        var box = document.getElementsByClassName("info-box")[0];

        box.innerHTML = '';
    };

    return {
        init: init,
        setHtml: setHtml,
        canClear: canClear
    };

}());
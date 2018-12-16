var scaleOptions = (function () {

    var scaleOptionsCollection = [];
    var currentScaleOption = null;

    var setScaleOption = function (guiScaleOtions) {
        for (var i = 0; i < scaleOptionsCollection.length; i++) {
            scaleOptionsCollection[i].domElement.style.visibility = 'hidden';
        }

        if (guiScaleOtions.alreadyRendered == undefined) {
            guiScaleOtions.alreadyRendered = true;

            scaleOptionsCollection.push(guiScaleOtions);

            document.getElementsByClassName("tool-box")[0].appendChild(guiScaleOtions.domElement);
        }

        if (document.getElementsByClassName("tool-scalechange")[0].className == 'tool-scalechange selected')
            guiScaleOtions.domElement.style.visibility = 'visible';

        currentScaleOption = guiScaleOtions;
    };

    var init = function () {
        document.getElementsByClassName("tool-scalechange")[0].addEventListener("click", function () {
            if (currentScaleOption == null)
                return;

            if (currentScaleOption.domElement.style.visibility == 'visible') {
                currentScaleOption.domElement.style.visibility = 'hidden';
                this.className = 'tool-scalechange';
            } else {
                currentScaleOption.domElement.style.visibility = 'visible';
                this.className = 'tool-scalechange selected';
            }
        });
    };

    return {
        setScaleOption: setScaleOption,
        init: init
    };
})();

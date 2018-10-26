var colorPaletteOptions = (function () {

    var colorPaletteOptionsCollection = [];
    var currentColorPaletteOption = null;

    var setColorPaletteOption = function (guiColorPaletteOptions) {
        for (var i = 0; i < colorPaletteOptionsCollection.length; i++) {
            colorPaletteOptionsCollection[i].domElement.style.visibility = 'hidden';
        }

        if (guiColorPaletteOptions.alreadyRendered == undefined) {
            guiColorPaletteOptions.alreadyRendered = true;

            colorPaletteOptionsCollection.push(guiColorPaletteOptions);

            document.getElementsByClassName("tool-box")[0].appendChild(guiColorPaletteOptions.domElement);
        }

        if (document.getElementsByClassName("tool-colorchange")[0].className == 'tool-colorchange selected')
            guiColorPaletteOptions.domElement.style.visibility = 'visible';

        currentColorPaletteOption = guiColorPaletteOptions;
    };

    var init = function () {
        document.getElementsByClassName("tool-colorchange")[0].addEventListener("click", function () {
            if (currentColorPaletteOption == null)
                return;

            if (currentColorPaletteOption.domElement.style.visibility == 'visible') {
                currentColorPaletteOption.domElement.style.visibility = 'hidden';
                this.className = 'tool-colorchange';
            } else {
                currentColorPaletteOption.domElement.style.visibility = 'visible';
                this.className = 'tool-colorchange selected';
            }
        });
    };

    return {
        setColorPaletteOption: setColorPaletteOption,
        init: init
    };
})();

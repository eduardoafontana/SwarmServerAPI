var hideShowOptions = (function () {

    var hideShowOptionsCollection = [];
    var currentHideShowOption = null;

    var setHideShowOption = function (guiHideShowOtions) {
        for (var i = 0; i < hideShowOptionsCollection.length; i++) {
            hideShowOptionsCollection[i].domElement.style.visibility = 'hidden';
        }

        if (guiHideShowOtions.alreadyRendered == undefined) {
            guiHideShowOtions.alreadyRendered = true;

            hideShowOptionsCollection.push(guiHideShowOtions);

            document.getElementsByClassName("tool-box")[0].appendChild(guiHideShowOtions.domElement);
        }

        if (document.getElementsByClassName("tool-hideshowchange")[0].className == 'tool-hideshowchange selected')
            guiHideShowOtions.domElement.style.visibility = 'visible';

        currentHideShowOption = guiHideShowOtions;
    };

    var init = function () {
        document.getElementsByClassName("tool-hideshowchange")[0].addEventListener("click", function () {
            if (currentHideShowOption == null)
                return;

            if (currentHideShowOption.domElement.style.visibility == 'visible') {
                currentHideShowOption.domElement.style.visibility = 'hidden';
                this.className = 'tool-hideshowchange';
            } else {
                currentHideShowOption.domElement.style.visibility = 'visible';
                this.className = 'tool-hideshowchange selected';
            }
        });
    };

    return {
        setHideShowOption: setHideShowOption,
        init: init
    };
})();

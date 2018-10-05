var scaleOptions = (function () {

    var options = {
        cubeSpace: 1,
        sessionSpace: 1,
        heightScale: 1,
        breakpointScale: 1,
        eventScale: 1,
        pathScale: 0.1,
    };

    var init = function () {
        var guiScaleOtions = new dat.GUI({ autoPlace: false });
        guiScaleOtions.add(scaleOptions.getOptions(), 'cubeSpace', 1, 5);//.onChange(function () { graph.changeCubeScale(scaleOptions) });
        guiScaleOtions.add(scaleOptions.getOptions(), 'sessionSpace', 1, 5);//.onChange(function () { graph.changeGroupScale(scaleOptions) });
        guiScaleOtions.add(scaleOptions.getOptions(), 'heightScale', 0.5, 3);//.onChange(function () { graph.changeFileScale(scaleOptions) });
        guiScaleOtions.add(scaleOptions.getOptions(), 'breakpointScale', 0.5, 3);//.onChange(function () { graph.changeTorusScale(scaleOptions) });
        guiScaleOtions.add(scaleOptions.getOptions(), 'eventScale', 0.5, 3);//.onChange(function () { graph.changeTorusSquereScale(scaleOptions) });
        //guiScaleOtions.add(scaleOptions, 'pathScale', 0.03, 0.3).onChange(function () { graph.changeTubeScale(scaleOptions) });

        document.getElementsByClassName("tool-box")[0].appendChild(guiScaleOtions.domElement);

        document.getElementsByClassName("tool-scalechange")[0].addEventListener("click", function () {
            if (guiScaleOtions.domElement.style.visibility == 'visible') {
                guiScaleOtions.domElement.style.visibility = 'hidden';
                this.className = '';
            } else {
                guiScaleOtions.domElement.style.visibility = 'visible';
                this.className = 'selected';
            }
        });
    };

    var getOptions = function () {
        return options;
    };

    return {
        init: init,
        getOptions: getOptions
    };
}());


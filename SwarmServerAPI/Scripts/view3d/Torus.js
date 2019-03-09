var Torus = function (fileIndex, breakpointIndex, files) {

    var file = files[fileIndex];
    var data = files[fileIndex].breakpoints[breakpointIndex];

    var sourceCodeFileInformationJson = {
        fileIndex: fileIndex,
        sessionId: file.sessionId
    };

    var sourceCodeElementInformationJson = {
        fileIndex: fileIndex,
        sessionId: file.sessionId,
        eventIndex: data.positionIndex,
        breakpointIndex: data.positionIndex
    };

    var height = data.positionIndex;

    var radius = 0.2;
    var topMargin = 0.5;

    var geometry = new THREE.SphereBufferGeometry(radius, 10, 10);
    var material = new THREE.MeshBasicMaterial();
    var mesh = new THREE.Mesh(geometry, material);

    var torusSize = radius * 2; //diameter

    var margin = 2.6;
    var leftMargin = 0.7;
    var sizeWithMargin = margin + torusSize;
    var topHeightMargin = -0.25;
    var heightAdjustment = height * (-1);
    var cubeMarginTop = 0;

    var positionX = sizeWithMargin * file.x;

    mesh.position.y = cubeMarginTop + heightAdjustment + topHeightMargin + groupAssembler.getPositionTopBase();
    mesh.position.x = positionX + leftMargin;
    mesh.position.z = file.z;

    mesh.rotation.x = 1.6; //flip to horizontal

    var initialCalculatedPositionX = positionX;
    var initialCalculatedPositionZ = mesh.position.z;
    var initialCalculatedPositionY = heightAdjustment;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        mesh.visible = sessionFilter.getVisible(file.sessionId, render.getSelectedScene().hideShowOptions.options.breakpoint);

        mesh.position.x = (initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace) + leftMargin;
        mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.sessionSpace;
        mesh.position.y = (initialCalculatedPositionY * render.getSelectedScene().scaleOptions.options.heightScale) + cubeMarginTop + topHeightMargin + groupAssembler.getPositionTopBase();

        mesh.scale.x = render.getSelectedScene().scaleOptions.options.breakpointScale;
        mesh.scale.y = render.getSelectedScene().scaleOptions.options.breakpointScale;
        mesh.scale.z = render.getSelectedScene().scaleOptions.options.breakpointScale;

        if (render.wasClicked(mesh)) {
            dataControl.getSourceCodeFromServer(file.originalId).then(function (dataFromServer) {
                sourceCodeControl.setFileInformation(sourceCodeFileInformationJson);
                sourceCodeControl.setElementInformation(sourceCodeElementInformationJson);

                sourceCodeControl.loadSourceCode(dataFromServer);

                sourceCodeControl.loadCodeStyle().then(function () {
                    sourceCodeControl.loadLinesContrast(files, fileIndex);

                    sourceCodeControl.loadSelected(data, files[fileIndex]);
                });
            });
        }

        if (sourceCodeControl.isSelectedElement(sourceCodeElementInformationJson))
            material.color.setHex(render.getSelectedColorPalette().pointOver);
        else {
            if (render.wasMouseOver(mesh)) {
                infobox.setHtml('Click to open breakpoint details on information window.');

                detailboxAdditional.setHtml(data);

                material.color.setHex(render.getSelectedColorPalette().pointOver);
            } else {
                material.color.setHex(render.getSelectedColorPalette().torus);
            }
        }
    }

    return {
        mesh: mesh
    };

};


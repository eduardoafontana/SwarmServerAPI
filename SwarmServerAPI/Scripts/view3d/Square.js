var Square = function (fileIndex, eventIndex, files) {

    var file = files[fileIndex];
    var data = files[fileIndex].events[eventIndex];

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

    var radius = 0.7;
    var topMargin = 0.5;

    var geometry = new THREE.TorusBufferGeometry(radius, 0.05, 4, 4);
    var material = new THREE.MeshBasicMaterial();
    var mesh = new THREE.Mesh(geometry, material);

    var margin = 1.6;
    var torusSize = radius * 2; //diameter
    var sizeWithMargin = margin + torusSize;
    var topHeightMargin = -0.25;
    var heightAdjustment = height * (-1);
    var cubeMarginTop = 0;

    mesh.position.y = cubeMarginTop + heightAdjustment + topHeightMargin + groupAssembler.getPositionTopBase();
    mesh.position.x = sizeWithMargin * file.x;
    mesh.position.z = file.z;

    mesh.rotation.x = 1.6; //flip to horizontal
    mesh.rotation.z = 0.8; //rotate to equal cube node

    var initialCalculatedPositionX = mesh.position.x;
    var initialCalculatedPositionZ = mesh.position.z;
    var initialCalculatedPositionY = heightAdjustment;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        mesh.visible = sessionFilter.getVisible(file.sessionId, render.getSelectedScene().hideShowOptions.options.event);

        mesh.position.x = initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace;
        mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.sessionSpace;
        mesh.position.y = (initialCalculatedPositionY * render.getSelectedScene().scaleOptions.options.heightScale) + cubeMarginTop + topHeightMargin + groupAssembler.getPositionTopBase();

        mesh.scale.x = render.getSelectedScene().scaleOptions.options.eventScale;
        mesh.scale.y = render.getSelectedScene().scaleOptions.options.eventScale;
        mesh.scale.z = render.getSelectedScene().scaleOptions.options.eventScale;

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
            material.color.setHex(0xffff00);
        else {
            if (render.wasMouseOver(mesh)) {
                infobox.setHtml('Click to open event details on information window.');

                detailboxAdditional.setHtml(JSON.stringify(data, null, 4));

                material.color.setHex(render.getSelectedColorPalette().pointOver);
            } else {
                material.color.setHex(render.getSelectedColorPalette().square);
            }
        }
    }

    return {
        mesh: mesh
    };

};


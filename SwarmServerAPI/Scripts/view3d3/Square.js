var Square = function (cube, data, events, breakpoints) {

    var sourceCodeFileInformationJson = {
        fileOriginalId: cube.data.originalId,
        sessionId: cube.data.sessionId
    };

    var sourceCodeElementInformationJson = {
        fileOriginalId: cube.data.originalId,
        sessionId: cube.data.sessionId,
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
    mesh.position.x = sizeWithMargin * cube.data.x;
    mesh.position.z = cube.data.z;

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

        mesh.visible = sessionFilter.getVisible(cube.data.sessionId, render.getSelectedScene().hideShowOptions.options.event);

        mesh.position.x = initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace;
        mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.sessionSpace;
        mesh.position.y = (initialCalculatedPositionY * render.getSelectedScene().scaleOptions.options.heightScale) + cubeMarginTop + topHeightMargin + groupAssembler.getPositionTopBase();

        mesh.scale.x = render.getSelectedScene().scaleOptions.options.eventScale;
        mesh.scale.y = render.getSelectedScene().scaleOptions.options.eventScale;
        mesh.scale.z = render.getSelectedScene().scaleOptions.options.eventScale;

        if (render.wasClicked(mesh)) {
            dataControl.getSourceCodeFromServer(cube.data.originalId).then(function (dataFromServer) {
                sourceCodeControl.setFileInformation(sourceCodeFileInformationJson);
                sourceCodeControl.setElementInformation(sourceCodeElementInformationJson);

                sourceCodeControl.loadSourceCode(dataFromServer).then(function () {
                    sourceCodeControl.loadHighLight().then(function () {
                        sourceCodeControl.loadEvents(events);
                        sourceCodeControl.loadBreakpoints(breakpoints);

                        sourceCodeControl.loadSelected(data);
                    });
                });
            });
        }

        if (sourceCodeControl.isSelectedElement(sourceCodeElementInformationJson))
            material.color.setHex(0xffff00);
        else {
            if (render.wasMouseOver(mesh)) {
                infobox.setHtml('Click to open event details on information window.');

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


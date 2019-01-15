var Cube = function (data, sessionId) {

    var data = data;
    data.sessionId = sessionId;

    var sourceCodeFileInformationJson = {
        fileOriginalId: data.originalId,
        sessionId: data.sessionId
    };

    var height = data.nodePoints + data.nodeSpaceAfter; 

    var squareSize = 1;

    var ySize = height;
    var xSize = squareSize;
    var zSize = squareSize;

    var geometry = new THREE.BoxGeometry(xSize, ySize, zSize, 1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });
    var mesh = new THREE.Mesh(geometry, material);

    mesh.name = 'Cube';

    var fileName = 'undefined';
    if (data.fileName != undefined)
        fileName = data.fileName;

    material.opacity = 0.5;
    material.transparent = true;

    var adjustToZeroAxisY = (ySize / 2) * (-1);
    var margin = 2;
    var sizeWithMargin = margin + squareSize;
    var marginBottom = (-1) * data.nodeSpaceBefore;
    var positionTopBase = groupAssembler.getPositionTopBase();

    mesh.position.y = marginBottom + adjustToZeroAxisY + positionTopBase;
    mesh.position.x = sizeWithMargin * data.x;
    mesh.position.z = zSize * data.z;

    var initialCalculatedPositionX = mesh.position.x;
    var initialCalculatedPositionZ = mesh.position.z;
    var initialCalculatedPositionY = adjustToZeroAxisY;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        var originalColor = render.getSelectedColorPalette().cube;

        if (data.z % 2 != 0)
            originalColor = render.getSelectedColorPalette().cubeContrast;

        mesh.visible = sessionFilter.getVisible(sessionId, render.getSelectedScene().hideShowOptions.options.file);

        mesh.position.x = initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace;

        mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.sessionSpace;

        mesh.scale.y = render.getSelectedScene().scaleOptions.options.heightScale;
        mesh.position.y = (initialCalculatedPositionY * render.getSelectedScene().scaleOptions.options.heightScale) + marginBottom + positionTopBase;

        if (render.wasClicked(mesh)) {
            dataControl.getSourceCodeFromServer(data.originalId).then(function (dataFromServer) {
                sourceCodeControl.setFileInformation(sourceCodeFileInformationJson);
                sourceCodeControl.loadSourceCode(dataFromServer).then(function () {
                    sourceCodeControl.loadHighLight().then(function () {
                        sourceCodeControl.loadEvents(data.events);
                        sourceCodeControl.loadBreakpoints(data.breakpoints);
                    });
                });
            });
        }
        
        material.color.setHex(originalColor);

        if (render.wasMouseOver(mesh)) {
            infobox.setHtml('<b>' + fileName + '</b>' + '<br />Click to show the source code of this file.');

            material.color.setHex(render.getSelectedColorPalette().pointOver);
        }

        if (sourceCodeControl.isSelectedFile(sourceCodeFileInformationJson))
            material.color.setHex(render.getSelectedColorPalette().pointOver);

        geometry.colorsNeedUpdate = true;
    }

    return {
        mesh: mesh,
        data: data
    };

};


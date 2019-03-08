var CubeReflection = function (data) {

    var data = data;

    var squareSize = 1;

    var ySize = 0.1;
    var xSize = squareSize;
    var zSize = squareSize;

    var geometry = new THREE.BoxGeometry(xSize, ySize, zSize, 1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });
    var mesh = new THREE.Mesh(geometry, material);

    material.opacity = 0.5;
    material.transparent = true;

    var margin = 2;
    var sizeWithMargin = margin + squareSize;

    var topHeightMargin = 2;
    var positionTopBase = groupAssembler.getPositionTopBase();
    var heightY = groupAssembler.getMostHighFileSpacePoints() + topHeightMargin;
    var adjustToZeroAxisY = heightY * (-1);

    mesh.position.y = adjustToZeroAxisY + positionTopBase;
    mesh.position.x = sizeWithMargin * data.x;
    mesh.position.z = zSize * data.z;

    var initialCalculatedPositionX = mesh.position.x;
    var initialCalculatedPositionZ = mesh.position.z;
    var initialCalculatedPositionY = groupAssembler.getMostHighFileSpacePoints();

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        var originalColor = render.getSelectedColorPalette().cube;

        if (data.z % 2 != 0)
            originalColor = render.getSelectedColorPalette().cubeContrast;

        material.color.setHex(originalColor);

        geometry.colorsNeedUpdate = true;

        mesh.visible = sessionFilter.getVisible(data.sessionId, render.getSelectedScene().hideShowOptions.options.shadow);

        mesh.position.x = initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace;

        mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.sessionSpace;

        mesh.position.y = ((initialCalculatedPositionY * render.getSelectedScene().scaleOptions.options.heightScale + topHeightMargin) * (-1)) + positionTopBase;
    }

    return {
        mesh: mesh,
        data: data
    };

};


var Group = function (data, sessionsQuantity, groupParent) {

    var sessionMargin = 8;
    var topBorder = 0.75;
    var bottomBorder = 0.75;

    var cubesMargin = 3;
    var rightOver = 1;//leftover on right
    var widthQuantity = data.maxIndexWidthQuantity + 1;

    var width = (widthQuantity * cubesMargin) - rightOver;
    var height = (sessionMargin * (sessionsQuantity - 1)) + topBorder + bottomBorder;

    var geometry = new THREE.PlaneBufferGeometry(width, height, 1);
    var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    var mesh = new THREE.Mesh(geometry, material);

    var leftBorder = 1;
    var groupMargin = 2;
    var adjustToZeroAxisX = width / 2;
    var leftPosition = adjustToZeroAxisX - leftBorder;

    if (groupParent != undefined) {
        leftPosition = groupParent.mesh.position.x + (groupParent.width / 2) + groupMargin + adjustToZeroAxisX - leftBorder;
    }

    geometry.rotateX(-Math.PI * 0.5);

    var adjustToZeroAxisZ = height / 2;
    var topPosition = adjustToZeroAxisZ - topBorder;
    var topHeightMargin = 2;

    var positionTopBase = groupAssembler.getPositionTopBase();
    var heightY = groupAssembler.getMostHighFileSpacePoints() + topHeightMargin;
    var adjustToZeroAxisY = heightY * (-1);

    mesh.position.y = adjustToZeroAxisY + positionTopBase;
    mesh.position.x = leftPosition;
    mesh.position.z = topPosition;

    material.opacity = 0.75;
    material.transparent = true;

    var initialCalculatedPositionX = mesh.position.x;
    var initialCalculatedPositionZ = mesh.position.z;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        material.color.setHex(render.getSelectedColorPalette().group);

        mesh.visible = render.getSelectedScene().hideShowOptions.options.architecture;

        mesh.scale.x = render.getSelectedScene().scaleOptions.options.cubeSpace;
        mesh.position.x = initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace;

        mesh.scale.z = render.getSelectedScene().scaleOptions.options.sessionSpace;
        mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.sessionSpace;
    }

    return {
        mesh: mesh,
        width: width
    };

};


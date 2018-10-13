var Group = function (data, sessionsQuantity, groupParent) {

    var sessionMargin = 3;
    var topBorder = 0.75;
    var bottomBorder = 0.75;

    var cubesMargin = 1.5;
    var rightOver = 0.5;//leftover on right

    var width = (data.widthQuantity * cubesMargin) - rightOver;
    var height = (sessionMargin * (sessionsQuantity - 1)) + topBorder + bottomBorder;

    var geometry = new THREE.PlaneGeometry(width, height, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x7ebca3, side: THREE.DoubleSide });
    var mesh = new THREE.Mesh(geometry, material);

    var leftBorder = 0.5;
    var groupMargin = 1;
    var adjustToZeroAxisX = width / 2;
    var leftPosition = adjustToZeroAxisX - leftBorder;

    if (groupParent != undefined) {
        leftPosition = groupParent.mesh.position.x + (groupParent.width / 2) + groupMargin + adjustToZeroAxisX - leftBorder;
    }

    geometry.rotateX(-Math.PI * 0.5);

    var adjustToZeroAxisZ = height / 2;
    var topPosition = adjustToZeroAxisZ - topBorder;

    mesh.position.y = 0.5;
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


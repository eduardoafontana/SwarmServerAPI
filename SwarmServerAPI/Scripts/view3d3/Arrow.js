var Arrow = function (tube, sessionId) {

    var verticeX = 0;
    var verticeY = 0;
    var verticeZ = 0;

    if (tube.firstVertice != undefined && tube.firstVertice != null) {
        verticeX = tube.firstVertice.x;
        verticeY = tube.firstVertice.y;
        verticeZ = tube.firstVertice.z;
    }

    var direction = new THREE.Vector3(1, -1, 1);
    direction.normalize();

    var positionAdjustment = 0.7;
    var topMargin = 0.5;
    var positionArray = new THREE.Vector3(verticeX - positionAdjustment, verticeY + topMargin, verticeZ - positionAdjustment);
    var length = 1;
    var headLength = 0.4 * length;

    var mesh = new THREE.ArrowHelper(direction, positionArray, length, 0xff0000, headLength)

    var initialCalculatedPositionX = verticeX;
    var initialCalculatedPositionZ = verticeZ;
    var initialCalculatedPositionY = verticeY;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        mesh.visible = sessionFilter.getVisible(sessionId, render.getSelectedScene().hideShowOptions.options.start);

        mesh.position.x = (initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace) - positionAdjustment;
        mesh.position.z = (initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.sessionSpace) - positionAdjustment;
    }

    return {
        mesh: mesh
    };

};


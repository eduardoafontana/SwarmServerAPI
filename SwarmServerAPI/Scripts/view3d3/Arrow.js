var Arrow = function (tubeMesh) {

    var verticeX = 0;
    var verticeY = 0;
    var verticeZ = 0;

    if (tubeMesh.geometry.vertices.length > 0) {
        var verticeX = tubeMesh.geometry.vertices[0].x;
        var verticeY = tubeMesh.geometry.vertices[0].y;
        var verticeZ = tubeMesh.geometry.vertices[0].z
    }

    var direction = new THREE.Vector3(1, -1, 1);
    direction.normalize();

    var positionAdjustment = 0.7;
    var positionArray = new THREE.Vector3(verticeX - positionAdjustment, verticeY + positionAdjustment, verticeZ - positionAdjustment);
    var length = 1;
    var headLength = 0.4 * length;
    var marginBottom = 10;

    var mesh = new THREE.ArrowHelper(direction, positionArray, length, 0xff0000, headLength)

    var initialCalculatedPositionX = verticeX;
    var initialCalculatedPositionZ = verticeZ;
    var initialCalculatedPositionY = verticeY;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        mesh.visible = render.getSelectedScene().hideShowOptions.options.start;

        mesh.position.x = (initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace) - positionAdjustment;
        mesh.position.z = (initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.sessionSpace) - positionAdjustment;
    }

    return {
        mesh: mesh
    };

};


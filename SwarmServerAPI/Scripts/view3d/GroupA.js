var GroupA = function (z) {

    var mesh = new THREE.Group();

    var squareSize = 1;
    var margin = 1;
    var sizeWithMargin = margin + squareSize;

    mesh.position.z = sizeWithMargin * z;

    var initialCalculatedPositionZ = mesh.position.z;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        mesh.position.z = initialCalculatedPositionZ * scaleOptions.getOptions().sessionSpace;
    }

    return {
        mesh: mesh
    };

};


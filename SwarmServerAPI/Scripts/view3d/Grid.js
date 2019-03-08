var Grid = function () {

    var mesh = new THREE.GridHelper(100, 10);
    mesh.position.x = 50.05;
    mesh.position.z = 50.05;

    var topHeightMargin = 2;
    var positionTopBase = groupAssembler.getPositionTopBase();

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        mesh.visible = render.getSelectedScene().hideShowOptions.options.grid;

        mesh.position.y = ((groupAssembler.getMostHighFileSpacePoints() * render.getSelectedScene().scaleOptions.options.heightScale + topHeightMargin) * (-1)) + positionTopBase;
    }

    return {
        mesh: mesh
    };

};


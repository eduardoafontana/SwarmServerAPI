var Grid = function () {

    var mesh = new THREE.GridHelper(100, 10);
    mesh.position.x = 50.05;
    mesh.position.z = 50.05;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        mesh.visible = render.getSelectedScene().hideShowOptions.options.grid;
    }

    return {
        mesh: mesh
    };

};


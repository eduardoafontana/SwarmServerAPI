var TubeSphere = function (cube, data) {

    var geometry = new THREE.SphereGeometry(0.2, 20, 20);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    var mesh = new THREE.Mesh(geometry, material);

    var marginBottom = 10;
    var height = data.line * 50 / groupAssembler.getMostHighFileLine();
    var heightWithMargin = height + marginBottom;

    mesh.position.x = cube.data.x * 1.5;
    mesh.position.y = heightWithMargin;
    mesh.position.z = cube.data.z * 1.5;

    var initialCalculatedPositionX = mesh.position.x;
    var initialCalculatedPositionZ = mesh.position.z;
    var initialHeight = height;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        mesh.position.x = initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace;
        mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.cubeSpace;

        mesh.position.y = (initialHeight * render.getSelectedScene().scaleOptions.options.heightScale) + marginBottom;
    }

    return {
        mesh: mesh
    };
};
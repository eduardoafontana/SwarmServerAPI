﻿var TubeSphere = function (cube, data) {

    var geometry = new THREE.SphereBufferGeometry(0.2, 20, 20);
    var material = new THREE.MeshBasicMaterial();
    var mesh = new THREE.Mesh(geometry, material);

    var marginBottom = 0.5;
    var height = data.line * 50 / groupAssembler.getMostHighFileLine();
    var heightWithMargin = height + marginBottom;

    mesh.position.x = cube.data.x * 1.5;
    mesh.position.y = heightWithMargin;
    mesh.position.z = cube.data.z;

    var initialCalculatedPositionX = mesh.position.x;
    var initialCalculatedPositionZ = mesh.position.z;
    var initialHeight = height;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        material.color.setHex(render.getSelectedColorPalette().tubeSphere);

        mesh.visible = render.getSelectedScene().hideShowOptions.options.pathNodePoints;

        mesh.position.x = initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace;

        mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.sessionSpace;

        mesh.position.y = (initialHeight * render.getSelectedScene().scaleOptions.options.heightScale) + marginBottom;
    }

    return {
        mesh: mesh
    };
};
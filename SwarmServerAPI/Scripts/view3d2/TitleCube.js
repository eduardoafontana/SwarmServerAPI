﻿var TitleCube = function (cube) {

    var parameters = {
        font: render.getFont(),
        size: 0.3,
        height: 0.001,
        curveSegments: 20,
        bevelEnabled: false
    };

    var text = '';

    if (cube.data.fileName != undefined)
        text = cube.data.fileName;

    var geometry = new THREE.TextBufferGeometry(text, parameters);

    //var edges = new THREE.EdgesGeometry(geometry);
    //var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 10 }));

    var material = new THREE.MeshBasicMaterial();
    var mesh = new THREE.Mesh(geometry, material);

    //mesh.add(line);

    var height = cube.mesh.geometry.parameters.height;
    var marginBottom = 0.5;
    var heightWithMargin = height + marginBottom;
    var topMargin = 0;

    const center = new THREE.Vector3();
    var box = new THREE.Box3().setFromObject(mesh);

    var margin = 1.5;//cubeMargin + cubeSize

    var sizeWidth = box.getSize(center).x;
    var sizeWidthHalf = sizeWidth / 2;
    var initialPositionX = cube.data.x * margin;

    mesh.position.y = topMargin + heightWithMargin;
    mesh.position.x = initialPositionX - sizeWidthHalf;
    mesh.position.z = cube.data.z;

    var initialCalculatedPositionX = initialPositionX;
    var initialCalculatedPositionZ = mesh.position.z;
    var initialHeight = height;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        material.color.setHex(render.getSelectedColorPalette().titleTube);

        mesh.visible = render.getSelectedScene().hideShowOptions.options.title;

        mesh.position.x = (initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace) - sizeWidthHalf;

        mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.sessionSpace;

        mesh.position.y = (initialHeight * render.getSelectedScene().scaleOptions.options.heightScale) + topMargin + marginBottom;

        var newScale = render.getSelectedScene().scaleOptions.options.titleScale;
        mesh.scale.set(newScale, newScale, newScale);
    }

    return {
        mesh: mesh
    };
};

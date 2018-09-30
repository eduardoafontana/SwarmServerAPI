﻿var Torus = function (cube, data, scaleOptions) {

    var height = data.line * 50 / groupAssembler.getMostHighFileLine();

    var radius = 0.7;
    var topMargin = 0.5;

    var geometry = new THREE.TorusGeometry(radius, 0.1, 100, 100);
    var material = new THREE.MeshBasicMaterial({ color: 0x0000dd });
    var mesh = new THREE.Mesh(geometry, material);

    var margin = 0.1;
    var torusSize = radius * 2; //diameter
    var sizeWithMargin = margin + torusSize;
    var marginBottom = 10;

    var heightWithMargin = height + marginBottom;

    mesh.position.y = heightWithMargin;
    mesh.position.x = sizeWithMargin * cube.data.x;
    mesh.position.z = sizeWithMargin * cube.data.z;

    mesh.rotation.x = 1.6; //flip to horizontal

    var initialCalculatedPositionX = mesh.position.x;
    var initialCalculatedPositionZ = mesh.position.z;
    var initialHeight = height;
    //torus.radius = radius;
    //torus.marginBottom = marginBottom;

    //torus.cubeId = cube.id;
    //torus.group = files[i].group;
    //torus.data = files[i].breakpoints[j].data;
    //torus.isTorus = true;
    //torus.canOpenDetailBox = true;
    //torus.canHighlightOnMouseOver = true;
    //torus.canScaleChange = true;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        mesh.position.x = initialCalculatedPositionX * scaleOptions.cubeSpace;
        mesh.position.z = initialCalculatedPositionZ * scaleOptions.cubeSpace;

        mesh.scale.x = scaleOptions.breakpointScale;
        mesh.scale.y = scaleOptions.breakpointScale;
        mesh.scale.z = scaleOptions.breakpointScale;
    }

    return {
        mesh: mesh
    };

};


﻿var HideCube = function (cube, scaleOptions) {

    var height = cube.mesh.geometry.parameters.height;
    var radius = 0.5;
    var topMargin = 0.5;

    var geometry = new THREE.SphereGeometry(radius, 20, 20);
    var material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    var mesh = new THREE.Mesh(geometry, material);

    material.opacity = 0.5;
    material.transparent = true;

    var margin = 0.5;
    var sphereSize = radius * 2; //diameter
    var sizeWithMargin = margin + sphereSize;
    var marginBottom = 10;

    var heightWithMargin = height + marginBottom;

    mesh.position.y = radius + topMargin + heightWithMargin;
    mesh.position.x = sizeWithMargin * cube.data.x;
    mesh.position.z = sizeWithMargin * cube.data.z;

    var initialCalculatedPositionX = mesh.position.x;
    var initialCalculatedPositionZ = mesh.position.z;
    var initialHeight = height;
    //mesh.radius = radius;
    //mesh.topMargin = topMargin;
    //mesh.marginBottom = marginBottom;
    //mesh.cubeId = cube.id;
    //mesh.group = files[i].group;
    //mesh.isSphere = true;
    //mesh.canHideRelated = true;
    //mesh.canHighlightOnMouseOver = true;
    //mesh.canScaleChange = true;    

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        mesh.position.x = initialCalculatedPositionX * scaleOptions.cubeSpace;
        mesh.position.z = initialCalculatedPositionZ * scaleOptions.cubeSpace;
    }

    return {
        mesh: mesh
    };

};


var Cylinder = function (files) {

    if (files.length == 0) {
        console.log('Zero files array on Cylinder object.');
        return;
    }

    var lastFileData = files[0];

    for (var i = 0; i < files.length; i++) {
        if (files[i].x > lastFileData.x)
            lastFileData = files[i];
    }

    var radius = 0.02;
    var marginLeft = 0.5;
    var marginRight = 0.5;
    var cubeSizePlusCubeMargin = 3;
    var width = (lastFileData.x * cubeSizePlusCubeMargin) + marginLeft + marginRight;

    var geometry = new THREE.CylinderBufferGeometry(radius, radius, width, 10);
    var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });
    var mesh = new THREE.Mesh(geometry, material);

    mesh.rotation.z = Math.PI / 2; //rotate 180º

    var adjustToZeroAxisX = width / 2;
    var height = radius * 2;

    mesh.position.y = height + groupAssembler.getPositionTopBase();;
    mesh.position.x = adjustToZeroAxisX - marginLeft;
    mesh.position.z = lastFileData.z;

    var initialCalculatedPositionZ = mesh.position.z;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        material.color.setHex(render.getSelectedColorPalette().tube);

        mesh.visible = render.getSelectedScene().hideShowOptions.options.baseArchitecture;

        mesh.scale.y = render.getSelectedScene().scaleOptions.options.cubeSpace;
        mesh.position.x = (render.getSelectedScene().scaleOptions.options.cubeSpace * adjustToZeroAxisX) - marginLeft;
        mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.sessionSpace;

        geometry.colorsNeedUpdate = true;
    }

    return {
        mesh: mesh
    };

};


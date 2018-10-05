var Cube = function (data) {

    var data = data;
    var height = data.lines * 50 / groupAssembler.getMostHighFileLine();

    var squareSize = 1;

    var ySize = height;
    var xSize = squareSize;
    var zSize = squareSize;

    var geometry = new THREE.BoxGeometry(xSize, ySize, zSize);
    var material = new THREE.MeshBasicMaterial({ color: 0x7e96bc });
    var mesh = new THREE.Mesh(geometry, material);

    material.opacity = 0.5;
    material.transparent = true;

    var adjustToZeroAxisY = ySize / 2
    var margin = 0.5;
    var sizeWithMargin = margin + squareSize;
    var marginBottom = 10;

    mesh.position.y = marginBottom + adjustToZeroAxisY;
    mesh.position.x = sizeWithMargin * data.x;
    mesh.position.z = sizeWithMargin * data.z;

    var initialCalculatedPositionX = mesh.position.x;
    var initialCalculatedPositionZ = mesh.position.z;
    var initialCalculatedPositionY = adjustToZeroAxisY;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        mesh.position.x = initialCalculatedPositionX * scaleOptions.getOptions().cubeSpace;
        mesh.position.z = initialCalculatedPositionZ * scaleOptions.getOptions().cubeSpace;

        mesh.scale.y = scaleOptions.getOptions().heightScale;
        mesh.position.y = (initialCalculatedPositionY * scaleOptions.getOptions().heightScale) + marginBottom;

        //--
        //mesh.position.x = initialCalculatedPositionX * scaleOptions.getOptions().sessionSpace;
        //mesh.position.z = initialCalculatedPositionZ * scaleOptions.getOptions().sessionSpace;

        //if (mesh.position.x == 0)
        //mesh.position.z = node.initialCalculatedPositionZ * scaleOptions.groupSpace;

        //node.position.x = (firstNodeOfGroup.position.x - firstNodeOfGroup.initialCalculatedPositionX) + node.initialCalculatedPositionX;
        //node.position.z = (firstNodeOfGroup.position.z - firstNodeOfGroup.initialCalculatedPositionZ) + node.initialCalculatedPositionZ;
    }

    return {
        mesh: mesh,
        data: data
    };

};


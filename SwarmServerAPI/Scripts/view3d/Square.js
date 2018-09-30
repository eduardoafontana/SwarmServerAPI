var Square = function (cube, data, scaleOptions) {

    var height = data.line * 50 / groupAssembler.getMostHighFileLine();

    var radius = 0.7;
    var topMargin = 0.5;

    var geometry = new THREE.TorusGeometry(radius, 0.1, 100, 4);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
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
    mesh.rotation.z = 0.8; //rotate to equal cube node

    var initialCalculatedPositionX = mesh.position.x;
    var initialCalculatedPositionZ = mesh.position.z;
    var initialHeight = height;
    //torus.marginBottom = marginBottom;

    //square.cubeId = cube.id;
    //square.group = files[i].group;
    //square.data = files[i].events[j].data;
    //square.isTorusSquare = true;
    //square.canOpenDetailBox = true;
    //square.canHighlightOnMouseOver = true;
    //square.canScaleChange = true;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        mesh.position.x = initialCalculatedPositionX * scaleOptions.cubeSpace;
        mesh.position.z = initialCalculatedPositionZ * scaleOptions.cubeSpace;

        mesh.scale.x = scaleOptions.eventScale;
        mesh.scale.y = scaleOptions.eventScale;
        mesh.scale.z = scaleOptions.eventScale;
    }

    return {
        mesh: mesh
    };

};


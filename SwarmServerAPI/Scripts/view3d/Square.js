var Square = function (cube, data) {

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

    //square.cubeId = cube.id;
    //square.group = files[i].group;
    //square.data = files[i].events[j].data;
    //square.isTorusSquare = true;
    //mesh.canOpenDetailBox = true;//remover
    //mesh.data = data.data;//remover
    //square.canHighlightOnMouseOver = true;
    //square.canScaleChange = true;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        mesh.position.x = initialCalculatedPositionX * scaleOptions.getOptions().cubeSpace;
        mesh.position.z = initialCalculatedPositionZ * scaleOptions.getOptions().cubeSpace;

        mesh.scale.x = scaleOptions.getOptions().eventScale;
        mesh.scale.y = scaleOptions.getOptions().eventScale;
        mesh.scale.z = scaleOptions.getOptions().eventScale;

        mesh.position.y = (initialHeight * scaleOptions.getOptions().heightScale) + marginBottom;

        if (render.wasClicked(mesh)) {
            var box = document.getElementsByClassName("detail-box")[0];

            box.style.visibility = 'visible';

            var boxMain = box.getElementsByClassName("detail-box-main")[0];

            var wrapper = document.createElement('div');
            wrapper.innerHTML = data.data;

            boxMain.innerHTML = '';
            boxMain.appendChild(wrapper);
        }
    }

    return {
        mesh: mesh
    };

};


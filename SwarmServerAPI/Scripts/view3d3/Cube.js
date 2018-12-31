var Cube = function (data) {

    var data = data;
    var height = data.nodePoints + data.nodeSpaceAfter; 

    var squareSize = 1;

    var ySize = height;
    var xSize = squareSize;
    var zSize = squareSize;

    var geometry = new THREE.BoxGeometry(xSize, ySize, zSize, 1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });
    var mesh = new THREE.Mesh(geometry, material);

    mesh.name = 'Cube';

    material.opacity = 0.5;
    material.transparent = true;

    var adjustToZeroAxisY = (ySize / 2) * (-1);
    var margin = 2;
    var sizeWithMargin = margin + squareSize;
    var marginBottom = (-1) * data.nodeSpaceBefore;
    var positionTopBase = groupAssembler.getPositionTopBase();

    mesh.position.y = marginBottom + adjustToZeroAxisY + positionTopBase;
    mesh.position.x = sizeWithMargin * data.x;
    mesh.position.z = zSize * data.z;

    var initialCalculatedPositionX = mesh.position.x;
    var initialCalculatedPositionZ = mesh.position.z;
    var initialCalculatedPositionY = adjustToZeroAxisY;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        var originalColor = render.getSelectedColorPalette().cube;

        if (data.z % 2 != 0)
            originalColor = render.getSelectedColorPalette().cubeContrast;

        mesh.visible = render.getSelectedScene().hideShowOptions.options.file;

        mesh.position.x = initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace;

        mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.sessionSpace;

        mesh.scale.y = render.getSelectedScene().scaleOptions.options.heightScale;
        mesh.position.y = (initialCalculatedPositionY * render.getSelectedScene().scaleOptions.options.heightScale) + marginBottom + positionTopBase;

        if (render.wasClicked(mesh)) {
            var box = document.getElementsByClassName("detail-box")[0];

            box.style.visibility = 'visible';

            var boxMain = box.getElementsByClassName("detail-box-main")[0];

            var wrapper = document.createElement('div');

            dataControl.getSourceCodeFromServer(data.originalId).then(function (dataFromServer) {
                wrapper.innerHTML = '<pre>' + dataFromServer + '</pre>';
            });

            boxMain.innerHTML = '';
            boxMain.appendChild(wrapper);
        }
        
        material.color.setHex(originalColor);

        if (render.wasMouseOver(mesh)) {
            infobox.setHtml('Click to show the line code for this part of the file.');

            material.color.setHex(render.getSelectedColorPalette().pointOver);
        }

        geometry.colorsNeedUpdate = true;
    }

    return {
        mesh: mesh,
        data: data
    };

};


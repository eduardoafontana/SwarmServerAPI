var Cube = function (data) {

    var data = data;
    var height = data.lines * 50 / groupAssembler.getMostHighFileLine();

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

    var adjustToZeroAxisY = ySize / 2
    var margin = 0.5;
    var sizeWithMargin = margin + squareSize;
    var marginBottom = 0.5;

    mesh.position.y = marginBottom + adjustToZeroAxisY;
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
        mesh.position.y = (initialCalculatedPositionY * render.getSelectedScene().scaleOptions.options.heightScale) + marginBottom;

        if (render.wasClicked(mesh)) {
            var box = document.getElementsByClassName("detail-box")[0];

            box.style.visibility = 'visible';

            var boxMain = box.getElementsByClassName("detail-box-main")[0];

            var line = render.getIntersectedObjectData().point.y * geometry.parameters.heightSegments / (geometry.parameters.height + marginBottom);
            line = Math.round(line);

            var wrapper = document.createElement('div');
            //wrapper.innerHTML = 'Do a backend request to get the code around line ' + line;

            dataControl.getSourceCodeFromServer(data.originalId).then(function (dataFromServer) {

                wrapper.innerHTML = '<pre>' + dataFromServer + '</pre>';

            });

            boxMain.innerHTML = '';
            boxMain.appendChild(wrapper);
        }
        
        for (var i = 0; i < geometry.faces.length; i++) {
            geometry.faces[i].color.setHex(originalColor);
        }        

        if (render.wasMouseOver(mesh)) {
            infobox.setHtml('Click to show the line code for this part of the file.');

            geometry.faces[render.getIntersectedObjectData().faceIndex].color.setHex(render.getSelectedColorPalette().pointOver);
            //geometry.faces[geometry.faces[render.getIntersectedObjectData().faceIndex].a].color.setHex(0xff0000);
            //geometry.faces[geometry.faces[render.getIntersectedObjectData().faceIndex].b].color.setHex(0xff0000);
            //geometry.faces[geometry.faces[render.getIntersectedObjectData().faceIndex].c].color.setHex(0xff0000);
            //TODO: review later

            if (render.getIntersectedObjectData().faceIndex % 2 === 0)
                geometry.faces[render.getIntersectedObjectData().faceIndex + 1].color.setHex(render.getSelectedColorPalette().pointOver);
            else
                geometry.faces[render.getIntersectedObjectData().faceIndex - 1].color.setHex(render.getSelectedColorPalette().pointOver);
        }

        geometry.colorsNeedUpdate = true;
    }

    return {
        mesh: mesh,
        data: data
    };

};


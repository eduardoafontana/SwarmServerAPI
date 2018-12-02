
//TODO: review later
var material1 = new THREE.MeshBasicMaterial({ color: 0xb0aeae, side: THREE.DoubleSide });
var material2 = new THREE.MeshBasicMaterial({ color: 0xdddddd, side: THREE.DoubleSide });
var controlMaterial = 1;

var material = material1;

var Plane = function (data) {

    var data = data;
    var height = data.lines * 50 / groupAssembler.getMostHighFileLine();

    var squareSize = 1;

    var ySize = height;
    var xSize = squareSize;
    var zSize = squareSize;

    //var originalColor = render.getSelectedColorPalette().cube;

    //if (data.z % 2 != 0)
    //    originalColor = render.getSelectedColorPalette().cubeContrast;
    //TODO: review later

    var geometry = new THREE.PlaneBufferGeometry(xSize, ySize, 1, data.lines);

    if (controlMaterial % 2 == 0) {
        material = material1;
        controlMaterial = 1;
    } else {
        material = material2;
        controlMaterial = 2;
    }

    var mesh = new THREE.Mesh(geometry, material);

    mesh.name = 'Cube';

    material.opacity = 0.5;
    material.transparent = true;

    var adjustToZeroAxisY = ySize / 2
    //var margin = 10;
    var margin = 0.5;
    var sizeWithMargin = margin + squareSize;
    //var marginBottom = 50;
    var marginBottom = 0.5;

    mesh.position.y = marginBottom + adjustToZeroAxisY;
    //mesh.position.x = sizeWithMargin * data.x * 10;
    mesh.position.x = sizeWithMargin * data.x;
    //mesh.position.z = zSize * data.z * 10;
    mesh.position.z = zSize * data.z;

    var initialCalculatedPositionX = mesh.position.x;
    var initialCalculatedPositionZ = mesh.position.z;
    var initialCalculatedPositionY = adjustToZeroAxisY;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

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
            wrapper.innerHTML = 'Do a backend request to get the code around line ' + line;

            boxMain.innerHTML = '';
            boxMain.appendChild(wrapper);
        }

        //TODO: review later
        //for (var i = 0; i < geometry.faces.length; i++) {
        //    geometry.faces[i].color.setHex(originalColor);
        //}      

        var intersects = render.getRaycaster().intersectObject(mesh);

        if (intersects.length > 0) {
            var overedObject = intersects[0].object;
            infobox.setHtml('Catou.');
        } else {
            //infobox.setHtml('Descatou.');
        }

        if (render.wasMouseOver(mesh)) {
            infobox.setHtml('Click to show the line code for this part of the file.');

            //geometry.faces[render.getIntersectedObjectData().faceIndex].color.setHex(render.getSelectedColorPalette().pointOver);
            //TODO: review later

            //geometry.faces[geometry.faces[render.getIntersectedObjectData().faceIndex].a].color.setHex(0xff0000);
            //geometry.faces[geometry.faces[render.getIntersectedObjectData().faceIndex].b].color.setHex(0xff0000);
            //geometry.faces[geometry.faces[render.getIntersectedObjectData().faceIndex].c].color.setHex(0xff0000);
            //TODO: review later

            //TODO: review later
            //if (render.getIntersectedObjectData().faceIndex % 2 === 0)
            //    geometry.faces[render.getIntersectedObjectData().faceIndex + 1].color.setHex(render.getSelectedColorPalette().pointOver);
            //else
            //    geometry.faces[render.getIntersectedObjectData().faceIndex - 1].color.setHex(render.getSelectedColorPalette().pointOver);
        }

        //geometry.colorsNeedUpdate = true;
    }

    return {
        mesh: mesh,
        data: data
    };

};


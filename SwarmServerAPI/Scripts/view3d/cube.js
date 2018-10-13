﻿var Cube = function (data) {

    var data = data;
    var height = data.lines * 50 / groupAssembler.getMostHighFileLine();

    var squareSize = 1;

    var ySize = height;
    var xSize = squareSize;
    var zSize = squareSize;

    var originalColor = 0x7e96bc;

    var geometry = new THREE.BoxGeometry(xSize, ySize, zSize, 1, data.lines, 1);
    var material = new THREE.MeshBasicMaterial({ color: originalColor, vertexColors: THREE.FaceColors });
    var mesh = new THREE.Mesh(geometry, material);

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

        mesh.position.x = initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace;
        //mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.cubeSpace;
        //TODO: review later

        mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.sessionSpace;

        mesh.scale.y = render.getSelectedScene().scaleOptions.options.heightScale;
        mesh.position.y = (initialCalculatedPositionY * render.getSelectedScene().scaleOptions.options.heightScale) + marginBottom;

        geometry.colorsNeedUpdate = true;
        
        for (var i = 0; i < geometry.faces.length; i++) {
            geometry.faces[i].color.setHex(originalColor);
        }        

        if (render.wasMouseOver(mesh)) {
            geometry.faces[render.getIntersectedObjectData().faceIndex].color.setHex(0xff0000);
            //geometry.faces[geometry.faces[render.getIntersectedObjectData().faceIndex].a].color.setHex(0xff0000);
            //geometry.faces[geometry.faces[render.getIntersectedObjectData().faceIndex].b].color.setHex(0xff0000);
            //geometry.faces[geometry.faces[render.getIntersectedObjectData().faceIndex].c].color.setHex(0xff0000);
            //TODO: review later

            if (render.getIntersectedObjectData().faceIndex % 2 === 0)
                geometry.faces[render.getIntersectedObjectData().faceIndex + 1].color.setHex(0xff0000);
            else
                geometry.faces[render.getIntersectedObjectData().faceIndex - 1].color.setHex(0xff0000);

            //console.log(render.getIntersectedObjectData().faceIndex);
            //TODO: review later
        }
    }

    return {
        mesh: mesh,
        data: data
    };

};


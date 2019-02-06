var PlanesDescriptor = (function () {
    var maxNumberSegmentsPerPlane = 200;
    var segmentHeight = 0.3;

    var getHeight = function (dataLines) {
        var height = dataLines * maxNumberSegmentsPerPlane / groupAssembler.getMostHighFileLine();

        return (height * segmentHeight) + segmentHeight;
    }

    var getMaxNumberSegmentsPerPlane = function () {
        return maxNumberSegmentsPerPlane;
    }

    var getSegmentHeight = function () {
        return segmentHeight;
    }

    return {
        getHeight: getHeight,
        getMaxNumberSegmentsPerPlane: getMaxNumberSegmentsPerPlane,
        getSegmentHeight: getSegmentHeight
    };
})();

var Planes = function (dataArray) {

    var defaultColorPallate = colorPalette.getColorPalleteFirst();

    var vertices = [];
    var colors = [];
    var sourceCodeIds = [];

    var segmentWidth = 1;

    var marginBottom = 0.5;
    var marginWidth = 0.5;
    var leftOver = 0.5;

    console.log(dataArray.length);

    for (var f = 0; f < dataArray.length; f++) {
        var data = dataArray[f];
        var height = data.lines * PlanesDescriptor.getMaxNumberSegmentsPerPlane() / groupAssembler.getMostHighFileLine();

        var x = ((segmentWidth + marginWidth) * data.x) - leftOver;
        var z = data.z;
        var y = marginBottom;

        var originalColor = defaultColorPallate.colors.cube;

        if (data.z % 2 != 0)
            originalColor = defaultColorPallate.colors.cubeContrast;

        var color = new THREE.Color(originalColor);

        for (var i = 0; i < height; i++) {
            sourceCodeIds.push(data.originalId);

            vertices.push(x, y, z);
            vertices.push(x + segmentWidth, y, z);
            vertices.push(x + segmentWidth, y + PlanesDescriptor.getSegmentHeight(), z);

            colors.push(color.r, color.g, color.b);
            colors.push(color.r, color.g, color.b);
            colors.push(color.r, color.g, color.b);

            vertices.push(x + segmentWidth, y + PlanesDescriptor.getSegmentHeight(), z);
            vertices.push(x, y + PlanesDescriptor.getSegmentHeight(), z);
            vertices.push(x, y, z);

            colors.push(color.r, color.g, color.b);
            colors.push(color.r, color.g, color.b);
            colors.push(color.r, color.g, color.b);

            y += PlanesDescriptor.getSegmentHeight();
        }
    }

    vertices = new Float32Array(vertices);
    colors = new Float32Array(colors);

    var originalColors = colors.slice();
    var originalVertices = vertices.slice();

    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

    var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, vertexColors: THREE.VertexColors });
    var mesh = new THREE.Mesh(geometry, material);

    material.opacity = 0.5;
    material.transparent = true;

    //mesh.name = 'Cube';

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        mesh.visible = render.getSelectedScene().hideShowOptions.options.file;

        //mesh.position.x = initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace;

        //mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.sessionSpace;

        mesh.scale.y = render.getSelectedScene().scaleOptions.options.heightScale;
        //mesh.position.y = (initialCalculatedPositionY * render.getSelectedScene().scaleOptions.options.heightScale) + marginBottom;

        if (render.wasClicked(mesh)) {
            var box = document.getElementsByClassName("detail-box")[0];

            box.style.visibility = 'visible';

            var boxMain = box.getElementsByClassName("detail-box-main")[0];

            //var line = render.getIntersectedObjectData().point.y * geometry.parameters.heightSegments / (geometry.parameters.height + marginBottom);
            //line = Math.round(line);

            var wrapper = document.createElement('div');
            //wrapper.innerHTML = 'Do a backend request to get the code around line ' + line;

            var originalId = '853C7A6B-2CB0-4E65-8805-922FD94570D7';

            dataControl.getSourceCodeFromServer(originalId).then(function (dataFromServer) {

                wrapper.innerHTML = dataFromServer;
                
            });

            boxMain.innerHTML = '';
            boxMain.appendChild(wrapper);
        }

        geometry.attributes.color.array = originalColors.slice();
        geometry.attributes.color.needsUpdate = true;

        if (render.wasMouseOver(mesh)) {
            infobox.setHtml('Click to show the line code for this part of the file.');

            var color = new THREE.Color().setRGB(1, 0, 0);

            var intersect = render.getIntersectedObjectData();

            var index = intersect.face.a * 3;
            geometry.attributes.color.array[index] = color.r;
            geometry.attributes.color.array[index + 1] = color.g;
            geometry.attributes.color.array[index + 2] = color.b;
            geometry.attributes.color.array[index + 3] = color.r;
            geometry.attributes.color.array[index + 4] = color.g;
            geometry.attributes.color.array[index + 5] = color.b;
            geometry.attributes.color.array[index + 6] = color.r;
            geometry.attributes.color.array[index + 7] = color.g;
            geometry.attributes.color.array[index + 8] = color.b;

            if (intersect.faceIndex % 2 === 0){
                geometry.attributes.color.array[index + 9] = color.r;
                geometry.attributes.color.array[index + 10] = color.g;
                geometry.attributes.color.array[index + 11] = color.b;
                geometry.attributes.color.array[index + 12] = color.r;
                geometry.attributes.color.array[index + 13] = color.g;
                geometry.attributes.color.array[index + 14] = color.b;
                geometry.attributes.color.array[index + 15] = color.r;
                geometry.attributes.color.array[index + 16] = color.g;
                geometry.attributes.color.array[index + 17] = color.b;
            } else {
                geometry.attributes.color.array[index - 1] = color.b;
                geometry.attributes.color.array[index - 2] = color.g;
                geometry.attributes.color.array[index - 3] = color.r;
                geometry.attributes.color.array[index - 4] = color.b;
                geometry.attributes.color.array[index - 5] = color.g;
                geometry.attributes.color.array[index - 6] = color.r;
                geometry.attributes.color.array[index - 7] = color.b;
                geometry.attributes.color.array[index - 8] = color.g;
                geometry.attributes.color.array[index - 9] = color.r;
            }
        }

        var cubeSpace = render.getSelectedScene().scaleOptions.options.cubeSpace;
        var sessionSpace = render.getSelectedScene().scaleOptions.options.sessionSpace;
        
        for (var i = 0; i < originalVertices.length; i += 18) {
            //x
            geometry.attributes.position.array[i] = originalVertices[i] * cubeSpace;
            geometry.attributes.position.array[i + 3] = originalVertices[i + 3] * cubeSpace;
            geometry.attributes.position.array[i + 6] = originalVertices[i + 6] * cubeSpace;
            geometry.attributes.position.array[i + 9] = originalVertices[i + 9] * cubeSpace;
            geometry.attributes.position.array[i + 12] = originalVertices[i + 12] * cubeSpace;
            geometry.attributes.position.array[i + 15] = originalVertices[i + 15] * cubeSpace;

            //z
            geometry.attributes.position.array[i + 2] = originalVertices[i + 2] * sessionSpace;
            geometry.attributes.position.array[i + 5] = originalVertices[i + 5] * sessionSpace;
            geometry.attributes.position.array[i + 8] = originalVertices[i + 8] * sessionSpace;
            geometry.attributes.position.array[i + 11] = originalVertices[i + 11] * sessionSpace;
            geometry.attributes.position.array[i + 14] = originalVertices[i + 14] * sessionSpace;
            geometry.attributes.position.array[i + 17] = originalVertices[i + 17] * sessionSpace;

            geometry.attributes.position.needsUpdate = true;
        }
    }

    return {
        mesh: mesh
    };

};


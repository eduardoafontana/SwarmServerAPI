var Planes = function (dataArray) {

    var defaultColorPallate = colorPalette.getColorPalleteFirst();

    var vertices = [];
    var colors = [];

    var count = 0;
    var maxNumberSegmentsPerPlane = 200;
    var segmentHeight = 0.3;

    for (var f = 0; f < dataArray.length; f++) {
        var data = dataArray[f];
        var height = data.lines * maxNumberSegmentsPerPlane / groupAssembler.getMostHighFileLine();

        var x = data.x;
        var z = data.z;
        var y = 0;

        var originalColor = defaultColorPallate.colors.cube;

        if (data.z % 2 != 0)
            originalColor = defaultColorPallate.colors.cubeContrast;

        var color = new THREE.Color(originalColor);

        for (var i = 0; i < height; i++) {
            vertices.push(x, y, z);
            vertices.push(x + 1, y, z);
            vertices.push(x + 1, y + segmentHeight, z);

            colors.push(color.r, color.g, color.b);
            colors.push(color.r, color.g, color.b);
            colors.push(color.r, color.g, color.b);

            vertices.push(x + 1, y + segmentHeight, z);
            vertices.push(x, y + segmentHeight, z);
            vertices.push(x, y, z);

            colors.push(color.r, color.g, color.b);
            colors.push(color.r, color.g, color.b);
            colors.push(color.r, color.g, color.b);

            y += segmentHeight;

            count++;
        }
    }

    console.log('total segments', count);

    vertices = new Float32Array(vertices);
    colors = new Float32Array(colors);

    var orignalColors = colors.slice();

    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

    var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, vertexColors: THREE.VertexColors });
    var mesh = new THREE.Mesh(geometry, material);

    material.opacity = 0.5;
    material.transparent = true;

    //--------------------------------
    //var squareSize = 1;

        //mesh.name = 'Cube';

    //var ySize = height;
    //var xSize = squareSize;
    //var zSize = squareSize;

    //var adjustToZeroAxisY = ySize / 2
    //var margin = 0.5;
    //var sizeWithMargin = margin + squareSize;
    //var marginBottom = 0.5;

    //mesh.position.y = marginBottom + adjustToZeroAxisY;
    //mesh.position.x = sizeWithMargin * data.x;
    //mesh.position.z = zSize * data.z;

    //var initialCalculatedPositionX = mesh.position.x;
    //var initialCalculatedPositionZ = mesh.position.z;
    //var initialCalculatedPositionY = adjustToZeroAxisY;

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

            boxMain.innerHTML = '';
            boxMain.appendChild(wrapper);
        }

        geometry.attributes.color.array = orignalColors.slice();
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
    }

    return {
        mesh: mesh
    };

};


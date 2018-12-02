var Planes = function (dataArray) {

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

        for (var i = 0; i < height; i++) {
            vertices.push(x, y, z);
            vertices.push(x + 1, y, z);
            vertices.push(x + 1, y + segmentHeight, z);

            colors.push(0.3, 0.3, 0.3);
            colors.push(0.3, 0.3, 0.3);
            colors.push(0.3, 0.3, 0.3);

            vertices.push(x + 1, y + segmentHeight, z);
            vertices.push(x, y + segmentHeight, z);
            vertices.push(x, y, z);

            colors.push(0.9, 0.9, 0.9);
            colors.push(0.9, 0.9, 0.9);
            colors.push(0.9, 0.9, 0.9);

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

    var material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, vertexColors: THREE.VertexColors });
    var mesh = new THREE.Mesh(geometry, material);

    //--------------------------------
    //var squareSize = 1;

    //var ySize = height;
    //var xSize = squareSize;
    //var zSize = squareSize;

    //var geometry = new THREE.PlaneBufferGeometry(xSize, ySize, 1, data.lines);
    //var mesh = new THREE.Mesh(geometry, material);

    //mesh.name = 'Cube';

    //material.opacity = 0.5;
    //material.transparent = true;

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
        }
    }

    return {
        mesh: mesh
    };

};


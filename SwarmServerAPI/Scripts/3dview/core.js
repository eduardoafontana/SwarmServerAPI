var core = (function () {

    var loadGraph = function () {
        var sessionArray = sessionData.getArray();

        for (var s = 0; s < sessionArray.length; s++) {

            var lScene = new THREE.Scene();

            var axesHelper = new THREE.AxesHelper(50);
            lScene.add(axesHelper);

            var gridHelper = new THREE.GridHelper(100, 10);
            lScene.add(gridHelper);

            var files = sessionData.getDataByGuid(sessionArray[s]);

            var filesGroupOrdered = files.sort(function (a, b) { return a.group - b.group });

            var groups = [];
            filesGroupOrdered.forEach(function (file) {
                if (groups.indexOf(file.group) == -1)
                    groups.push(file.group);
            });

            var cGroupLimit = Math.ceil(Math.sqrt(groups.length));

            var lTotal = 0, cTotal = 0, higherL = 0, cG = 0;
            groups.forEach(function (group) {
                var filesOfGroup = files.filter(function (file) {
                    return file.group == group;
                });

                var cLimit = Math.ceil(Math.sqrt(filesOfGroup.length));
                cLimit = cLimit + cTotal;

                var l = lTotal, c = cTotal;
                filesOfGroup.forEach(function (file) {
                    if (c == cLimit) {
                        l++;
                        c = cTotal;
                    }

                    if (l > higherL)
                        higherL = l;

                    file.x = c;
                    file.z = l;

                    c++;
                });

                cTotal = cLimit + 1;

                cG++;

                if (cG == cGroupLimit) {
                    lTotal = higherL + 1 + 1;
                    higherL = 0;
                    cTotal = 0;
                    cG = 0;
                }
            });

            var mostHighFileLine = 0;
            for (var i = 0; i < files.length; i++) {
                if (files[i].lines > mostHighFileLine)
                    mostHighFileLine = files[i].lines;
            }

            var color = '';
            for (var i = 0; i < files.length; i++) {
                if (i == 0)
                    color = colorPalette.pickUpColor();
                else if (files[i - 1].group != files[i].group)
                    color = colorPalette.pickUpColor();

                var cube = graph.drawCube(files[i].x, files[i].z, files[i].lines, color, mostHighFileLine);

                files[i].cubeId = cube.id;
                cube.group = files[i].group;
                cube.isCube = true;
                cube.canScaleChange = true;

                var hideButton = graph.drawSphere(files[i].x, files[i].z, cube.geometry.parameters.height, color);

                hideButton.cubeId = cube.id;
                hideButton.group = files[i].group;
                hideButton.isSphere = true;
                hideButton.canHideRelated = true;
                hideButton.canHighlightOnMouseOver = true;
                hideButton.canScaleChange = true;

                for (var j = 0; j < files[i].breakpoints.length; j++) {
                    var torus = graph.drawTorus(files[i].x, files[i].z, files[i].breakpoints[j].line, mostHighFileLine);

                    torus.cubeId = cube.id;
                    torus.group = files[i].group;
                    torus.data = files[i].breakpoints[j].data;
                    torus.isTorus = true;
                    torus.canOpenDetailBox = true;
                    torus.canHighlightOnMouseOver = true;
                    torus.canScaleChange = true;

                    lScene.add(torus);
                }

                for (var j = 0; j < files[i].events.length; j++) {
                    var square = graph.drawTorusSquare(files[i].x, files[i].z, files[i].events[j].line, mostHighFileLine);

                    square.cubeId = cube.id;
                    square.group = files[i].group;
                    square.data = files[i].events[j].data;
                    square.isTorusSquare = true;
                    square.canOpenDetailBox = true;
                    square.canHighlightOnMouseOver = true;
                    square.canScaleChange = true;

                    lScene.add(square);
                }

                lScene.add(cube);
                lScene.add(hideButton);
            }

            function searchPoint(guid) {
                for (var i = 0; i < files.length; i++) {
                    if (files[i].point != undefined && files[i].point.fromRef == guid)
                        return files[i];
                }
            }

            var vertices = [];

            xFile = searchPoint('');
            assemblyTubeVertices(xFile);

            function assemblyTubeVertices(xFile) {
                if (xFile == undefined)
                    return;

                var height = xFile.point.line * 50 / mostHighFileLine;

                var vertice = new THREE.Vector3(xFile.x * 1.5, height / 2, xFile.z * 1.5);
                vertice.cubeId = xFile.cubeId;

                vertices.push(vertice);

                if (xFile.point.toRef == '')
                    return;

                yFile = searchPoint(xFile.point.toRef);
                assemblyTubeVertices(yFile);
            }

            var tube = graph.drawTube(vertices);
            tube.name = 'tubePathNode';
            tube.isTube = true;

            lScene.add(tube);

            lScene.sessionGuid = sessionArray[s];

            graph.scenes.push(lScene);
        }
    };

    var animate = function () {
        requestAnimationFrame(core.animate);

        //--
        graph.raycaster.setFromCamera(graph.mouse, graph.camera);

        var intersects = graph.raycaster.intersectObjects(graph.scene.children);

        if (intersects.length > 0) {
            var iCubeOnGraph = -1;
            for (var i = 0; i < intersects.length; i++) {
                if (intersects[i].object.canHighlightOnMouseOver) {
                    iCubeOnGraph = i;
                    break;
                }
            }

            if (iCubeOnGraph != -1 && core.intersected != intersects[iCubeOnGraph].object) {
                var boxInfo = document.getElementsByClassName("info-box")[0];

                if (core.intersected != null) {
                    core.intersected.material.color.setHex(core.intersected.currentHex);
                    boxInfo.innerHTML = '';
                }

                core.intersected = intersects[iCubeOnGraph].object;
                core.intersected.currentHex = core.intersected.material.color.getHex();
                core.intersected.material.color.setHex(0xff0000);

                if (core.intersected.isSphere) {
                    boxInfo.innerHTML = 'Click to hide and show the cube file.';
                } else if (core.intersected.isTorus) {
                    boxInfo.innerHTML = 'Click to open breakpoint details on information window.';
                } else if (core.intersected.isTorusSquare) {
                    boxInfo.innerHTML = 'Click to open event details on information window.';
                } else {
                    boxInfo.innerHTML = '';
                }
            }
        } else {
            if (core.intersected != null) {
                core.intersected.material.color.setHex(core.intersected.currentHex);

                var boxInfo = document.getElementsByClassName("info-box")[0];
                boxInfo.innerHTML = '';
            }

            core.intersected = null;
        }
        //--

        graph.renderer.render(graph.scene, graph.camera);
        graph.stats.update();
    };

    var initGraph = function () {
        var orbit = new THREE.OrbitControls(graph.camera, graph.renderer.domElement);
        orbit.enableZoom = true;
        orbit.maxPolarAngle = Math.PI * 0.5;

        var canvasRenderRelativeSize = document.body.getElementsByClassName("canvasRenderRelativeSize")[0];
        canvasRenderRelativeSize.appendChild(graph.renderer.domElement);
        canvasRenderRelativeSize.appendChild(graph.stats.dom);

        graph.stats.dom.style.position = 'static';
        graph.stats.dom.style.top = 'auto';
        graph.stats.dom.style.left = 'auto';
        graph.stats.dom.style.float = 'left';
        graph.stats.dom.style.marginTop = '-55px';
    };

    return {
        initGraph: initGraph,
        loadGraph: loadGraph,
        intersected: null,
        animate: animate,
    };

}());


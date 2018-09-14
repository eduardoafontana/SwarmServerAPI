var view3d = (function () {
   

    function onDocumentMouseMove(event) {
        var positions = document.body.getElementsByClassName("canvasRenderRelativeSize")[0].getBoundingClientRect();

        setMouseRelativePosition(event, positions);
    }

    function setMouseRelativePosition(eventAbsolute, relativePositions) {
        graph.mouse.x = ((eventAbsolute.clientX - relativePositions.x) / getRelativeWidth()) * 2 - 1;
        graph.mouse.y = - ((eventAbsolute.clientY - relativePositions.y) / getRelativeHeight()) * 2 + 1;
    }

    function onDocumentMouseDown(event) {
        var positions = document.body.getElementsByClassName("canvasRenderRelativeSize")[0].getBoundingClientRect();
        setMouseRelativePosition(event, positions);

        graph.raycaster.setFromCamera(graph.mouse, graph.camera);

        var intersects = graph.raycaster.intersectObjects(graph.scene.children);
        if (intersects.length > 0) {
            var intersect = intersects[0];

            if (intersect.object.canOpenDetailBox) {
                var box = document.getElementsByClassName("detail-box")[0];

                box.style.visibility = 'visible';

                var boxMain = box.getElementsByClassName("detail-box-main")[0];

                var wrapper = document.createElement('div');
                wrapper.innerHTML = intersect.object.data;

                boxMain.innerHTML = '';
                boxMain.appendChild(wrapper);
            }

            if (intersect.object.canHideRelated) {
                var cubeFromSphere = graph.scene.getObjectById(intersect.object.cubeId, true);

                if (cubeFromSphere.visible)
                    cubeFromSphere.visible = false;
                else
                    cubeFromSphere.visible = true;
            }
        }
    }

    function getRelativeHeight() {
        return document.body.getElementsByClassName("canvasRenderRelativeSize")[0].offsetHeight;
    }

    function getRelativeWidth() {
        return document.body.getElementsByClassName("canvasRenderRelativeSize")[0].offsetWidth;
    }

    function onWindowResize() {
        graph.camera.aspect = getRelativeWidth() / getRelativeHeight();
        graph.camera.updateProjectionMatrix();

        graph.renderer.setSize(getRelativeWidth(), getRelativeHeight());

        //--
        var box = document.getElementsByClassName("detail-box")[0];
        relocateDetailBox(box, graph.renderer.getSize().width, graph.renderer.getSize().height);

        //--
        var boxInfo = document.getElementsByClassName("info-box")[0];
        relocateInfoBox(boxInfo, graph.renderer.getSize().width, graph.renderer.getSize().height);
    }

    function loadGraph() {
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

                vertices.push(new THREE.Vector3(xFile.x * 1.5, height / 2, xFile.z * 1.5));

                if (xFile.point.toRef == '')
                    return;

                yFile = searchPoint(xFile.point.toRef);
                assemblyTubeVertices(yFile);
            }

            var tube = graph.drawTube(vertices);
            lScene.add(tube);

            lScene.sessionGuid = sessionArray[s];

            graph.scenes.push(lScene);
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        graph.renderer.setSize(getRelativeWidth(), getRelativeHeight());

        var canvasRenderRelativeSize = document.body.getElementsByClassName("canvasRenderRelativeSize")[0];
        canvasRenderRelativeSize.appendChild(graph.renderer.domElement);
        canvasRenderRelativeSize.appendChild(graph.stats.dom);

        graph.stats.dom.style.position = 'static';
        graph.stats.dom.style.top = 'auto';
        graph.stats.dom.style.left = 'auto';
        graph.stats.dom.style.float = 'left';
        graph.stats.dom.style.marginTop = '-55px';

        initDetailBox(graph.renderer.getSize().width, graph.renderer.getSize().height);
        initInfoBox(graph.renderer.getSize().width, graph.renderer.getSize().height);

        graph.camera.position.set(60, 60, 60);
        graph.camera.lookAt(new THREE.Vector3(0, 0, 0));

        var orbit = new THREE.OrbitControls(graph.camera, graph.renderer.domElement);
        orbit.enableZoom = true;
        orbit.maxPolarAngle = Math.PI * 0.5;

        var intersected = null;

        document.body.getElementsByClassName("canvasRenderRelativeSize")[0].addEventListener('mousemove', onDocumentMouseMove, false);

        document.addEventListener('mousedown', onDocumentMouseDown, false);

        window.addEventListener('resize', onWindowResize, false);

        var animate = function () {
            requestAnimationFrame(animate);

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

                if (iCubeOnGraph != -1 && intersected != intersects[iCubeOnGraph].object) {
                    var boxInfo = document.getElementsByClassName("info-box")[0];

                    if (intersected != null) {
                        intersected.material.color.setHex(intersected.currentHex);
                        boxInfo.innerHTML = '';
                    }

                    intersected = intersects[iCubeOnGraph].object;
                    intersected.currentHex = intersected.material.color.getHex();
                    intersected.material.color.setHex(0xff0000);

                    if (intersected.isSphere) {
                        boxInfo.innerHTML = 'Click to hide and show the cube file.';
                    } else if (intersected.isTorus) {
                        boxInfo.innerHTML = 'Click to open breakpoint details on information window.';
                    } else if (intersected.isTorusSquare) {
                        boxInfo.innerHTML = 'Click to open event details on information window.';
                    } else {
                        boxInfo.innerHTML = '';
                    }
                }
            } else {
                if (intersected != null) {
                    intersected.material.color.setHex(intersected.currentHex);

                    var boxInfo = document.getElementsByClassName("info-box")[0];
                    boxInfo.innerHTML = '';
                }

                intersected = null;
            }
            //--

            graph.renderer.render(graph.scene, graph.camera);
            graph.stats.update();
        };

        onWindowResize();

        loadGraph();

        loadProjectSelect();
        loadSessionSelect(document.getElementById("project-select").value);

        animate();

        //-----

        document.getElementsByClassName("reset-camera-button")[0].addEventListener("click", function () {
            graph.camera.position.set(60, 60, 60);
            graph.camera.lookAt(new THREE.Vector3(0, 0, 0));
        });

        //------------------------------

        var colorOptions = {
            Background: "#000000",
            Groups: colorPalette.defaultColorPaletteName
        };

        graph.colorOptions = colorOptions;

        var guiColorOtions = new dat.GUI({ autoPlace: false });
        guiColorOtions.add(colorOptions, 'Groups', colorPalette.getColorPalatteArray()).onChange(function () { graph.changeGroupColor(colorOptions) });
        guiColorOtions.addColor(colorOptions, 'Background').onChange(function () { graph.changeColor(colorOptions) });

        document.getElementsByClassName("tool-box")[0].appendChild(guiColorOtions.domElement);

        document.getElementsByClassName("tool-colorchange")[0].addEventListener("click", function () {
            if (guiColorOtions.domElement.style.visibility == 'visible') {
                guiColorOtions.domElement.style.visibility = 'hidden';
                this.className = '';
            } else {
                guiColorOtions.domElement.style.visibility = 'visible';
                this.className = 'selected';
            }
        });

        //-------------------------------

        var scaleOptions = {
            cubeSpace: 1,
            groupSpace: 1,
            fileScale: 1,
            breakpointScale: 0.1,
            eventScale: 0.1
        };

        graph.scaleOptions = scaleOptions;

        var guiScaleOtions = new dat.GUI({ autoPlace: false });
        guiScaleOtions.add(scaleOptions, 'cubeSpace', 1, 5).onChange(function () { graph.changeCubeScale(scaleOptions) });
        guiScaleOtions.add(scaleOptions, 'groupSpace', 1, 5).onChange(function () { graph.changeGroupScale(scaleOptions) });
        guiScaleOtions.add(scaleOptions, 'fileScale', 0.1, 3).onChange(function () { graph.changeFileScale(scaleOptions) });
        guiScaleOtions.add(scaleOptions, 'breakpointScale', 0.03, 0.3).onChange(function () { graph.changeTorusScale(scaleOptions) });
        guiScaleOtions.add(scaleOptions, 'eventScale', 0.03, 0.3).onChange(function () { graph.changeTorusSquereScale(scaleOptions) });

        document.getElementsByClassName("tool-box")[0].appendChild(guiScaleOtions.domElement);

        document.getElementsByClassName("tool-scalechange")[0].addEventListener("click", function () {
            if (guiScaleOtions.domElement.style.visibility == 'visible') {
                guiScaleOtions.domElement.style.visibility = 'hidden';
                this.className = '';
            } else {
                guiScaleOtions.domElement.style.visibility = 'visible';
                this.className = 'selected';
            }
        });

        function resetSessionScene() {
            for (var i = 0; i < graph.scenes.length; i++) {
                if (graph.scenes[i].sessionGuid == sessionData.getDefault()) {
                    graph.scene = graph.scenes[i];
                    break;
                }
            }
        }

        //--
        function loadSessionSelect(projectGuid) {
            var sessionSelect = document.getElementById("session-select");

            do {
                sessionSelect.remove(0);
            } while (sessionSelect.length > 0);

            var dataOfProject = projectData.getDataByGuid(projectGuid);

            for (let i = 0; i < dataOfProject.length; i++) {
                var session = sessionData.getByGuid(dataOfProject[i]);
                var option = document.createElement('option');

                option.text = session.name;
                option.value = session.guid;

                if (session.guid == sessionData.getDefault())
                    option.selected = true;

                sessionSelect.add(option);
            }

            sessionData.setDefault(sessionSelect.value);
            resetSessionScene();

            sessionSelect.addEventListener("change", function () {
                sessionData.setDefault(sessionSelect.value);
                resetSessionScene();
            });
        }

        function loadProjectSelect() {
            var projectSelect = document.getElementById("project-select");
            var projectArray = projectData.getArray();

            for (let i = 0; i < projectArray.length; i++) {
                var option = document.createElement('option');

                option.text = projectArray[i].name;
                option.value = projectArray[i].guid;

                if (projectArray[i].guid == projectData.getDefault())
                    option.selected = true;

                projectSelect.add(option);
            }

            projectSelect.addEventListener("change", function () {
                loadSessionSelect(projectSelect.value);
            });
        }
    });

}());


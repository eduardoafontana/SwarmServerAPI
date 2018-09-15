var view3d = (function () {

    function resetCameraPosition() {
        graph.resetCameraPosition();
    }

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

    document.addEventListener("DOMContentLoaded", function () {

        //--Event initializer
        document.body.getElementsByClassName("canvasRenderRelativeSize")[0].addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('mousedown', onDocumentMouseDown, false);
        document.getElementsByClassName('reset-camera-button')[0].addEventListener('click', resetCameraPosition);
        window.addEventListener('resize', onWindowResize, false);
        //---

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

        resetCameraPosition();

        var orbit = new THREE.OrbitControls(graph.camera, graph.renderer.domElement);
        orbit.enableZoom = true;
        orbit.maxPolarAngle = Math.PI * 0.5;

        onWindowResize();

        core.loadGraph();

        loadProjectSelect();
        loadSessionSelect(document.getElementById("project-select").value);

        core.animate();

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
            graph.resetSessionScene(sessionData.getDefault());

            sessionSelect.addEventListener("change", function () {
                sessionData.setDefault(sessionSelect.value);
                graph.resetSessionScene(sessionData.getDefault());
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


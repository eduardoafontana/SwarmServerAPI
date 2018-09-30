﻿var view3d = (function () {

    document.addEventListener("DOMContentLoaded", function () {

        render.initGraph();
        scaleOptions.init();
        infobox.init();
        detailbox.init();



        var sessionArray = sessionData.getArray();

        //for (var s = 0; s < sessionArray.length; s++) {
        var s = 0;

        var scene = render.getNewScene();
        scene.sessionGuid = sessionArray[s];

        var files = sessionData.getDataByGuid(sessionArray[s]);

        //generate infos x z positions and mostHighFileLine.
        groupAssembler.mount(files);

        for (var i = 0; i < files.length; i++) {
            var cube = Cube(files[i]);
            scene.add(cube.mesh);

            var hideCube = HideCube(cube);
            scene.add(hideCube.mesh);

            for (var j = 0; j < files[i].breakpoints.length; j++) {
                var torus = Torus(cube, files[i].breakpoints[j]);
                scene.add(torus.mesh);
            }

            for (var j = 0; j < files[i].events.length; j++) {
                var torus = Square(cube, files[i].events[j]);
                scene.add(torus.mesh);
            }
        }
        //}

        //--------------------------
        window.addEventListener('resize', render.onWindowResize, false);
        window.addEventListener('resize', infobox.init, false);
        window.addEventListener('resize', detailbox.init, false);
        document.getElementsByClassName('reset-camera-button')[0].addEventListener('click', render.resetCameraPosition);
        document.getElementsByClassName("canvasRenderRelativeSize")[0].addEventListener('mousemove', render.onDocumentMouseMove, false);
        document.addEventListener('mousedown', render.onDocumentMouseDown, false);
        //---------------------------

        //--Load Selectors
        //loadProjectSelect();
        //loadSessionSelect(document.getElementById("project-select").value);

        //sessionData.setDefault(document.getElementById("session-select").value);
        ////--

        //core.initGraph();
        //core.loadGraph();

        //graph.resetSessionScene(sessionData.getDefault());

        //core.animate();

        //-------------------------------


        //--
        //function loadSessionSelect(projectGuid) {
        //    var sessionSelect = document.getElementById("session-select");

        //    do {
        //        sessionSelect.remove(0);
        //    } while (sessionSelect.length > 0);

        //    var dataOfProject = projectData.getDataByGuid(projectGuid);

        //    for (let i = 0; i < dataOfProject.length; i++) {
        //        var session = sessionData.getByGuid(dataOfProject[i]);
        //        var option = document.createElement('option');

        //        option.text = session.name;
        //        option.value = session.guid;

        //        if (session.guid == sessionData.getDefault())
        //            option.selected = true;

        //        sessionSelect.add(option);
        //    }

        //    sessionSelect.addEventListener("change", function () {
        //        sessionData.setDefault(sessionSelect.value);
        //        graph.resetSessionScene(sessionData.getDefault());
        //    });
        //}

        //function loadProjectSelect() {
        //    var projectSelect = document.getElementById("project-select");
        //    var projectArray = projectData.getArray();

        //    for (let i = 0; i < projectArray.length; i++) {
        //        var option = document.createElement('option');

        //        option.text = projectArray[i].name;
        //        option.value = projectArray[i].guid;

        //        if (projectArray[i].guid == projectData.getDefault())
        //            option.selected = true;

        //        projectSelect.add(option);
        //    }

        //    projectSelect.addEventListener("change", function () {
        //        loadSessionSelect(projectSelect.value);

        //        sessionData.setDefault(document.getElementById("session-select").value);
        //        graph.resetSessionScene(sessionData.getDefault());
        //    });
        //}
    });

}());


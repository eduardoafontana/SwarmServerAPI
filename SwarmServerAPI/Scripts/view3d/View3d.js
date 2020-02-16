var view3d = (function () {

    var sceneLoader = function () {

        var view = dataControl.getView();

        if (view == null)
            return;

        var scene = render.getNewScene();

        if (view.groups == undefined)
            return;

        if (view.sessions == undefined)
            return;

        groupAssembler.reset();
        groupAssembler.mountMostHighFileSpacePoints(view.sessions);
        groupAssembler.mountMostHighFileLine(view.sessions);

        var groups = [];

        for (var g = 0; g < view.groups.length; g++) {
            groups.push(Group(view.groups[g], view.sessions.length, groups[g - 1]));
        }

        for (var g = 0; g < groups.length; g++) {
            scene.add(groups[g].mesh);
        }

        var arrowHuge = ArrowHuge(view.sessions.length);
        scene.add(arrowHuge.mesh);

        for (var s = 0; s < view.sessions.length; s++) {
            var files = view.sessions[s].files;
            var sessionId = view.sessions[s].sessionId;
            var groups = view.groups;

            //generate infos x z positions and mostHighFileLine.
            groupAssembler.mountBySession(files, groups);

            for (var i = 0; i < files.length; i++) {
                var cube = Cube(i, files);
                scene.add(cube.mesh);
                scene.interceptables.push(cube.mesh);

                var cubeReflection = CubeReflection(files[i]);
                scene.add(cubeReflection.mesh);

                var titleCube = TitleCubeDescriptor.createIfNotExist(files[i]);
                scene.add(titleCube.mesh);

                for (var j = 0; j < files[i].breakpoints.length; j++) {
                    var torus = Torus(i, j, files);
                    scene.add(torus.mesh);
                    scene.interceptables.push(torus.mesh);
                }

                for (var j = 0; j < files[i].events.length; j++) {
                    var square = Square(i, j, files);
                    scene.add(square.mesh);
                    scene.interceptables.push(square.mesh);
                }

                //if (files[i].nodes != undefined) {
                //    for (var j = 0; j < files[i].nodes.length; j++) {
                //        var tubesphere = TubeSphere(plane, files[i].nodes[j]);
                //        scene.add(tubesphere.mesh);
                //    }
                //}
            }

            var pathnodes = view.sessions[s].pathnodes;

            if (pathnodes.length > 1) {
                //generate infos x z positions on nodes
                groupAssembler.mountNodesBySession(files, pathnodes);

                var tube = Tube(pathnodes, sessionId);
                scene.add(tube.mesh);

                var cylinder = Cylinder(files, sessionId);
                scene.add(cylinder.mesh);

                var arrow = Arrow(tube, sessionId);
                scene.add(arrow.mesh);
            }
        }
    };

    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById('back-button').addEventListener('click', sourceCodeControl.backButtonClick);
        document.getElementById('next-button').addEventListener('click', sourceCodeControl.nextButtonClick);
        document.getElementById('open-new-tab-button').addEventListener('click', detailbox.openNewTab);

        var loadviewButton = document.getElementById('loadview-button');
        loadviewButton.addEventListener('click', function () {
            dataControl.getDataFromServer(sessionFilter.getSelectedSessions()).then(function (dataFromServer) {
                dataControl.setView(dataFromServer);

                sceneLoader();
            });

            tourInstructions.endTour();
        });

        dataControl.getTaskProjectDataFilterFromServer().then(function (taskProjectDataFromServer) {
            FontLoader().then(function (font) {

                taskProjectFilter.init(taskProjectDataFromServer);

                render.setFont(font);

                render.initGraph();
                infobox.init();
                detailbox.init();
                detailboxAdditional.init();
                scaleOptions.init();
                hideShowOptions.init();
                colorPaletteOptions.init();

                window.addEventListener('resize', render.onWindowResize, false);
                window.addEventListener('resize', infobox.init, false);
                window.addEventListener('resize', detailbox.init, false);
                window.addEventListener('resize', detailboxAdditional.init, false);
                document.getElementsByClassName('reset-camera-button')[0].addEventListener('click', render.resetCameraPosition);
                document.getElementsByClassName("canvasRenderRelativeSize")[0].addEventListener('mousemove', render.onDocumentMouseMove, false);
                document.addEventListener('mousedown', render.onDocumentMouseDown, false);
                document.addEventListener('mouseup', render.onDocumentMouseUp, false);
                document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
            });
        });

        tourInstructions.startTour();
    });

    return {
        sceneLoader: sceneLoader
    };

}());


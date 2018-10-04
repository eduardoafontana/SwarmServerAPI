var view3d = (function () {

    document.addEventListener("DOMContentLoaded", function () {

        render.initGraph();
        scaleOptions.init();
        infobox.init();
        detailbox.init();

        var users = dataControl.getUsers();

        for (var u = 0; u < users.length; u++) {
            for (var p = 0; p < users[u].projects.length; p++) {
                var scene = render.getNewScene();

                users[u].projects[p].sceneId = scene.id;

                groupAssembler.reset();

                for (var s = 0; s < users[u].projects[p].sessions.length; s++) {
                    var files = users[u].projects[p].sessions[s].files;

                    //generate infos x z positions and mostHighFileLine.
                    groupAssembler.mountBySession(files);

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

                        if (files[i].points != undefined) {
                            for (var j = 0; j < files[i].points.length; j++) {
                                var tubesphere = TubeSphere(cube, files[i].points[j]);
                                scene.add(tubesphere.mesh);
                            }
                        }
                    }
                }
            }
        }

        selectControl.init();
        render.setSelectedSceneFirst();

        window.addEventListener('resize', render.onWindowResize, false);
        window.addEventListener('resize', infobox.init, false);
        window.addEventListener('resize', detailbox.init, false);
        document.getElementsByClassName('reset-camera-button')[0].addEventListener('click', render.resetCameraPosition);
        document.getElementsByClassName("canvasRenderRelativeSize")[0].addEventListener('mousemove', render.onDocumentMouseMove, false);
        document.addEventListener('mousedown', render.onDocumentMouseDown, false);
    });

}());


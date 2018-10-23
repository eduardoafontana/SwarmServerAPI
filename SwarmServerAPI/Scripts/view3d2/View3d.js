var view3d = (function () {

    document.addEventListener("DOMContentLoaded", function () {

        render.initGraph();
        infobox.init();
        detailbox.init();
        scaleOptions.init();
        hideShowOptions.init();

        var users = dataControl.getUsers();

        for (var u = 0; u < users.length; u++) {
            for (var p = 0; p < users[u].projects.length; p++) {
                var scene = render.getNewScene();

                users[u].projects[p].sceneId = scene.id;

                var groups = [];

                if (users[u].projects[p].groups != undefined) {
                    for (var g = 0; g < users[u].projects[p].groups.length; g++) {
                        groups.push(Group(users[u].projects[p].groups[g], users[u].projects[p].sessions.length, groups[g - 1]));
                    }
                }

                for (var g = 0; g < groups.length; g++) {
                    scene.add(groups[g].mesh);
                }

                groupAssembler.reset();

                for (var s = 0; s < users[u].projects[p].sessions.length; s++) {
                    var files = users[u].projects[p].sessions[s].files;
                    var groups = users[u].projects[p].groups;

                    //generate infos x z positions and mostHighFileLine.
                    groupAssembler.mountBySession(files, groups);

                    for (var i = 0; i < files.length; i++) {

                        var cube = Cube(files[i]);
                        scene.add(cube.mesh);
                        scene.interceptables.push(cube.mesh);

                        var hideCube = HideCube(cube);
                        scene.add(hideCube.mesh);
                        scene.interceptables.push(hideCube.mesh);

                        //var titleCube = TitleCube(cube);
                        //scene.add(titleCube.mesh);
                        TitleCube({ scene, cube }).then((titleCube) => {
                            titleCube.scene.add(titleCube.mesh);
                        });

                        for (var j = 0; j < files[i].breakpoints.length; j++) {
                            var torus = Torus(cube, files[i].breakpoints[j]);
                            scene.add(torus.mesh);
                            scene.interceptables.push(torus.mesh);
                        }

                        for (var j = 0; j < files[i].events.length; j++) {
                            var torus = Square(cube, files[i].events[j]);
                            scene.add(torus.mesh);
                            scene.interceptables.push(torus.mesh);
                        }

                        if (files[i].nodes != undefined) {
                            for (var j = 0; j < files[i].nodes.length; j++) {
                                var tubesphere = TubeSphere(cube, files[i].nodes[j]);
                                scene.add(tubesphere.mesh);
                            }
                        }
                    }

                    var pathnodes = users[u].projects[p].sessions[s].pathnodes;

                    if (pathnodes.length > 0) {
                        //generate infos x z positions on nodes
                        groupAssembler.mountNodesBySession(files, pathnodes);

                        var tube = Tube(pathnodes);
                        scene.add(tube.mesh);
                    }
                }


            }
        }

        selectControl.init();

        window.addEventListener('resize', render.onWindowResize, false);
        window.addEventListener('resize', infobox.init, false);
        window.addEventListener('resize', detailbox.init, false);
        document.getElementsByClassName('reset-camera-button')[0].addEventListener('click', render.resetCameraPosition);
        document.getElementsByClassName("canvasRenderRelativeSize")[0].addEventListener('mousemove', render.onDocumentMouseMove, false);
        document.addEventListener('mousedown', render.onDocumentMouseDown, false);
    });

}());


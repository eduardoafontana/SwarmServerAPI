﻿var view3d = (function () {

    var sceneLoader = function (userIndex, projectIndex, taskIndex) {

        var users = dataControl.getUsers();

        if (typeof users[userIndex] === 'undefined')
            return;

        if (typeof users[userIndex].projects[projectIndex] === 'undefined')
            return;

        if (typeof users[userIndex].projects[projectIndex].tasks[taskIndex] === 'undefined')
            return;

        var task = users[userIndex].projects[projectIndex].tasks[taskIndex];

        var scene = render.getNewScene(userIndex, projectIndex, taskIndex);

        if (task.groups == undefined)
            return;

        if (task.sessions == undefined)
            return;

        var groups = [];

        for (var g = 0; g < task.groups.length; g++) {
            groups.push(Group(task.groups[g], task.sessions.length, groups[g - 1]));
        }

        for (var g = 0; g < groups.length; g++) {
            scene.add(groups[g].mesh);
        }

        groupAssembler.reset();

        groupAssembler.mountMostHighFileLine(task.sessions);

        var fileDataArray = [];

        for (var s = 0; s < task.sessions.length; s++) {
            var files = task.sessions[s].files;
            var groups = task.groups;

            //generate infos x z positions and mostHighFileLine.
            groupAssembler.mountBySession(files, groups);

            for (var i = 0; i < files.length; i++) {
                fileDataArray.push({
                    x: files[i].x,
                    lines: files[i].lines,
                    z: files[i].z
                });

                //var hidecube = HideCube(plane);
                //scene.add(hidecube.mesh);
                //scene.interceptables.push(hidecube.mesh);

                var titleCube = TitleCubeDescriptor.createIfNotExist(files[i]);
                scene.add(titleCube.mesh);

                for (var j = 0; j < files[i].breakpoints.length; j++) {
                    var sphere = Sphere(files[i], files[i].breakpoints[j]);
                    scene.add(sphere.mesh);
                    scene.interceptables.push(sphere.mesh);
                }

                //for (var j = 0; j < files[i].events.length; j++) {
                //    var square = Square(plane, files[i].events[j]);
                //    scene.add(square.mesh);
                //    scene.interceptables.push(square.mesh);
                //}

                //if (files[i].nodes != undefined) {
                //    for (var j = 0; j < files[i].nodes.length; j++) {
                //        var tubesphere = TubeSphere(plane, files[i].nodes[j]);
                //        scene.add(tubesphere.mesh);
                //    }
                //}
            }

            //var pathnodes = task.sessions[s].pathnodes;

            //if (pathnodes.length > 1) {
            //    //generate infos x z positions on nodes
            //    groupAssembler.mountNodesBySession(files, pathnodes);

            //    var tube = Tube(pathnodes);
            //    scene.add(tube.mesh);
            //}
        }

        var plane = Planes(fileDataArray);
        scene.add(plane.mesh);
        scene.interceptables.push(plane.mesh);
    };

    document.addEventListener("DOMContentLoaded", function () {

        var cssRenderRelativeSize = document.querySelector('.cssRenderRelativeSize');

        var canvasRenderRelativeSize = document.querySelector('.canvasRenderRelativeSize');
        canvasRenderRelativeSize.style.position = 'absolute';
        canvasRenderRelativeSize.style.top = '148px';
        canvasRenderRelativeSize.style.width = cssRenderRelativeSize.offsetWidth + 'px';
        canvasRenderRelativeSize.style.height = cssRenderRelativeSize.offsetHeight + 'px';

        var loadviewButton = document.getElementById('loadview-button');
        loadviewButton.addEventListener('click', function () {

            var selectUser = document.getElementById('user-select');
            var selectProject = document.getElementById('project-select');
            var selectTask = document.getElementById('task-select');

            var userName = selectUser.options[selectUser.selectedIndex].text;
            var projectName = selectProject.options[selectProject.selectedIndex].text;
            var taskName = selectTask.options[selectTask.selectedIndex].text;

            dataControl.getDataFromServer(userName, projectName, taskName).then(function (dataFromServer) {
                dataControl.setData(dataFromServer, selectUser.value, selectProject.value, selectTask.value);

                render.setSelectedSceneById(selectUser.value, selectProject.value, selectTask.value);
            });
        });

        dataControl.getDataFilterFromServer().then(function (dataFromServer) {
            FontLoader().then(function (font) {

                dataControl.setFilter(dataFromServer);
                render.setFont(font);

                render.initGraph();
                infobox.init();
                detailbox.init();
                scaleOptions.init();
                hideShowOptions.init();
                colorPaletteOptions.init();

                sceneLoader(0, 0, 0);

                selectControl.init();

                window.addEventListener('resize', render.onWindowResize, false);
                window.addEventListener('resize', infobox.init, false);
                window.addEventListener('resize', detailbox.init, false);
                document.getElementsByClassName('reset-camera-button')[0].addEventListener('click', render.resetCameraPosition);
                document.getElementsByClassName("canvasRenderRelativeSize")[0].addEventListener('mousemove', render.onDocumentMouseMove, false);
                document.addEventListener('mousedown', render.onDocumentMouseDown, false);
            });
        });
    });

    return {
        sceneLoader: sceneLoader
    };

}());


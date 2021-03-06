﻿var groupAssembler = (function () {

    var mostHighFileLine = 0;
    var mostHighFileSpacePoints = 0;
    var sessionLine = 0;
    var sessionMargin = 8;
    var positionTopBase = 30;

    var mountBySession = function (files, groups) {
        function getFiles(groupId) {
            var filesOfGroup = [];

            for (var i = 0; i < files.length; i++) {
                if (files[i].groupId == groupId)
                    filesOfGroup.push(files[i]);
            }

            return filesOfGroup;
        }

        var xStartGroup = 0;
        for (var g = 0; g < groups.length; g++) {
            var filesOfGroup = getFiles(groups[g].groupId);

            for (var f = 0; f < filesOfGroup.length; f++) {
                filesOfGroup[f].x = xStartGroup + filesOfGroup[f].groupIndex;
                filesOfGroup[f].z = sessionLine;
            }

            xStartGroup = xStartGroup + groups[g].maxIndexWidthQuantity + 1;
        }

        sessionLine = sessionLine + sessionMargin;
    };

    var mountNodesBySession = function (files, nodes) {
        function getFile(fileId) {
            for (var i = 0; i < files.length; i++) {
                if (files[i].fileId == fileId)
                    return files[i];
            }

            return null;
        }

        for (var i = 0; i < nodes.length; i++) {
            var file = getFile(nodes[i].fileId);

            if (file == null)
                continue;

            nodes[i].x = file.x;
            nodes[i].z = file.z;
        }
    };

    var mountMostHighFileLine = function (sessions) {
        for (var s = 0; s < sessions.length; s++) {
            var files = sessions[s].files;

            for (var i = 0; i < files.length; i++) {
                if (files[i].lines > mostHighFileLine)
                    mostHighFileLine = files[i].lines;
            }
        }
    };

    var mountMostHighFileSpacePoints = function(sessions) {
        for (var s = 0; s < sessions.length; s++) {
            var files = sessions[s].files;

            for (var i = 0; i < files.length; i++) {
                var hightValue = files[i].nodePoints + files[i].nodeSpaceAfter + files[i].nodeSpaceBefore;

                if (hightValue > mostHighFileSpacePoints)
                    mostHighFileSpacePoints = hightValue;
            }
        }
    };

    var getMostHighFileLine = function () {
        return mostHighFileLine;
    };

    var getMostHighFileSpacePoints = function() {
        return mostHighFileSpacePoints;
    };

    var reset = function () {
        mostHighFileLine = 0;
        mostHighFileSpacePoints = 0;
        sessionLine = 0;
    };

    var getPositionTopBase = function () {
        return positionTopBase;
    };

    var getSessionMargin = function () {
        return sessionMargin;
    };

    return {
        getMostHighFileLine: getMostHighFileLine,
        mountMostHighFileLine: mountMostHighFileLine,
        mountBySession: mountBySession,
        mountNodesBySession: mountNodesBySession,
        reset: reset,
        getPositionTopBase: getPositionTopBase,
        mountMostHighFileSpacePoints: mountMostHighFileSpacePoints,
        getMostHighFileSpacePoints: getMostHighFileSpacePoints,
        getSessionMargin: getSessionMargin
    };

}());


var groupAssembler = (function () {

    var mostHighFileLine = 0;
    var sessionLine = 0;
    var sessionMargin = 3;

    var mountBySession = function (files, groups) {
        for (var i = 0; i < files.length; i++) {
            if (files[i].lines > mostHighFileLine)
                mostHighFileLine = files[i].lines;
        }

        function getFiles(groupId) {
            var filesOfGroup = [];

            for (var i = 0; i < files.length; i++) {
                if (files[i].groupId == groupId)
                    filesOfGroup.push(files[i]);
            }

            return filesOfGroup;
        }

        var x = 0;
        for (var g = 0; g < groups.length; g++) {
            var filesOfGroup = getFiles(groups[g].groupId);

            for (var f = 0; f < filesOfGroup.length; f++) {
                filesOfGroup[f].x = x;
                console.log(sessionLine);
                filesOfGroup[f].z = sessionLine;

                x++;
            }

            if (filesOfGroup.length < groups[g].widthQuantity) {
                x = x + groups[g].widthQuantity - filesOfGroup.length;
            }
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

    var getMostHighFileLine = function () {
        return mostHighFileLine;
    };

    var reset = function () {
        mostHighFileLine = 0;
        sessionLine = 0;
    };

    return {
        getMostHighFileLine: getMostHighFileLine,
        mountBySession: mountBySession,
        mountNodesBySession: mountNodesBySession,
        reset: reset
    };

}());


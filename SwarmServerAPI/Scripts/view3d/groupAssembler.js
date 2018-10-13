var groupAssembler = (function () {

    var mostHighFileLine = 0;
    var sessionLine = 0;
    var sessionMargin = 2;

    var mountBySession = function (files, groups) {
        for (var i = 0; i < files.length; i++) {
            if (files[i].lines > mostHighFileLine)
                mostHighFileLine = files[i].lines;
        }

        function getGroup(groupId) {
            for (var j = 0; j < groups.length; j++) {
                if (groups[j].groupId == groupId)
                    return groups[j];
            }

            return null;
        }

        var i = 0;
        var igx = 0;
        var ig = 1;
        var groupBefore = null;
        while (i < files.length) {
            var group = getGroup(files[i].groupId);

            if (groupBefore == null) {
                groupBefore = group;
            } else if (group.groupId != groupBefore.groupId) {
                if ((ig - 1) != groupBefore.widthQuantity) {
                    igx = groupBefore.widthQuantity - (ig - 1) + igx;
                }

                groupBefore = group;
                ig = 1;
            }

            files[i].x = igx;
            files[i].z = sessionLine;

            i++;
            igx++;
            ig++;
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


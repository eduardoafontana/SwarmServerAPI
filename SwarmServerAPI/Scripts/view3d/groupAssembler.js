var groupAssembler = (function () {

    var mostHighFileLine = 0;
    var sessionLine = 0;
    var sessionMargin = 2;

    var mountBySession = function (files) {
        for (var i = 0; i < files.length; i++) {
            if (files[i].lines > mostHighFileLine)
                mostHighFileLine = files[i].lines;
        }

        for (var i = 0; i < files.length; i++) {
            files[i].x = i;
            files[i].z = sessionLine;
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


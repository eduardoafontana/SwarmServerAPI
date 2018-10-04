var groupAssembler = (function () {

    var mostHighFileLine = 0;
    var sessionLine = 0;

    var mountBySession = function (files) {
        for (var i = 0; i < files.length; i++) {
            if (files[i].lines > mostHighFileLine)
                mostHighFileLine = files[i].lines;
        }

        for (var i = 0; i < files.length; i++) {
            files[i].x = i;
            files[i].z = sessionLine;
        }

        sessionLine = sessionLine + 2;
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
        reset: reset
    };

}());


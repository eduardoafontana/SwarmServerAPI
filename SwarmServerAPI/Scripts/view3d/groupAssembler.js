var groupAssembler = (function () {

    var mostHighFileLine = 0;

    var mount = function (files) {
        //order
        var filesGroupOrdered = files.sort(function (a, b) { return a.group - b.group });

        //distinct
        var groups = [];
        filesGroupOrdered.forEach(function (file) {
            if (groups.indexOf(file.group) == -1)
                groups.push(file.group);
        });

        var cGroupLimit = Math.ceil(Math.sqrt(groups.length));

        var lTotal = 0, cTotal = 0, higherL = 0, cG = 0;
        groups.forEach(function (group) {
            var filesOfGroup = files.filter(function (file) {
                return file.group == group;
            });

            var cLimit = Math.ceil(Math.sqrt(filesOfGroup.length));
            cLimit = cLimit + cTotal;

            var l = lTotal, c = cTotal;
            filesOfGroup.forEach(function (file) {
                if (c == cLimit) {
                    l++;
                    c = cTotal;
                }

                if (l > higherL)
                    higherL = l;

                file.x = c;
                file.z = l;

                c++;
            });

            cTotal = cLimit + 1;

            cG++;

            if (cG == cGroupLimit) {
                lTotal = higherL + 1 + 1;
                higherL = 0;
                cTotal = 0;
                cG = 0;
            }
        });

        for (var i = 0; i < files.length; i++) {
            if (files[i].lines > mostHighFileLine)
                groupAssembler.setMostHighFileLine(files[i].lines);
        }
    };

    var getMostHighFileLine = function () {
        return mostHighFileLine;
    };

    var setMostHighFileLine = function (value) {
        mostHighFileLine = value;
    };

    return {
        mount: mount,
        getMostHighFileLine: getMostHighFileLine,
        setMostHighFileLine: setMostHighFileLine
    };

}());


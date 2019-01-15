var sourceCodeControl = (function () {

    var loadSourceCode = (dataFromServer) => new Promise(function (resolve, reject) {
        var box = document.querySelector('.detail-box');
        box.style.visibility = 'visible';

        var boxMainPre = box.querySelector(".detail-box-main pre");

        var code = document.createElement('code');
        //TODO: remove later
        //wrapper.innerHTML = '<pre><code>' + JSON.stringify(JSON.parse(data.data), null, 4) + '</code></pre>';

        code.innerHTML = dataFromServer;

        boxMainPre.innerHTML = '';
        boxMainPre.appendChild(code);        
            
        resolve();
    });

    var loadHighLight = () => new Promise(function (resolve, reject) {
        var preTag = document.querySelector('#current-source-code');

        hljs.highlightBlock(preTag);
        hljs.lineNumbersBlock(preTag);

        setTimeout(function () { resolve(); }, 2000);
    });

    //var loadEvents = (lineNumber) => new Promise(function (resolve, reject) {
    //    var divOfLine = document.querySelector('div[data-line-number="' + lineNumber + '"]');

    //    if (divOfLine === undefined || divOfLine === null)
    //        return;

    //    var tdOfLine = divOfLine.parentElement;

    //    if (tdOfLine === undefined || tdOfLine === null)
    //        return;

    //    var trOfLine = tdOfLine.parentElement;

    //    if (trOfLine === undefined || trOfLine === null)
    //        return;

    //    trOfLine.classList.add('source-code-event');

    //    resolve();
    //});

    function getLine(lineNumber) {
        var divOfLine = document.querySelector('div[data-line-number="' + lineNumber + '"]');

        if (divOfLine === undefined || divOfLine === null)
            return null;

        var tdOfLine = divOfLine.parentElement;

        if (tdOfLine === undefined || tdOfLine === null)
            return null;

        var trOfLine = tdOfLine.parentElement;

        if (trOfLine === undefined || trOfLine === null)
            return null;

        return trOfLine;
    }

    function setEventStyle(lineNumber) {
        var trOfLine = getLine(lineNumber);

        if (trOfLine == null)
            return;

        trOfLine.classList.add('source-code-event');
    }

    function setBreakpointStyle(lineNumber) {
        var trOfLine = getLine(lineNumber);

        if (trOfLine == null)
            return;

        var tdCode = trOfLine.querySelector('.hljs-ln-code');

        var div = document.createElement('div');
        div.classList.add('source-code-breakpoint');

        tdCode.insertBefore(div, tdCode.childNodes[0]); 
    }

    var loadEvents = function (events) {
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            var jsonData = JSON.parse(event.data);

            setEventStyle(jsonData.LineNumber);
        }
    };

    var loadBreakpoints = function (breakpoints) {
        for (var i = 0; i < breakpoints.length; i++) {
            var breakpoint = breakpoints[i];
            var jsonData = JSON.parse(breakpoint.data);

            setBreakpointStyle(jsonData.LineNumber);
        }
    };

    var loadSelected = function (lineNumber) {
        //set style
        var trOfLine = getLine(lineNumber);

        if (trOfLine == null)
            return;

        trOfLine.classList.add('source-code-selected');

        //set scroll position
        var preTag = document.querySelector(".detail-box-main pre");

        var totalOfLines = preTag.querySelectorAll(".hljs-ln-numbers").length;

        var positionY = (preTag.scrollHeight * lineNumber) / totalOfLines;
        var offSetLine = 56;

        preTag.scrollTo(0, positionY - offSetLine);
    };

    return {
        loadSourceCode: loadSourceCode,
        loadHighLight: loadHighLight,
        loadEvents: loadEvents,
        loadBreakpoints: loadBreakpoints,
        loadSelected: loadSelected
    };

}());
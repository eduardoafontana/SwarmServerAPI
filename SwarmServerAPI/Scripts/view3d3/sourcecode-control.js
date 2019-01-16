var sourceCodeControl = (function () {

    var fileInformationJson = {
        fileOriginalId : '',
        sessionId : ''
    };

    var elementInformationJson = {
        fileOriginalId: '',
        sessionId: '',
        eventIndex: '',
        breakpointIndex: ''
    };

    var events = [];
    var breakpoints = [];
    var currentElement = null;

    var setFileInformation = function (pFileInformationJson) {
        fileInformationJson = pFileInformationJson;

        elementInformationJson = {};
    };

    var setElementInformation = function (pElementInformationJson) {
        elementInformationJson = pElementInformationJson;
    };

    var loadSourceCode = (dataFromServer) => new Promise(function (resolve, reject) {
        var box = document.querySelector('.detail-box');
        box.style.visibility = 'visible';

        var boxMainPre = box.querySelector(".detail-box-main pre");

        var code = document.createElement('code');

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

    var loadEvents = function (pEvents) {
        events = pEvents;

        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            var jsonData = JSON.parse(event.data);

            setEventStyle(jsonData.LineNumber);
        }
    };

    var loadBreakpoints = function (pBreakpoints) {
        breakpoints = pBreakpoints;

        for (var i = 0; i < breakpoints.length; i++) {
            var breakpoint = breakpoints[i];
            var jsonData = JSON.parse(breakpoint.data);

            setBreakpointStyle(jsonData.LineNumber);
        }
    };

    var loadSelected = function (objetEventOrBreakpoint) {

        currentElement = objetEventOrBreakpoint;

        var lineNumber = currentElement.line;

        //remove all selected styles
        var allTrWithStyle = document.querySelectorAll(".source-code-selected");
        for (var i = 0; i < allTrWithStyle.length; i++) {
            allTrWithStyle[i].classList.remove('source-code-selected');
        }

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

    var isSelectedFile = function (pFileInformationJson) {
        var hash = JSON.stringify(pFileInformationJson);
        var hashCurrent = JSON.stringify(fileInformationJson);

        return hash === hashCurrent;
    };

    var isSelectedElement = function (pElementInformationJson) {
        var hash = JSON.stringify(pElementInformationJson);
        var hashCurrent = JSON.stringify(elementInformationJson);

        return hash === hashCurrent;
    };

    function processBackNextClick(orientation) {
        var selectedElementIndex = null;

        for (var i = 0; i < events.length; i++) {
            if (events[i].positionIndex == currentElement.positionIndex) {
                selectedElementIndex = i;
            }
        }

        if (selectedElementIndex === null)
            return;

        var nextElement = undefined;

        if (orientation === 'next')
            nextElement = events[selectedElementIndex + 1];
        else if (orientation === 'back')
            nextElement = events[selectedElementIndex - 1];
        
        if (nextElement == undefined)
            return;
        
        var sourceCodeElementInformationJson = {
            fileOriginalId: elementInformationJson.fileOriginalId,
            sessionId: elementInformationJson.sessionId,
            eventIndex: nextElement.positionIndex,
            breakpointIndex: nextElement.positionIndex
        };

        setElementInformation(sourceCodeElementInformationJson);
        loadSelected(nextElement);
    };

    var backButtonClick = function () {
        processBackNextClick('back');
    };

    var nextButtonClick = function () {
        processBackNextClick('next');
    };

    return {
        loadSourceCode: loadSourceCode,
        loadHighLight: loadHighLight,
        loadEvents: loadEvents,
        loadBreakpoints: loadBreakpoints,
        loadSelected: loadSelected,
        setFileInformation: setFileInformation,
        isSelectedFile: isSelectedFile,
        setElementInformation: setElementInformation,
        isSelectedElement: isSelectedElement,
        backButtonClick: backButtonClick,
        nextButtonClick: nextButtonClick
    };

}());
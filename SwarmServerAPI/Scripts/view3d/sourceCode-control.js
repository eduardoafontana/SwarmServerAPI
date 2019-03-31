var sourceCodeControl = (function () {

    var fileInformationJson = {
        fileIndex : '',
        sessionId : ''
    };

    var elementInformationJson = {
        fileIndex: '',
        sessionId: '',
        eventIndex: '',
        breakpointIndex: ''
    };

    var files = [];
    var currentElement = null;
    var currentFile = null;

    var detailBoxDiv = null;
    var dataFromServer = null;

    var setFileInformation = function (pFileInformationJson) {
        fileInformationJson = pFileInformationJson;

        elementInformationJson = null;
    };

    var setElementInformation = function (pElementInformationJson) {
        elementInformationJson = pElementInformationJson;
    };

    var loadSourceCode = function (pDataFromServer) {
        if (pDataFromServer != undefined && pDataFromServer != null)
            dataFromServer = pDataFromServer;

        if (detailBoxDiv == null) {
            detailBoxDiv = document.querySelector('.detail-box');
            detailBoxDiv.style.visibility = 'visible';
        }

        var code = document.createElement('code');
        code.innerHTML = dataFromServer;

        var boxMainPre = detailBoxDiv.querySelector(".detail-box-main pre");
        boxMainPre.innerHTML = '';
        boxMainPre.appendChild(code);

        detailBoxDiv.querySelector('#next-button').disabled = true;
        detailBoxDiv.querySelector('#back-button').disabled = true;
    };

    var loadCodeStyle = () => new Promise(function (resolve, reject) {
        var preTag = detailBoxDiv.querySelector('#current-source-code');

        hljs.highlightBlock(preTag);
        hljs.lineNumbersBlock(preTag);

        setTimeout(function () { resolve(); }, 1000);
    });

    function getLine(lineNumber) {
        var divOfLine = detailBoxDiv.querySelector('div[data-line-number="' + lineNumber + '"]');

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

    var loadLinesContrast = function (pFiles, fileIndex) {
        if (pFiles != null)
            files = pFiles;

        for (var i = 0; i < files[fileIndex].events.length; i++) {
            var event = files[fileIndex].events[i];
            var jsonData = JSON.parse(event.data);

            setEventStyle(jsonData.LineNumber);
        }

        for (var i = 0; i < files[fileIndex].breakpoints.length; i++) {
            var breakpoint = files[fileIndex].breakpoints[i];
            var jsonData = JSON.parse(breakpoint.data);

            setBreakpointStyle(jsonData.LineNumber);
        }
    };

    function verifyBackNextButon() {
        var nextEventPositionIndex = currentElement.positionIndex + 1;
        var backEventPositionIndex = currentElement.positionIndex - 1;

        var notEndNext = true;
        var notEndBack = true;

        var foundNext = false;
        var foundBack = false;

        for (var f = 0; f < files.length; f++) {
            for (var e = 0; e < files[f].events.length; e++) {
                if (files[f].events[e].positionIndex == nextEventPositionIndex && notEndNext) {
                    notEndNext = false;
                    foundNext = true;
                }

                if (files[f].events[e].positionIndex == backEventPositionIndex && notEndBack) {
                    notEndBack = false;
                    foundBack = true;
                }
            }
        }

        detailBoxDiv.querySelector('#next-button').disabled = !foundNext;
        detailBoxDiv.querySelector('#back-button').disabled = !foundBack;
    };

    var loadSelected = function (objetEventOrBreakpoint, file) {
        currentElement = objetEventOrBreakpoint;
        currentFile = file;

        var lineNumber = currentElement.line;

        //remove all selected styles
        var allTrWithStyle = detailBoxDiv.querySelectorAll(".source-code-selected");
        for (var i = 0; i < allTrWithStyle.length; i++) {
            allTrWithStyle[i].classList.remove('source-code-selected');
        }

        //set style
        var trOfLine = getLine(lineNumber);

        if (trOfLine == null)
            return;

        trOfLine.classList.add('source-code-selected');

        //set scroll position
        var preTag = detailBoxDiv.querySelector(".detail-box-main pre");

        var totalOfLines = preTag.querySelectorAll(".hljs-ln-numbers").length;

        var positionY = (preTag.scrollHeight * lineNumber) / totalOfLines;
        var offSetLine = 56;

        preTag.scrollTo(0, positionY - offSetLine);

        verifyBackNextButon();
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
        var nextEventPositionIndex = currentElement.positionIndex;

        if (orientation === 'next')
            nextEventPositionIndex++;
        else if (orientation === 'back')
            nextEventPositionIndex--;

        var nextEvent = undefined;
        var nextFile = undefined;
        var nextFileIndex = undefined;

        for (var f = 0; f < files.length; f++) {
            for (var e = 0; e < files[f].events.length; e++) {
                if (files[f].events[e].positionIndex == nextEventPositionIndex) {
                    nextFile = files[f];
                    nextFileIndex = f;
                    nextEvent = files[f].events[e];
                    break;
                }
            }
        }

        if (nextEvent == undefined)
            return;

        if (nextFile == undefined)
            return;

        if (nextFileIndex == undefined)
            return;

        var sourceCodeElementInformationJson = {
            fileIndex: nextFileIndex,
            sessionId: nextFile.sessionId,
            eventIndex: nextEvent.positionIndex,
            breakpointIndex: nextEvent.positionIndex
        };

        if (currentFile.fileId === nextFile.fileId) {
            setElementInformation(sourceCodeElementInformationJson);
            loadSelected(nextEvent, nextFile);
        } else {
            dataControl.getSourceCodeFromServer(nextFile.originalId).then(function (dataFromServer) {
                var sourceCodeFileInformationJson = {
                    fileIndex: nextFileIndex,
                    sessionId: nextFile.sessionId
                };

                setFileInformation(sourceCodeFileInformationJson);
                setElementInformation(sourceCodeElementInformationJson);

                loadSourceCode(dataFromServer);

                loadCodeStyle().then(function () {
                    loadLinesContrast(null, nextFileIndex);

                    loadSelected(nextEvent, nextFile);
                });
            });
        }      
    };

    var backButtonClick = function () {
        processBackNextClick('back');
    };

    var nextButtonClick = function () {
        processBackNextClick('next');
    };

    var reloadContext = function (pDetailBoxDiv) {
        detailBoxDiv = pDetailBoxDiv;

        loadSourceCode();

        var preTag = detailBoxDiv.querySelector('#current-source-code');

        loadCodeStyle().then(function () {
            loadLinesContrast(files, fileInformationJson.fileIndex);

            if (elementInformationJson != null)
                loadSelected(currentElement, currentFile);
        });
    };

    return {
        loadSourceCode: loadSourceCode,
        loadCodeStyle: loadCodeStyle,
        loadLinesContrast: loadLinesContrast,
        loadSelected: loadSelected,
        setFileInformation: setFileInformation,
        isSelectedFile: isSelectedFile,
        setElementInformation: setElementInformation,
        isSelectedElement: isSelectedElement,
        backButtonClick: backButtonClick,
        nextButtonClick: nextButtonClick,
        reloadContext: reloadContext
    };

}());
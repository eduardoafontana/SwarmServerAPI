﻿var sourceCodeControl = (function () {

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

    var setFileInformation = function (pFileInformationJson) {
        fileInformationJson = pFileInformationJson;

        elementInformationJson = {};
    };

    var setElementInformation = function (pElementInformationJson) {
        elementInformationJson = pElementInformationJson;
    };

    var loadSourceCode = function (dataFromServer) {
        var box = document.querySelector('.detail-box');
        box.style.visibility = 'visible';

        var boxMainPre = box.querySelector(".detail-box-main pre");

        var code = document.createElement('code');

        code.innerHTML = dataFromServer;

        boxMainPre.innerHTML = '';
        boxMainPre.appendChild(code);
    };

    var loadCodeStyle = () => new Promise(function (resolve, reject) {
        var preTag = document.querySelector('#current-source-code');

        hljs.highlightBlock(preTag);
        hljs.lineNumbersBlock(preTag);

        setTimeout(function () { resolve(); }, 1500);
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

    var loadSelected = function (objetEventOrBreakpoint, file) {

        currentElement = objetEventOrBreakpoint;
        currentFile = file;

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

                sourceCodeControl.setFileInformation(sourceCodeFileInformationJson);
                sourceCodeControl.setElementInformation(sourceCodeElementInformationJson);

                sourceCodeControl.loadSourceCode(dataFromServer);

                sourceCodeControl.loadCodeStyle().then(function () {
                    sourceCodeControl.loadLinesContrast(null, nextFileIndex);

                    sourceCodeControl.loadSelected(nextEvent, nextFile);
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
        nextButtonClick: nextButtonClick
    };

}());
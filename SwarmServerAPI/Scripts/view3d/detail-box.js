var detailbox = (function () {

    var detailBoxHeight = '';
    var detailBoxHeightPre = '';
    var detailBoxWidth = 400;
    var marginLeftHoldAdjustment = 20;
    var marginTopHoldAdjustment = 45;
    var detailBoxTop = 120;

    var newWindow;

    function relocate() {
        var box = document.getElementsByClassName("detail-box")[0];

        var height = render.getDimensions().height - marginTopHoldAdjustment

        box.style.width = detailBoxWidth + 'px';
        box.style.height = height + 'px';
        box.style.top = detailBoxTop + 'px';
        box.style.left = (render.getDimensions().width - detailBoxWidth + marginLeftHoldAdjustment) + 'px';

        var preTag = document.querySelector(".detail-box pre");
        preTag.style.height = (height - 80) + 'px';
    }

    var openNewTab = function () {
        newWindow = window.open();
        var detailBoxBody = newWindow.document.getElementsByTagName('body')[0];

        var detailBoxDiv = document.createElement('div');
        detailBoxDiv.classList.add('detail-box');

        var detailBoxMainDiv = document.createElement('div');
        detailBoxMainDiv.classList.add('detail-box-main');

        var preTag = document.createElement('pre');
        preTag.id = 'current-source-code';

        var buttonBack = document.createElement('button');
        buttonBack.id = 'back-button';
        buttonBack.type = 'button';
        buttonBack.innerHTML = '< Back';
        buttonBack.classList.add('loadview-button-adjustment');
        buttonBack.classList.add('btn');
        buttonBack.classList.add('btn-primary');
        buttonBack.addEventListener('click', sourceCodeControl.backButtonClick);

        var buttonNext = document.createElement('button');
        buttonNext.id = 'next-button';
        buttonNext.type = 'button';
        buttonNext.innerHTML = 'Next >';
        buttonNext.classList.add('loadview-button-adjustment');
        buttonNext.classList.add('btn');
        buttonNext.classList.add('btn-primary');
        buttonNext.classList.add('btn-next');
        buttonNext.addEventListener('click', sourceCodeControl.nextButtonClick);

        var buttonCloseI = document.createElement('i');
        buttonCloseI.classList.add('fas');
        buttonCloseI.classList.add('fa-window-restore');

        var buttonClose = document.createElement('button');
        buttonClose.id = 'close-button';
        buttonClose.type = 'button';
        buttonClose.classList.add('loadview-button-adjustment');
        buttonClose.classList.add('btn');
        buttonClose.classList.add('btn-primary');
        buttonClose.classList.add('tab-button');
        buttonClose.setAttribute('title', 'Close new tab');
        buttonClose.addEventListener('click', detailbox.closeNewTab);
        buttonClose.appendChild(buttonCloseI);

        detailBoxMainDiv.appendChild(preTag);
        detailBoxDiv.appendChild(detailBoxMainDiv);
        detailBoxDiv.appendChild(buttonBack);
        detailBoxDiv.appendChild(buttonNext);
        detailBoxDiv.appendChild(buttonClose);
        detailBoxBody.appendChild(detailBoxDiv);

        var detailBoxHead = newWindow.document.getElementsByTagName('head')[0];

        var linkHighlight = document.createElement('link');
        linkHighlight.setAttribute('rel', 'stylesheet');
        linkHighlight.setAttribute('href', 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.13.1/build/styles/default.min.css');

        var scriptHighlight1 = document.createElement('script');
        scriptHighlight1.setAttribute('src', 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.13.1/build/highlight.min.js');

        var scriptHighlight2 = document.createElement('script');
        scriptHighlight2.setAttribute('src', 'https://cdn.jsdelivr.net/npm/highlightjs-line-numbers.js@2.6.0/dist/highlightjs-line-numbers.min.js');

        var scriptFontAwesome = document.createElement('script');
        scriptFontAwesome.setAttribute('src', 'https://use.fontawesome.com/releases/v5.0.13/js/all.js');
        scriptFontAwesome.setAttribute('integrity', 'sha384-xymdQtn1n3lH2wcu0qhcdaOpQwyoarkgLVxC/wZ5q7h9gHtxICrpcaSUfygqZGOe');
        scriptFontAwesome.setAttribute('crossorigin', 'anonymous');
        scriptFontAwesome.setAttribute('defer', '');

        var linkBootstrap = document.createElement('link');
        linkBootstrap.setAttribute('rel', 'stylesheet');
        linkBootstrap.setAttribute('href', location.origin + '/Content/bootstrap.css');

        var linkDetailBoxTab = document.createElement('link');
        linkDetailBoxTab.setAttribute('rel', 'stylesheet');
        linkDetailBoxTab.setAttribute('href', location.origin + '/Content/detail-box-tab.css');

        detailBoxHead.appendChild(linkHighlight);
        detailBoxHead.appendChild(scriptHighlight1);
        detailBoxHead.appendChild(scriptHighlight2);
        detailBoxHead.appendChild(scriptFontAwesome);
        detailBoxHead.appendChild(linkBootstrap);
        detailBoxHead.appendChild(linkDetailBoxTab);

        sourceCodeControl.reloadContext(detailBoxDiv);

        var box = document.querySelector('.detail-box');
        box.style.visibility = 'hidden';
    }

    var closeNewTab = function () {
        newWindow.close();

        var box = document.querySelector('.detail-box');
        box.style.visibility = 'visible';

        sourceCodeControl.reloadContext(box);
    }

    var init = function () {
        var box = document.getElementsByClassName("detail-box")[0];

        detailbox.relocate();

        dragElement(box, "detail-box-header");

        document.getElementsByClassName("detail-box-minimize")[0].addEventListener("click", function () {
            var box = document.getElementsByClassName("detail-box")[0];
            var preTag = document.querySelector(".detail-box pre");

            if (this.innerText == "-") {
                this.innerText = '+';

                detailBoxHeight = box.style.height;

                box.style.height = '30px';
                box.style.overflow = 'hidden';
                box.style.resize = 'none';

                detailBoxHeightPre = preTag.style.height;
                preTag.style.height = '30px';
            } else {
                this.innerText = '-';

                box.style.height = detailBoxHeight;
                box.style.resize = 'both';
                box.style.overflow = 'auto';

                preTag.style.height = detailBoxHeightPre;
            }
        });
    }

    function dragElement(elmnt, dragBoxName) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        if (document.getElementsByClassName(dragBoxName)[0]) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementsByClassName(dragBoxName)[0].onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    /*too-box*/
    var toolBoxWidth = '';

    document.addEventListener("DOMContentLoaded", function () {
        dragElement(document.getElementsByClassName("tool-box")[0], "tool-box-header");

        document.getElementsByClassName("tool-box-minimize")[0].addEventListener("click", function () {
            var box = document.getElementsByClassName("tool-box")[0];
            var boxMain = document.getElementsByClassName("tool-box-main")[0];

            if (this.innerText == "-") {
                this.innerText = '+';

                toolBoxWidth = box.style.width;
                box.style.width = '40px';
                boxMain.style.display = 'none';
            } else {
                this.innerText = '-';

                box.style.width = toolBoxWidth;
                boxMain.style.display = 'block';
            }
        });
    });

    return {
        init: init,
        relocate: relocate,
        openNewTab: openNewTab,
        closeNewTab: closeNewTab
    };

}());
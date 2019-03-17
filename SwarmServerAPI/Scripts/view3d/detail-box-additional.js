var detailboxAdditional = (function () {

    var detailBoxHeight = '';
    var detailBoxHeightPre = '';
    var detailBoxWidth = 300;
    var detailBoxHeightInitial = 350;
    var marginLeftHoldAdjustment = 25;
    var marginTopHoldAdjustment = 80;

    function relocate() {
        var box = document.getElementsByClassName("detail-box-additional")[0];

        box.style.width = detailBoxWidth + 'px';
        box.style.height = detailBoxHeightInitial + 'px';
        box.style.top = (render.getDimensions().height - detailBoxHeightInitial + marginTopHoldAdjustment) + 'px';
        box.style.left = marginLeftHoldAdjustment + 'px';

        //var preTag = document.querySelector(".detail-box-additional pre");
        //preTag.style.height = (detailBoxHeightInitial - 40) + 'px';
    }

    var init = function () {
        var box = document.getElementsByClassName("detail-box-additional")[0];

        detailboxAdditional.relocate();

        dragElement(box, "detail-box-additional-header");

        document.getElementsByClassName("detail-box-additional-minimize")[0].addEventListener("click", function () {
            var box = document.getElementsByClassName("detail-box-additional")[0];
            var preTag = document.querySelector(".detail-box-additional pre");

            if (this.innerText == "-") {
                this.innerText = '+';

                detailBoxHeight = box.style.height;

                box.style.height = '30px';
                box.style.overflow = 'hidden';
                box.style.resize = 'none';

                //detailBoxHeightPre = preTag.style.height;
                //preTag.style.height = '30px';
            } else {
                this.innerText = '-';

                box.style.height = detailBoxHeight;
                box.style.resize = 'both';
                box.style.overflow = 'auto';

                //preTag.style.height = detailBoxHeightPre;
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

    var setHtml = function (data) {

        function getHtmlFromObject(obj, padding) {
            var html = '';
            var nextPadding = padding + 1;

            for (var property in obj) {
                var value = obj[property];

                if (obj[property] instanceof Array) {
                    value = 'Array(' + obj[property].length + ')';

                    for (var item in obj[property]) 
                        value += getHtmlFromObject(obj[property][item], nextPadding);
                }

                if (property == 'data')
                    value = getHtmlFromObject(JSON.parse(obj[property]), nextPadding);

                if (property == 'Created') {
                    obj[property].match(/\d+/)[0];
                    obj[property].match(/\d+/)[0];
                    value = new Date(obj[property].match(/\d+/)[0] * 1);
                    value = value.toLocaleString();
                }

                if (property == 'CodeFilePath' || property == 'filePath') {
                    var pathArray = obj[property].split('\\');
                    var file = '';
                    var path = '';

                    if (pathArray.length >= 1)
                        file = pathArray[pathArray.length - 1];

                    if (pathArray.length >= 2)
                        path = pathArray[pathArray.length - 2];

                    value = path + '\\' + file; 
                }

                html += '<p style="padding-left: ' + (padding * 10) + 'px"><span>' + property + '</span>:&nbsp;<span>' + value + '</span></p>';
            }

            return html;
        }

        var html = getHtmlFromObject(data, 0);

        /*
        var stringCopyOfData = JSON.stringify(data, null, 4);
        var copyOfData = JSON.parse(stringCopyOfData);

        if (copyOfData.breakpoints != undefined) {
            for (var i = 0; i < copyOfData.breakpoints.length; i++) {
                copyOfData.breakpoints[i].data = JSON.parse(copyOfData.breakpoints[i].data);
            }
        }

        if (copyOfData.events != undefined) {
            for (var i = 0; i < copyOfData.events.length; i++) {
                copyOfData.events[i].data = JSON.parse(copyOfData.events[i].data);
            }
        }

        if (copyOfData.data != undefined) {
            copyOfData.data = JSON.parse(copyOfData.data);
        }

        var html = JSON.stringify(copyOfData, null, 4);
        */
        var code = document.createElement('code');
        code.innerHTML = html;

        var boxMainPre = document.querySelector(".detail-box-additional-main pre");
        boxMainPre.innerHTML = '';
        boxMainPre.appendChild(code);
    };

    return {
        init: init,
        relocate: relocate,
        setHtml: setHtml
    };

}());
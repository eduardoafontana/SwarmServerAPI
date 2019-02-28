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

        console.log(box.style.top);

        var preTag = document.querySelector(".detail-box-additional pre");
        preTag.style.height = (detailBoxHeightInitial - 80) + 'px';
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

    return {
        init: init,
        relocate: relocate,
    };

}());
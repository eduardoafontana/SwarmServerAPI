var detailBoxHeight = '';

document.addEventListener("DOMContentLoaded", function () {
    dragElement(document.getElementsByClassName("detail-box")[0], "detail-box-header");

    document.getElementsByClassName("detail-box-minimize")[0].addEventListener("click", function () {
        var box = document.getElementsByClassName("detail-box")[0];

        if (this.innerText == "-") {
            this.innerText = '+';

            detailBoxHeight = box.style.height;
            box.style.height = '30px';
            box.style.overflow = 'hidden';
            box.style.resize = 'none';
        } else {
            this.innerText = '-';

            box.style.height = detailBoxHeight;
            box.style.resize = 'both';
            box.style.overflow = 'auto';
        }
    });
});

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
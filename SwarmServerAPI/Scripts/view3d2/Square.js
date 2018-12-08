var Square = function (cube, data) {

    var topPosition = data.line * 50 / groupAssembler.getMostHighFileLine();

    var width = 1;
    var height = 0.5;

    var topMargin = 0.5;

    var geometry = new THREE.PlaneBufferGeometry(width, height, 1);
    var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    var mesh = new THREE.Mesh(geometry, material);

    var marginWidth = 0.5;
    var sizeWithMargin = marginWidth + width;
    var marginBottom = 0.5;

    var heightWithMargin = topPosition + marginBottom;

    mesh.position.y = heightWithMargin;
    mesh.position.x = sizeWithMargin * cube.x;
    mesh.position.z = cube.z;

    mesh.rotation.x = 1.5; //flip to horizontal

    var initialCalculatedPositionX = mesh.position.x;
    var initialCalculatedPositionZ = mesh.position.z;
    var initialHeight = topPosition;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        mesh.visible = render.getSelectedScene().hideShowOptions.options.event;

        mesh.position.x = initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace;

        mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.sessionSpace;

        mesh.scale.x = render.getSelectedScene().scaleOptions.options.eventScale;
        mesh.scale.y = render.getSelectedScene().scaleOptions.options.eventScale;
        mesh.scale.z = render.getSelectedScene().scaleOptions.options.eventScale;

        mesh.position.y = (initialHeight * render.getSelectedScene().scaleOptions.options.heightScale) + marginBottom;

        if (render.wasClicked(mesh)) {
            var box = document.getElementsByClassName("detail-box")[0];

            box.style.visibility = 'visible';

            var boxMain = box.getElementsByClassName("detail-box-main")[0];

            var wrapper = document.createElement('div');
            wrapper.innerHTML = data.data;

            boxMain.innerHTML = '';
            boxMain.appendChild(wrapper);
        }

        if (render.wasMouseOver(mesh)) {
            infobox.setHtml('Click to open event details on information window.');

            material.color.setHex(render.getSelectedColorPalette().pointOver);
        } else {
            material.color.setHex(render.getSelectedColorPalette().square);
        }
    }

    return {
        mesh: mesh
    };

};


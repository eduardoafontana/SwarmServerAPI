var Torus = function (cube, data) {

    var height = data.line * 50 / groupAssembler.getMostHighFileLine();

    var radius = 0.7;
    var topMargin = 0.5;

    var originalColor = 0x404040;

    var geometry = new THREE.TorusGeometry(radius, 0.1, 100, 100);
    var material = new THREE.MeshBasicMaterial({ color: originalColor });
    var mesh = new THREE.Mesh(geometry, material);

    var margin = 0.1;
    var torusSize = radius * 2; //diameter
    var sizeWithMargin = margin + torusSize;
    var marginBottom = 0.5;

    var heightWithMargin = height + marginBottom;

    mesh.position.y = heightWithMargin;
    mesh.position.x = sizeWithMargin * cube.data.x;
    mesh.position.z = cube.data.z;

    mesh.rotation.x = 1.6; //flip to horizontal

    var initialCalculatedPositionX = mesh.position.x;
    var initialCalculatedPositionZ = mesh.position.z;
    var initialHeight = height;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        mesh.visible = render.getSelectedScene().hideShowOptions.options.breakpoint;

        mesh.position.x = initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace;

        mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.sessionSpace;

        mesh.scale.x = render.getSelectedScene().scaleOptions.options.breakpointScale;
        mesh.scale.y = render.getSelectedScene().scaleOptions.options.breakpointScale;
        mesh.scale.z = render.getSelectedScene().scaleOptions.options.breakpointScale;

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
            infobox.setHtml('Click to open breakpoint details on information window.');

            material.color.setHex(0xff0000);
        } else {
            material.color.setHex(originalColor);
        }
    }

    return {
        mesh: mesh
    };

};


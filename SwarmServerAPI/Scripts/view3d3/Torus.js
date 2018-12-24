var Torus = function (cube, data) {

    var height = data.positionIndex;//data.line * 50 / groupAssembler.getMostHighFileLine();

    var radius = 0.7;
    var topMargin = 0.5;

    var geometry = new THREE.TorusBufferGeometry(radius, 0.1, 4, 10);
    var material = new THREE.MeshBasicMaterial();
    var mesh = new THREE.Mesh(geometry, material);

    var margin = 1.6;
    var torusSize = radius * 2; //diameter
    var sizeWithMargin = margin + torusSize;
    var topHeightMargin = -0.25;
    var heightAdjustment = height * (-1);
    var cubeMarginTop = cube.data.marginTop * (-1);

    mesh.position.y = cubeMarginTop + heightAdjustment + topHeightMargin + groupAssembler.getPositionTopBase();
    mesh.position.x = sizeWithMargin * cube.data.x;
    mesh.position.z = cube.data.z;

    mesh.rotation.x = 1.6; //flip to horizontal

    var initialCalculatedPositionX = mesh.position.x;
    var initialCalculatedPositionZ = mesh.position.z;
    var initialCalculatedPositionY = heightAdjustment;

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        mesh.visible = render.getSelectedScene().hideShowOptions.options.breakpoint;

        mesh.position.x = initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace;
        mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.sessionSpace;
        mesh.position.y = (initialCalculatedPositionY * render.getSelectedScene().scaleOptions.options.heightScale) + cubeMarginTop + topHeightMargin + groupAssembler.getPositionTopBase();

        mesh.scale.x = render.getSelectedScene().scaleOptions.options.breakpointScale;
        mesh.scale.y = render.getSelectedScene().scaleOptions.options.breakpointScale;
        mesh.scale.z = render.getSelectedScene().scaleOptions.options.breakpointScale;

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

            material.color.setHex(render.getSelectedColorPalette().pointOver);
        } else {
            material.color.setHex(render.getSelectedColorPalette().torus);
        }
    }

    return {
        mesh: mesh
    };

};


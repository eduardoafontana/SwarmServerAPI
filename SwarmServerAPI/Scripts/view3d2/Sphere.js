var SphereDescriptor = (function () {
    var radius = 0.3;

    var geometry = new THREE.SphereBufferGeometry(radius, 8, 8);
    var material = new THREE.MeshBasicMaterial();

    var getMaterial = function () {
        return material;
    };

    var getGeometry = function () {
        return geometry;
    };

    var getRadius = function () {
        return radius;
    };

    return {
        getMaterial: getMaterial,
        getGeometry: getGeometry,
        getRadius: getRadius
    };
})();

var Sphere = function (cube, data) {

    var height = data.line * 50 / groupAssembler.getMostHighFileLine();

    var topMargin = 0.5;

    var mesh = new THREE.Mesh(SphereDescriptor.getGeometry(), SphereDescriptor.getMaterial());

    var margin = 0.9;
    var sphereSize = SphereDescriptor.getRadius() * 2; //diameter
    var sizeWithMargin = margin + sphereSize;
    var marginBottom = 0.5;

    var heightWithMargin = height + marginBottom;

    mesh.position.y = heightWithMargin;
    mesh.position.x = sizeWithMargin * cube.x;
    mesh.position.z = cube.z;

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

            SphereDescriptor.getMaterial().color.setHex(render.getSelectedColorPalette().pointOver);
        } else {
            SphereDescriptor.getMaterial().color.setHex(render.getSelectedColorPalette().torus);
        }
    }

    return {
        mesh: mesh
    };

};


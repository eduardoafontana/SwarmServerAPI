var HideCube = function (cube) {

    var height = cube.mesh.geometry.parameters.height;
    var radius = 0.5;
    var topMargin = 0.5;

    var originalColor = 0x37444c;

    var geometry = new THREE.SphereGeometry(radius, 20, 20);
    var material = new THREE.MeshBasicMaterial({ color: originalColor });
    var mesh = new THREE.Mesh(geometry, material);

    material.opacity = 0.5;
    material.transparent = true;

    var margin = 0.5;
    var sphereSize = radius * 2; //diameter
    var sizeWithMargin = margin + sphereSize;
    var marginBottom = 10;

    var heightWithMargin = height + marginBottom;

    mesh.position.y = radius + topMargin + heightWithMargin;
    mesh.position.x = sizeWithMargin * cube.data.x;
    mesh.position.z = sizeWithMargin * cube.data.z;

    var initialCalculatedPositionX = mesh.position.x;
    var initialCalculatedPositionZ = mesh.position.z;
    var initialHeight = height; 

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        mesh.position.x = initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace;
        //mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.cubeSpace;
        //TODO: review later

        mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.sessionSpace;

        mesh.position.y = (initialHeight * render.getSelectedScene().scaleOptions.options.heightScale) + topMargin + radius + marginBottom;

        if (render.wasClicked(mesh)) {
            if (cube.mesh.visible)
                cube.mesh.visible = false;
            else
                cube.mesh.visible = true;
        }

        if (render.wasMouseOver(mesh)) {
            infobox.setHtml('Click to hide and show the cube above.');

            material.color.setHex(0xff0000);
        }
        else {
            material.color.setHex(originalColor);
        }
    }

    return {
        mesh: mesh
    };

};


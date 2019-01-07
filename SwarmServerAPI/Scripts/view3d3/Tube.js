var Tube = function (nodes) {

    var vertices = [];
    var firstVertice = null;
    var topHeightMargin = -0.25;
    var topHeightMarginVariation = topHeightMargin + groupAssembler.getPositionTopBase();

    for (var i = 0; i < nodes.length; i++) {
        var height = i; 
        var heightAdjustment = height * (-1);

        var heightWithMargin = heightAdjustment + topHeightMarginVariation;

        vertices.push(nodes[i].x * 3, heightWithMargin, nodes[i].z);
    }

    var geometry = new THREE.BufferGeometry();

    var positions = new Float32Array(vertices);
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

    var material = new THREE.LineBasicMaterial({ linewidth: 5 });
    var mesh = new THREE.Line(geometry, material);

    var originalVertices = positions.slice();

    if (originalVertices.length > 2)
        firstVertice = { x: originalVertices[0], y: originalVertices[1], z: originalVertices[2] };

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        material.color.setHex(render.getSelectedColorPalette().tube);

        mesh.visible = render.getSelectedScene().hideShowOptions.options.pathNode;

        for (var i = 0; i < originalVertices.length; i += 3) {
            //x
            geometry.attributes.position.array[i] = originalVertices[i] * render.getSelectedScene().scaleOptions.options.cubeSpace;

            //y
            geometry.attributes.position.array[i + 1] = ((originalVertices[i + 1] - topHeightMarginVariation) * render.getSelectedScene().scaleOptions.options.heightScale) + topHeightMarginVariation;

            //z
            geometry.attributes.position.array[i + 2] = originalVertices[i + 2] * render.getSelectedScene().scaleOptions.options.sessionSpace;
        }

        geometry.attributes.position.needsUpdate = true;
    }

    return {
        mesh: mesh,
        firstVertice: firstVertice
    };

};


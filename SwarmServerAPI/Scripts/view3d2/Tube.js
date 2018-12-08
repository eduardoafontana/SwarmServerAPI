var Tube = function (nodes) {

    var vertices = [];
    var marginBottom = 0.5;

    for (var i = 0; i < nodes.length; i++) {
        var height = nodes[i].line * 50 / groupAssembler.getMostHighFileLine();
        var heightWithMargin = height + marginBottom;

        vertices.push(new THREE.Vector3(nodes[i].x * 1.5, heightWithMargin, nodes[i].z));
    }

    var curve = new THREE.CatmullRomCurve3(vertices, false, 'catmullrom', 0.2);
    var geometry = new THREE.TubeGeometry(curve, 20, 0.05, 5, false);
    var material = new THREE.MeshBasicMaterial();
    var mesh = new THREE.Mesh(geometry, material);

    var originalVertices = [];

    for (var i = 0; i < mesh.geometry.vertices.length; i++) {
        originalVertices.push({ x: mesh.geometry.vertices[i].x, z: mesh.geometry.vertices[i].z, y: mesh.geometry.vertices[i].y });
    }


    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        material.color.setHex(render.getSelectedColorPalette().tube);

        mesh.visible = render.getSelectedScene().hideShowOptions.options.pathNode;

        for (var i = 0; i < mesh.geometry.vertices.length; i++) {
            mesh.geometry.vertices[i].x = originalVertices[i].x * render.getSelectedScene().scaleOptions.options.cubeSpace;
            mesh.geometry.vertices[i].z = originalVertices[i].z * render.getSelectedScene().scaleOptions.options.sessionSpace;

            mesh.geometry.vertices[i].y = ((originalVertices[i].y - marginBottom) * render.getSelectedScene().scaleOptions.options.heightScale) + marginBottom;
        }

        mesh.geometry.verticesNeedUpdate = true;
    }

    return {
        mesh: mesh
    };

};


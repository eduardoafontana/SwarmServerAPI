var Tube = function (nodes) {

    var vertices = [];

    for (var i = 0; i < nodes.length; i++) {
        var height = nodes[i].line * 50 / groupAssembler.getMostHighFileLine();
        var marginBottom = 10;
        var heightWithMargin = height + marginBottom;

        vertices.push(new THREE.Vector3(nodes[i].x * 1.5, heightWithMargin, nodes[i].z * 1.5));
    }

    var curve = new THREE.CatmullRomCurve3(vertices, false, 'catmullrom', 0.2);
    var geometry = new THREE.TubeGeometry(curve, 100, 0.1, 20, false);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var mesh = new THREE.Mesh(geometry, material);

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        //mesh.position.x = initialCalculatedPositionX * render.getSelectedScene().scaleOptions.options.cubeSpace;
        //mesh.position.z = initialCalculatedPositionZ * render.getSelectedScene().scaleOptions.options.cubeSpace;

        //mesh.scale.y = render.getSelectedScene().scaleOptions.options.heightScale;
        //mesh.position.y = (initialCalculatedPositionY * render.getSelectedScene().scaleOptions.options.heightScale) + marginBottom;
    }

    return {
        mesh: mesh
    };

};


var Axes = function () {

    var mesh = new THREE.AxesHelper(50);

    function createAxesLabel(text, positions) {
        var parameters = {
            font: render.getFont(),
            size: 1,
            height: 0.001,
            curveSegments: 20,
            bevelEnabled: false
        };

        var geometry = new THREE.TextBufferGeometry(text, parameters);

        var edges = new THREE.EdgesGeometry(geometry);
        var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));

        var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        var meshLabel = new THREE.Mesh(geometry, material);

        meshLabel.add(line);
        meshLabel.position.set(positions.x, positions.y, positions.z);

        mesh.add(meshLabel);
    }

    createAxesLabel('X', new THREE.Vector3(101, 0, 0));
    createAxesLabel('Y', new THREE.Vector3(0, 51, 0));
    createAxesLabel('Z', new THREE.Vector3(0, 0, 101));

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        mesh.visible = render.getSelectedScene().hideShowOptions.options.axes;
    }

    return {
        mesh: mesh
    };
};


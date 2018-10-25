var Axes = function (scene) {

    var mesh = new THREE.AxesHelper(50);

    scene.add(mesh);

    function createAxesLabel(text, pFont, positions) {
        var parameters = {
            font: pFont,
            size: 1,
            height: 0.001,
            curveSegments: 20,
            bevelEnabled: false
        };

        var geometry = new THREE.TextGeometry(text, parameters);

        var edges = new THREE.EdgesGeometry(geometry);
        var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));

        var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        var mesh = new THREE.Mesh(geometry, material);

        mesh.add(line);
        mesh.position.set(positions.x, positions.y, positions.z);

        scene.add(mesh);

        internalAnimate();

        function internalAnimate() {
            window.requestAnimationFrame(internalAnimate);

            if (render.getSelectedScene() == null)
                return;

            mesh.visible = render.getSelectedScene().hideShowOptions.options.axes;
        }
    }

    var loader = new THREE.FontLoader();
    var font = loader.load('../Scripts/view3d2/fonts/helvetiker_regular.typeface.json', function (font) {
        createAxesLabel('X', font, new THREE.Vector3(101, 0, 0));
        createAxesLabel('Y', font, new THREE.Vector3(0, 51, 0));
        createAxesLabel('Z', font, new THREE.Vector3(0, 0, 101));
    });

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        mesh.visible = render.getSelectedScene().hideShowOptions.options.axes;
    }
};


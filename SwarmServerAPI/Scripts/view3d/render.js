var render = (function () {

    function getRelativeHeight() {
        return document.body.getElementsByClassName("canvasRenderRelativeSize")[0].offsetHeight;
    }

    function getRelativeWidth() {
        return document.body.getElementsByClassName("canvasRenderRelativeSize")[0].offsetWidth;
    }

    var sceneArray = [];
    var selectedScene = null;

    var initGraph = function () {
        var camera = new THREE.PerspectiveCamera(45, getRelativeWidth() / getRelativeHeight(), 1, 500);
        camera.position.set(60, 60, 60);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(getRelativeWidth(), getRelativeHeight());

        var canvasRenderRelativeSize = document.body.getElementsByClassName("canvasRenderRelativeSize")[0];
        canvasRenderRelativeSize.appendChild(renderer.domElement);

        var orbit = new THREE.OrbitControls(camera, renderer.domElement);
        orbit.enableZoom = true;
        orbit.maxPolarAngle = Math.PI * 0.5;

        var stats = new Stats();
        canvasRenderRelativeSize.appendChild(stats.dom);

        stats.dom.style.position = 'static';
        stats.dom.style.top = 'auto';
        stats.dom.style.left = 'auto';
        stats.dom.style.float = 'left';
        stats.dom.style.marginTop = '-55px';

        var animate = function () {
            requestAnimationFrame(animate);

            if (selectedScene != null && selectedScene != undefined)
                renderer.render(selectedScene, camera);

            stats.update();
        };

        animate();
    };

    var getNewScene = function () {
        var scene = new THREE.Scene();

        var axesHelper = new THREE.AxesHelper(50);
        scene.add(axesHelper);

        var gridHelper = new THREE.GridHelper(100, 10);
        scene.add(gridHelper);

        sceneArray.push(scene);

        if (selectedScene == null || selectedScene == undefined)
            render.setSelectedScene(scene);

        return scene;
    };

    var setSelectedScene = function (scene) {
        selectedScene = scene;
    };

    return {
        initGraph: initGraph,
        getNewScene: getNewScene,
        setSelectedScene : setSelectedScene
    };

}());


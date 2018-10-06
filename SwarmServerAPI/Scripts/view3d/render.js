var render = (function () {

    function getRelativeHeight() {
        return document.body.getElementsByClassName("canvasRenderRelativeSize")[0].offsetHeight;
    }

    function getRelativeWidth() {
        return document.body.getElementsByClassName("canvasRenderRelativeSize")[0].offsetWidth;
    }

    var sceneArray = [];
    var selectedScene = null;
    var camera = null;
    var renderer = null;
    var mouse = null;
    var raycaster = null;
    var clickedObject = null;
    var hasClickedOject = false;
    var overedObject = false;

    var initGraph = function () {
        camera = new THREE.PerspectiveCamera(45, getRelativeWidth() / getRelativeHeight(), 1, 500);
        camera.position.set(60, 60, 60);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        mouse = new THREE.Vector2();
        raycaster = new THREE.Raycaster();

        renderer = new THREE.WebGLRenderer();
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

            if (selectedScene == undefined || selectedScene == null)
                return;

            renderer.render(selectedScene, camera);

            //--
            raycaster.setFromCamera(mouse, camera);

            var intersects = raycaster.intersectObjects(selectedScene.interceptables);

            if (intersects.length > 0) {
                var intersect = intersects[0];

                overedObject = intersect.object;
            } else {
                overedObject = null;
                infobox.canClear();
            }
            //--

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

        scene.interceptables = [];

        sceneArray.push(scene);

        return scene;
    };

    var setSelectedSceneById = function (sceneId) {
        for (var i = 0; i < sceneArray.length; i++) {
            if (sceneArray[i].id == sceneId) {
                selectedScene = sceneArray[i];
                break;
            }
        }
    };

    var setSelectedSceneFirst = function () {
        selectedScene = sceneArray[0];
    };

    var onWindowResize = function () {
        camera.aspect = getRelativeWidth() / getRelativeHeight();
        camera.updateProjectionMatrix();

        renderer.setSize(getRelativeWidth(), getRelativeHeight());
    };

    var resetCameraPosition = function () {
        camera.position.set(60, 60, 60);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    var getDimensions = function () {
        return {
            width: renderer.getSize().width,
            height: renderer.getSize().height
        };
    };

    var onDocumentMouseMove = function (event) {
        var positions = document.body.getElementsByClassName("canvasRenderRelativeSize")[0].getBoundingClientRect();

        mouse.x = ((event.clientX - positions.x) / getRelativeWidth()) * 2 - 1;
        mouse.y = - ((event.clientY - positions.y) / getRelativeHeight()) * 2 + 1;
    };

    var onDocumentMouseDown = function (event) {
        var positions = document.body.getElementsByClassName("canvasRenderRelativeSize")[0].getBoundingClientRect();

        mouse.x = ((event.clientX - positions.x) / getRelativeWidth()) * 2 - 1;
        mouse.y = - ((event.clientY - positions.y) / getRelativeHeight()) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        if (selectedScene == undefined)
            return;

        var intersects = raycaster.intersectObjects(selectedScene.interceptables);

        if (intersects.length > 0) {
            var intersect = intersects[0];

            clickedObject = intersect.object;
            hasClickedOject = true;
        }
    };

    var wasClicked = function (object) {
        if (hasClickedOject && object == clickedObject) {
            hasClickedOject = false;
            return true;
        }
   
        return false;
    };

    var wasMouseOver = function (object) {
        return object == overedObject;
    };

    return {
        initGraph: initGraph,
        getNewScene: getNewScene,
        setSelectedSceneById: setSelectedSceneById,
        setSelectedSceneFirst: setSelectedSceneFirst,
        onWindowResize: onWindowResize,
        resetCameraPosition: resetCameraPosition,
        getDimensions: getDimensions,
        onDocumentMouseMove: onDocumentMouseMove,
        onDocumentMouseDown: onDocumentMouseDown,
        wasClicked: wasClicked,
        wasMouseOver: wasMouseOver
    };

}());


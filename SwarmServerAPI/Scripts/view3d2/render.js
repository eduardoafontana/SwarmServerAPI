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
    ////var cssRenderer = null;
    var mouse = null;
    var raycaster = null;
    var clickedObject = null;
    var hasClickedOject = false;
    var overedObject = false;
    var intersectedObjectData = null;
    var font = null;

    var initGraph = function () {
        camera = new THREE.PerspectiveCamera(45, getRelativeWidth() / getRelativeHeight(), 1, 500);
        camera.position.set(60, 60, 60);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        mouse = new THREE.Vector2();
        raycaster = new THREE.Raycaster();

        ////TODO: review later
        ////cssRenderer = new THREE.CSS3DRenderer();
        ////cssRenderer.setSize(getRelativeWidth(), getRelativeHeight());
        ////cssRenderer.domElement.style.position = 'absolute';
        ////cssRenderer.domElement.style.top = 0;

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(getRelativeWidth(), getRelativeHeight());

        var canvasRenderRelativeSize = document.body.getElementsByClassName("canvasRenderRelativeSize")[0];
        ////canvasRenderRelativeSize.appendChild(cssRenderer.domElement);
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

            if (selectedScene == null)
                return;

            renderer.render(selectedScene, camera);

            //--
            raycaster.setFromCamera(mouse, camera);

            var intersects = raycaster.intersectObjects(selectedScene.interceptables);

            if (intersects.length > 0) {
                intersectedObjectData = intersects[0];

                overedObject = intersectedObjectData.object;
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
        scene.background = new THREE.Color(0xf3f3f3);

        var axesHelper = new THREE.AxesHelper(50);
        scene.add(axesHelper);

        //--
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
        }

        var loader = new THREE.FontLoader();
        var font = loader.load('../Scripts/view3d2/fonts/helvetiker_regular.typeface.json', function (font) {
            createAxesLabel('X', font, new THREE.Vector3(101, 0, 0));
            createAxesLabel('Y', font, new THREE.Vector3(0, 51, 0));
            createAxesLabel('Z', font, new THREE.Vector3(0, 0, 101));
        });
        //--

        var gridHelper = new THREE.GridHelper(100, 10);
        gridHelper.position.x = 50.05;
        gridHelper.position.z = 50.05;
        scene.add(gridHelper);

        //--
        ////TODO: review later
        ////var material = new THREE.MeshBasicMaterial({ wireframe: true });
        ////var geometry = new THREE.PlaneGeometry();
        ////var planeMesh = new THREE.Mesh(geometry, material);
        ////// add it to the WebGL scene
        ////scene.add(planeMesh);

        ////var node = document.createTextNode("This is new.");
        ////var para = document.createElement("p");
        ////para.appendChild(node);

        ////var element = document.createElement("div1");
        ////element.appendChild(para);

        ////var cssObject = new THREE.CSS3DObject(element);
        ////cssObject.position = planeMesh.position;

        ////scene.add(cssObject);
        //--

        scene.interceptables = [];

        //--
        scene.scaleOptions = new dat.GUI({ autoPlace: false });

        scene.scaleOptions.options = {
            cubeSpace: 1,
            titleScale: 1,
            sessionSpace: 1,
            heightScale: 1,
            breakpointScale: 1,
            eventScale: 1,
            pathScale: 0.1,
        };

        scene.scaleOptions.add(scene.scaleOptions.options, 'cubeSpace', 1, 5);
        scene.scaleOptions.add(scene.scaleOptions.options, 'titleScale', 0.5, 5);
        scene.scaleOptions.add(scene.scaleOptions.options, 'sessionSpace', 1, 5);
        scene.scaleOptions.add(scene.scaleOptions.options, 'heightScale', 0.5, 3);
        scene.scaleOptions.add(scene.scaleOptions.options, 'breakpointScale', 0.5, 3);
        scene.scaleOptions.add(scene.scaleOptions.options, 'eventScale', 0.5, 3);

        //--
        scene.hideShowOptions = new dat.GUI({ autoPlace: false });

        scene.hideShowOptions.options = {
            file: true,
            title: true,
            hideFile: false,
            breakpoint: true,
            event: true,
            pathNode: true,
            pathNodePoints: true,
            architecture: true,
        };

        scene.hideShowOptions.add(scene.hideShowOptions.options, 'file');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'title');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'hideFile');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'breakpoint');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'event');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'pathNode');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'pathNodePoints');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'architecture');

        sceneArray.push(scene);

        return scene;
    };

    var setSelectedSceneById = function (sceneId) {
        for (var i = 0; i < sceneArray.length; i++) {
            if (sceneArray[i].id == sceneId) {
                selectedScene = sceneArray[i];

                scaleOptions.setScaleOption(selectedScene.scaleOptions);
                hideShowOptions.setHideShowOption(selectedScene.hideShowOptions);
                break;
            }
        }
    };

    var setSelectedSceneFirst = function () {
        selectedScene = sceneArray[0];
        scaleOptions.setScaleOption(sceneArray[0].scaleOptions);
        hideShowOptions.setHideShowOption(sceneArray[0].hideShowOptions);
    };

    var getSelectedScene = function () {
        return selectedScene;
    };

    var onWindowResize = function () {
        camera.aspect = getRelativeWidth() / getRelativeHeight();
        camera.updateProjectionMatrix();

        renderer.setSize(getRelativeWidth(), getRelativeHeight());
        ////cssRenderer.setSize(getRelativeWidth(), getRelativeHeight());
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
            intersectedObjectData = intersects[0];

            clickedObject = intersectedObjectData.object;
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

    var getIntersectedObjectData = function (object) {
        return intersectedObjectData;
    };

    var getFont = function () {
        return font;
    };

    var setFont = function (pFont) {
        font = pFont;
    };

    return {
        initGraph: initGraph,
        getNewScene: getNewScene,
        setSelectedSceneById: setSelectedSceneById,
        setSelectedSceneFirst: setSelectedSceneFirst,
        getSelectedScene: getSelectedScene,
        onWindowResize: onWindowResize,
        resetCameraPosition: resetCameraPosition,
        getDimensions: getDimensions,
        onDocumentMouseMove: onDocumentMouseMove,
        onDocumentMouseDown: onDocumentMouseDown,
        wasClicked: wasClicked,
        wasMouseOver: wasMouseOver,
        getIntersectedObjectData: getIntersectedObjectData,
        getFont: getFont,
        setFont: setFont
    };

}());


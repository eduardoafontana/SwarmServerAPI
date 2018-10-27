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

            selectedScene.background = new THREE.Color(selectedScene.colorPaletteOptions.options.backgroundColor);

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

        Axes(scene);

        scene.add(Grid().mesh);

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
            grid: true,
            axes: true,
        };

        scene.hideShowOptions.add(scene.hideShowOptions.options, 'file');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'title');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'hideFile');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'breakpoint');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'event');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'pathNode');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'pathNodePoints');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'architecture');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'grid');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'axes');

        scene.colorPaletteOptions = new dat.GUI({ autoPlace: false });
        scene.colorPaletteOptions.options = {
            colorPalette: 'BlackToBlack',
            backgroundColor: '#c4cbd1'
        };

        scene.colorPaletteOptions.add(scene.colorPaletteOptions.options, 'colorPalette', colorPalette.getColorPalatteArray());
        scene.colorPaletteOptions.addColor(scene.colorPaletteOptions.options, 'backgroundColor');

        sceneArray.push(scene);

        return scene;
    };

    var getSelectedColorPalette = function () {
        return colorPalette.getColorPalleteByName(getSelectedScene().colorPaletteOptions.options.colorPalette);
    };

    var setSelectedSceneById = function (sceneId) {
        for (var i = 0; i < sceneArray.length; i++) {
            if (sceneArray[i].id == sceneId) {
                selectedScene = sceneArray[i];

                scaleOptions.setScaleOption(selectedScene.scaleOptions);
                hideShowOptions.setHideShowOption(selectedScene.hideShowOptions);
                colorPaletteOptions.setColorPaletteOption(selectedScene.colorPaletteOptions);
                break;
            }
        }
    };

    var setSelectedSceneFirst = function () {
        selectedScene = sceneArray[0];
        scaleOptions.setScaleOption(sceneArray[0].scaleOptions);
        hideShowOptions.setHideShowOption(sceneArray[0].hideShowOptions);
        colorPaletteOptions.setColorPaletteOption(sceneArray[0].colorPaletteOptions);
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
        setFont: setFont,
        getSelectedColorPalette: getSelectedColorPalette
    };

}());


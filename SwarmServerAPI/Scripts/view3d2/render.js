var render = (function () {

    function getRelativeHeight() {
        return document.body.getElementsByClassName("cssRenderRelativeSize")[0].offsetHeight;
    }

    function getRelativeWidth() {
        return document.body.getElementsByClassName("cssRenderRelativeSize")[0].offsetWidth;
    }

    var sceneArray = [];
    var cssScene = null;
    var selectedScene = null;
    var camera = null;
    var renderer = null;
    var cssRenderer = null;
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

        cssRenderer = new THREE.CSS3DRenderer();
        cssRenderer.setSize(getRelativeWidth(), getRelativeHeight());
        document.querySelector('.cssRenderRelativeSize').appendChild(cssRenderer.domElement);

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
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

            if (selectedScene == null)
                return;

            renderer.render(selectedScene, camera);

            selectedScene.background = new THREE.Color(selectedScene.colorPaletteOptions.options.backgroundColor);

            cssRenderer.render(cssScene, camera);

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

    var getNewScene = function (userIndex, projectIndex) {
        var scene = new THREE.Scene();
        scene.userIndex = userIndex;
        scene.projectIndex = projectIndex;

        scene.add(Axes().mesh);
        scene.add(Grid().mesh);

        cssScene = new THREE.Scene();

        var element = document.createElement('div');
        element.style.width = '100px';
        element.style.height = '100px';
        element.style.opacity = 0.999;
        element.style.background = new THREE.Color(
            Math.random() * 0.21568627451 + 0.462745098039,
            Math.random() * 0.21568627451 + 0.462745098039,
            Math.random() * 0.21568627451 + 0.462745098039,
        ).getStyle();
        element.textContent = "I am editable text!"
        element.setAttribute('contenteditable', '')

        var domObject = new THREE.CSS3DObject(element);
        cssScene.add(domObject);

        var material = new THREE.MeshPhongMaterial({
            opacity: 0.2,
            color: new THREE.Color('black'),
            blending: THREE.NoBlending,
            side: THREE.DoubleSide,
        });
        var geometry = new THREE.PlaneGeometry(100, 100);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(domObject.position);
        mesh.castShadow = false;
        mesh.receiveShadow = true;
        scene.add(mesh);

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

    var setSelectedSceneById = function (userIndex, projectIndex) {
        for (var i = 0; i < sceneArray.length; i++) {
            if (sceneArray[i].userIndex == userIndex && sceneArray[i].projectIndex == projectIndex) {
                selectedScene = sceneArray[i];

                scaleOptions.setScaleOption(selectedScene.scaleOptions);
                hideShowOptions.setHideShowOption(selectedScene.hideShowOptions);
                colorPaletteOptions.setColorPaletteOption(selectedScene.colorPaletteOptions);
                return;
            }
        }

        view3d.sceneLoader(userIndex, projectIndex);

        setSelectedSceneById(userIndex, projectIndex);
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

        var canvasRenderRelativeSize = document.querySelector('.canvasRenderRelativeSize');
        canvasRenderRelativeSize.style.position = 'absolute';
        canvasRenderRelativeSize.style.top = '148px';
        canvasRenderRelativeSize.style.width = getRelativeWidth() + 'px';
        canvasRenderRelativeSize.style.height = getRelativeHeight() + 'px';

        camera.aspect = getRelativeWidth() / getRelativeHeight();
        camera.updateProjectionMatrix();

        renderer.setSize(getRelativeWidth(), getRelativeHeight());
        cssRenderer.setSize(getRelativeWidth(), getRelativeHeight());
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


var render = (function () {

    function getRelativeHeight() {
        return document.body.getElementsByClassName("canvasRenderRelativeSize")[0].offsetHeight;
    }

    function getRelativeWidth() {
        return document.body.getElementsByClassName("canvasRenderRelativeSize")[0].offsetWidth;
    }

    var selectedScene = null;
    var camera = null;
    var zoom = null;
    var renderer = null;
    var mouse = null;
    var raycaster = null;
    var clickedObject = null;
    var hasClickedOject = false;
    var overedObject = false;
    var intersectedObjectData = null;
    var font = null;

    var mouseVariation = 45;
    var dir = true;
    var speedRotation = 30;
    var isMouseRightButtonDown = false;

    var initGraph = function () {
        camera = new THREE.OrthographicCamera(0, 0, 0, 0, -50000, 50000);
        
        camera.position.set(60, 60, 60);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        mouse = new THREE.Vector2();
        raycaster = new THREE.Raycaster();

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(getRelativeWidth(), getRelativeHeight());

        var canvasRenderRelativeSize = document.body.getElementsByClassName("canvasRenderRelativeSize")[0];
        canvasRenderRelativeSize.appendChild(renderer.domElement);

        var view = d3.select(renderer.domElement);
        zoom = d3.behavior.zoom().scaleExtent([0.2, 30]).on('zoom', funcaoZoom);	

        var stats = new Stats();
        canvasRenderRelativeSize.appendChild(stats.dom);

        stats.dom.style.position = 'static';
        stats.dom.style.top = 'auto';
        stats.dom.style.left = 'auto';
        stats.dom.style.float = 'left';
        stats.dom.style.marginTop = '-55px';
        stats.dom.style.marginLeft = '305px';

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

        zoom.translate([getRelativeWidth() / 2, getRelativeHeight() / 2]);
        funcaoZoom();

        view.call(zoom);
    };

    var funcaoZoom = function () {
        if (isMouseRightButtonDown)
            return;

        var width = getRelativeWidth();
        var height = getRelativeHeight();
        var aspect = width / height;
        var DZOOM = 50;

        var z = zoom.scale();
        var _ref = zoom.translate();
        var x = _ref[0];
        var y = _ref[1];

        x = x - width / 2;
        y = y - height / 2;

        var factorZoom = DZOOM / z;

        camera.left = -factorZoom * aspect - x / width * factorZoom * 2 * aspect;
        camera.right = factorZoom * aspect - x / width * factorZoom * 2 * aspect;
        camera.top = factorZoom + y / height * factorZoom * 2;
        camera.bottom = -factorZoom + y / height * factorZoom * 2;

        camera.updateProjectionMatrix();
    };

    var getNewScene = function() {
        var scene = new THREE.Scene();

        scene.add(Axes().mesh);
        scene.add(Grid().mesh);

        scene.interceptables = [];

        //--Properties those are persistable on scene reload.
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
            shadow: true,
            title: false,
            start: true,
            //hideFile: false,
            breakpoint: true,
            event: true,
            pathNode: true,
            baseArchitecture: true,
            //pathNodePoints: true,
            architecture: true,
            grid: true,
            axes: false,
        };

        scene.hideShowOptions.add(scene.hideShowOptions.options, 'file');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'shadow');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'title');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'start');
        //scene.hideShowOptions.add(scene.hideShowOptions.options, 'hideFile');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'breakpoint');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'event');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'pathNode');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'baseArchitecture');
        //scene.hideShowOptions.add(scene.hideShowOptions.options, 'pathNodePoints');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'architecture');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'grid');
        scene.hideShowOptions.add(scene.hideShowOptions.options, 'axes');

        scene.colorPaletteOptions = new dat.GUI({ autoPlace: false });
        scene.colorPaletteOptions.options = {
            colorPalette: 'BlackToBlack',
            backgroundColor: '#ffffff'
        };

        scene.colorPaletteOptions.add(scene.colorPaletteOptions.options, 'colorPalette', colorPalette.getColorPalatteArray());
        scene.colorPaletteOptions.addColor(scene.colorPaletteOptions.options, 'backgroundColor');

        selectedScene = scene;

        scaleOptions.setScaleOption(selectedScene.scaleOptions);
        hideShowOptions.setHideShowOption(selectedScene.hideShowOptions);
        colorPaletteOptions.setColorPaletteOption(selectedScene.colorPaletteOptions);

        return scene;
    };

    var getSelectedColorPalette = function () {
        return colorPalette.getColorPalleteByName(getSelectedScene().colorPaletteOptions.options.colorPalette);
    };

    var getSelectedScene = function () {
        return selectedScene;
    };

    var onWindowResize = function () {
        renderer.setSize(getRelativeWidth(), getRelativeHeight());

        funcaoZoom();
    };

    var resetCameraPosition = function () {
        zoom.translate([getRelativeWidth() / 2, getRelativeHeight() / 2]);
        funcaoZoom();
    }

    var getDimensions = function () {
        return {
            width: renderer.getSize().width,
            height: renderer.getSize().height
        };
    };

    var setMouseCoordinates = function (event) {
        var positions = document.body.getElementsByClassName("canvasRenderRelativeSize")[0].getBoundingClientRect();

        mouse.x = ((event.clientX - positions.x) / getRelativeWidth()) * 2 - 1;
        mouse.y = - ((event.clientY - positions.y) / getRelativeHeight()) * 2 + 1;
    };

    var onDocumentMouseMove = function (event) {
        if (isMouseRightButtonDown == false) {
            setMouseCoordinates(event);
            return;
        }

        var oldMouseX = mouse.x;
        var oldDir = dir;

        setMouseCoordinates(event);

        if (mouse.x > oldMouseX)
            dir = true;
        else
            dir = false;

        if (dir !== oldDir)
            mouseInitial = (mouse.x / speedRotation);

        mouseVariation = mouseVariation + (mouse.x / speedRotation) - mouseInitial;

        camera.position.x = Math.sin(mouseVariation) * 60;
        camera.position.z = Math.cos(mouseVariation) * 60;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    };

    var onDocumentMouseDown = function (event) {
        setMouseCoordinates(event);

        setMouseRightButtonManipulation(event);

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

    var onDocumentMouseUp = function (event) {
        if (event.which != 3)
            return;

        //event.preventDefault();

        isMouseRightButtonDown = false;
    };

    var setMouseRightButtonManipulation = function (event) {
        if (event.which != 3)
            return;

        //event.preventDefault();

        isMouseRightButtonDown = true;

        mouseInitial = (mouse.x / speedRotation);
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
        getSelectedScene: getSelectedScene,
        onWindowResize: onWindowResize,
        resetCameraPosition: resetCameraPosition,
        getDimensions: getDimensions,
        onDocumentMouseMove: onDocumentMouseMove,
        onDocumentMouseDown: onDocumentMouseDown,
        onDocumentMouseUp: onDocumentMouseUp,
        wasClicked: wasClicked,
        wasMouseOver: wasMouseOver,
        getIntersectedObjectData: getIntersectedObjectData,
        getFont: getFont,
        setFont: setFont,
        getSelectedColorPalette: getSelectedColorPalette
    };

}());


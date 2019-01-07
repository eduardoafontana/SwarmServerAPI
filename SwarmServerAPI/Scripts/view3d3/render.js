var render = (function () {

    function getRelativeHeight() {
        return document.body.getElementsByClassName("cssRenderRelativeSize")[0].offsetHeight;
    }

    function getRelativeWidth() {
        return document.body.getElementsByClassName("cssRenderRelativeSize")[0].offsetWidth;
    }

    var sceneArray = [];
    var selectedScene = null;
    var cssScene = null;
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
        camera = new THREE.PerspectiveCamera(45, getRelativeWidth() / getRelativeHeight(), 0.1, 50000);
        //camera.position.set(6000, 6000, 6000);
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

            if (cssScene != null)
                cssRenderer.render(cssScene, camera);

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

    var getNewScene = function(userIndex, projectIndex, taskIndex) {
        var scene = new THREE.Scene();

        scene.userIndex = userIndex;
        scene.projectIndex = projectIndex;
        scene.taskIndex = taskIndex;

        scene.add(Axes().mesh);
        scene.add(Grid().mesh);

        scene.interceptables = [];

        for (var i = 0; i < sceneArray.length; i++) {
            if (sceneArray[i].userIndex === userIndex &&
                sceneArray[i].projectIndex === projectIndex &&
                sceneArray[i].taskIndex === taskIndex
            ) {
                scene.scaleOptions = sceneArray[i].scaleOptions;
                scene.hideShowOptions = sceneArray[i].hideShowOptions;
                scene.colorPaletteOptions = sceneArray[i].colorPaletteOptions;

                sceneArray[i] = scene;

                return scene;
            }
        }

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
            //file: true,
            //title: false,
            //hideFile: false,
            //breakpoint: false,
            //event: false,
            //pathNode: false,
            //pathNodePoints: false,
            //architecture: false,
            //grid: true,
            //axes: true,
            file: true,
            title: true,
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

    function mountCssCodeParts() {
        cssScene = new THREE.Scene();

        selectedScene.traverse(function (cube) {
            if (cube.name != 'Cube')
                return;

            var element = document.createElement('div');
            element.style.width = cube.geometry.parameters.width + 'px';
            element.style.height = cube.geometry.parameters.height + 'px';
            //console.log(cube.geometry.parameters.width + 'px', cube.geometry.parameters.height + 'px');
            element.style.background = new THREE.Color('blue').getStyle();
            //element.textContent = '<p style="font-size: 3px;">' + cube.id + '</p>';
            element.innerHTML = '<p style="font-size: 12px">' + cube.id + '</p>';
            //element.textContent = cube.id;
            //element.setAttribute('contenteditable', '');

            var domObject = new THREE.CSS3DObject(element);
            domObject.position.x = cube.position.x;
            domObject.position.y = cube.position.y;
            domObject.position.z = cube.position.z;
            cssScene.add(domObject);

            var materialPlane = new THREE.MeshPhongMaterial({
                opacity: 0.5,
                color: new THREE.Color('blue'),
                blending: THREE.NoBlending,
                side: THREE.DoubleSide,
            });

            var geometryPlane = new THREE.PlaneGeometry(cube.geometry.parameters.width, cube.geometry.parameters.height);
            var meshPlane = new THREE.Mesh(geometryPlane, materialPlane);
            meshPlane.position.x = domObject.position.x;
            meshPlane.position.y = domObject.position.y;
            meshPlane.position.z = domObject.position.z;
            meshPlane.castShadow = false;
            meshPlane.receiveShadow = true;

            selectedScene.add(meshPlane);
        });
    };

    var setSelectedSceneById = function (userIndex, projectIndex, taskIndex) {
        if (userIndex === undefined || userIndex === '') {
            console.log('None userIndex loaded in user selector.');
            return;
        }

        if (projectIndex === undefined || projectIndex === '') {
            console.log('None projectIndex loaded in project selector.');
            return;
        }

        if (taskIndex === undefined || taskIndex === '') {
            console.log('None taskIndex loaded in task selector.');
            return;
        }

        for (var i = 0; i < sceneArray.length; i++) {
            if (sceneArray[i].userIndex === userIndex &&
                sceneArray[i].projectIndex === projectIndex && 
                sceneArray[i].taskIndex === taskIndex
            ) {
                selectedScene = sceneArray[i];

                scaleOptions.setScaleOption(selectedScene.scaleOptions);
                hideShowOptions.setHideShowOption(selectedScene.hideShowOptions);
                colorPaletteOptions.setColorPaletteOption(selectedScene.colorPaletteOptions);
                //mountCssCodeParts();
                //TODO: enable here to render css parts
                return;
            }
        }
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


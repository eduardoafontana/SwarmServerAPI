var graph = (function () {

    var drawCube = function (positionX, positionZ, lines, hexColor, mostHighFileLine) {
        var height = lines * 50 / mostHighFileLine;

        var squareSize = 1;

        var ySize = height;
        var xSize = squareSize;
        var zSize = squareSize;

        var geometry = new THREE.BoxGeometry(xSize, ySize, zSize);
        var material = new THREE.MeshBasicMaterial({ color: hexColor });
        var cube = new THREE.Mesh(geometry, material);

        material.opacity = 0.5;
        material.transparent = true;

        var adjustToZeroAxisY = ySize / 2
        var margin = 0.5;
        var sizeWithMargin = margin + squareSize;

        cube.position.y = adjustToZeroAxisY;
        cube.position.x = sizeWithMargin * positionX;
        cube.position.z = sizeWithMargin * positionZ;

        cube.initialCalculatedPositionX = cube.position.x;
        cube.initialCalculatedPositionZ = cube.position.z;
        cube.initialCalculatedPositionY = cube.position.y;

        return cube;
    }

    var drawSphere = function (positionX, positionZ, height, hexColor) {
        var radius = 0.5;
        var topMargin = 0.5;

        var geometry = new THREE.SphereGeometry(radius, 20, 20);
        var material = new THREE.MeshBasicMaterial({ color: hexColor });
        var sphere = new THREE.Mesh(geometry, material);

        material.opacity = 0.5;
        material.transparent = true;

        var margin = 0.5;
        var sphereSize = radius * 2; //diameter
        var sizeWithMargin = margin + sphereSize;

        sphere.position.y = radius + topMargin + height;
        sphere.position.x = sizeWithMargin * positionX;
        sphere.position.z = sizeWithMargin * positionZ;

        sphere.initialCalculatedPositionX = sphere.position.x;
        sphere.initialCalculatedPositionZ = sphere.position.z;
        sphere.initialHeight = height;
        sphere.radius = radius;
        sphere.topMargin = topMargin;

        return sphere;
    }

    var drawTorus = function (positionX, positionZ, line, mostHighFileLine) {
        var height = line * 50 / mostHighFileLine;

        var radius = 0.7;
        var topMargin = 0.5;

        var geometryTorus = new THREE.TorusGeometry(radius, 0.1, 100, 100);
        var materialTorus = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        var torus = new THREE.Mesh(geometryTorus, materialTorus);

        var margin = 0.1;
        var torusSize = radius * 2; //diameter
        var sizeWithMargin = margin + torusSize;
        var adjustToZeroAxisY = height / 2;

        torus.position.y = topMargin + adjustToZeroAxisY;
        torus.position.x = sizeWithMargin * positionX;
        torus.position.z = sizeWithMargin * positionZ;

        torus.rotation.x = 1.6; //flip to horizontal

        torus.initialCalculatedPositionX = torus.position.x;
        torus.initialCalculatedPositionZ = torus.position.z;
        torus.initialHeight = adjustToZeroAxisY;
        torus.topMargin = topMargin;
        torus.radius = radius;

        return torus;
    }

    var drawTorusSquare = function (positionX, positionZ, line, mostHighFileLine) {
        var height = line * 50 / mostHighFileLine;

        var radius = 0.7;
        var topMargin = 0.5;

        var geometryTorus = new THREE.TorusGeometry(radius, 0.1, 100, 4);
        var materialTorus = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var torus = new THREE.Mesh(geometryTorus, materialTorus);

        var margin = 0.1;
        var torusSize = radius * 2; //diameter
        var sizeWithMargin = margin + torusSize;
        var adjustToZeroAxisY = height / 2;

        torus.position.y = topMargin + adjustToZeroAxisY;
        torus.position.x = sizeWithMargin * positionX;
        torus.position.z = sizeWithMargin * positionZ;

        torus.rotation.x = 1.6; //flip to horizontal
        torus.rotation.z = 0.8; //rotate to equal cube node

        torus.initialCalculatedPositionX = torus.position.x;
        torus.initialCalculatedPositionZ = torus.position.z;
        torus.initialHeight = adjustToZeroAxisY;
        torus.topMargin = topMargin;

        return torus;
    }

    var drawTube = function (vertices) {

        if (vertices == undefined)
            return new THREE.Object3D();

        if (vertices.length == 0)
            return new THREE.Object3D();

        var curveTube = new THREE.CatmullRomCurve3(vertices);
        var geometryTube = new THREE.TubeGeometry(curveTube, 100, 0.1, 20, false);
        var materialTube = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var tube = new THREE.Mesh(geometryTube, materialTube);

        tube.originalVertices = vertices;

        return tube;
    }

    function resetPathNodeScale() {
        var tubePathNode = graph.scene.getObjectByName('tubePathNode');

        var newPoints = [];
        for (var i = 0; i < tubePathNode.originalVertices.length; i++) {
            var cubeFromPathNode = graph.scene.getObjectById(tubePathNode.originalVertices[i].cubeId, true);

            newPoints.push(new THREE.Vector3(cubeFromPathNode.position.x, cubeFromPathNode.position.y, cubeFromPathNode.position.z));
        }

        tubePathNode.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(newPoints), 100, 0.1, 20, false);
    }

    var changeTorusScale = function (scaleOptions) {
        graph.scene.traverse(function (node) {
            if (node instanceof THREE.Mesh && node.canScaleChange && node.isTorus) {
                node.geometry = new THREE.TorusBufferGeometry(node.radius, scaleOptions.breakpointScale, 100, 100);
            }
        });
    };

    var changeTorusSquereScale = function (scaleOptions) {
        graph.scene.traverse(function (node) {
            if (node instanceof THREE.Mesh && node.canScaleChange && node.isTorusSquare) {
                node.geometry = new THREE.TorusBufferGeometry(node.radius, scaleOptions.eventScale, 100, 4);
            }
        });
    };

    var changeCubeScale = function (scaleOptions) {
        graph.scene.traverse(function (node) {
            if (node instanceof THREE.Mesh && node.canScaleChange) {
                node.position.x = node.initialCalculatedPositionX * scaleOptions.cubeSpace;
                node.position.z = node.initialCalculatedPositionZ * scaleOptions.cubeSpace;
            }
        });

        resetPathNodeScale();
    };

    var changeGroupScale = function (scaleOptions) {
        var groupBefore = undefined;
        var firstNodeOfGroup = undefined;

        graph.scene.traverse(function (node) {
            if (node instanceof THREE.Mesh && node.canScaleChange) {
                if (groupBefore == undefined) {
                    groupBefore = node.group;
                    firstNodeOfGroup = node;

                    node.position.x = node.initialCalculatedPositionX * scaleOptions.groupSpace;
                    node.position.z = node.initialCalculatedPositionZ * scaleOptions.groupSpace;
                } else if (groupBefore != node.group) {
                    groupBefore = node.group;
                    firstNodeOfGroup = node;

                    node.position.x = node.initialCalculatedPositionX * scaleOptions.groupSpace;
                    node.position.z = node.initialCalculatedPositionZ * scaleOptions.groupSpace;
                } else {
                    node.position.x = (firstNodeOfGroup.position.x - firstNodeOfGroup.initialCalculatedPositionX) + node.initialCalculatedPositionX;
                    node.position.z = (firstNodeOfGroup.position.z - firstNodeOfGroup.initialCalculatedPositionZ) + node.initialCalculatedPositionZ;
                }
            }
        });

        resetPathNodeScale();
    };

    var changeFileScale = function (scaleOptions) {
        graph.scene.traverse(function (node) {
            if (node instanceof THREE.Mesh && node.canScaleChange) {
                if (node.isCube != undefined) {
                    node.scale.y = scaleOptions.fileScale;
                    node.position.y = node.initialCalculatedPositionY * scaleOptions.fileScale;
                } else if (node.isSphere != undefined) {
                    node.position.y = (node.initialHeight * scaleOptions.fileScale) + node.topMargin + node.radius;
                } else if (node.isTorus != undefined || node.isTorusSquare != undefined) {
                    node.position.y = (node.initialHeight * scaleOptions.fileScale) + node.topMargin;
                }
            }
        });

        resetPathNodeScale();
    };

    var changeColor = function (colorOptions) {
        graph.scene.background = new THREE.Color(colorOptions.Background);
    };

    var changeGroupColor = function (colorOptions) {
        var groupBefore = undefined;
        var firstNodeOfGroup = undefined;
        var color = '';

        graph.scene.traverse(function (node) {
            if (node instanceof THREE.Mesh && node.canScaleChange) {

                if (groupBefore == undefined) {
                    groupBefore = node.group;
                    firstNodeOfGroup = node;

                    color = colorPalette.pickUpColor(colorOptions.Groups);
                } else if (groupBefore != node.group) {
                    groupBefore = node.group;
                    firstNodeOfGroup = node;

                    color = colorPalette.pickUpColor(colorOptions.Groups);
                }

                node.material.color = new THREE.Color(color);
            }
        });
    };

    var resetSessionScene = function (defaultGuid) {
        for (var i = 0; i < graph.scenes.length; i++) {
            if (graph.scenes[i].sessionGuid == defaultGuid) {
                graph.scene = graph.scenes[i];
                break;
            }
        }
    }

    var resetCameraPosition = function () {
        graph.camera.position.set(60, 60, 60);
        graph.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    return {
        camera: new THREE.PerspectiveCamera(45, 0, 1, 500),
        scene: undefined,
        scenes: [],
        mouse: new THREE.Vector2(),
        raycaster: new THREE.Raycaster(),
        renderer: new THREE.WebGLRenderer(),
        stats: new Stats(),
        //--
        drawCube: drawCube,
        drawSphere: drawSphere,
        drawTorus: drawTorus,
        drawTorusSquare: drawTorusSquare,
        drawTube: drawTube,
        //--
        changeTorusScale: changeTorusScale,
        changeTorusSquereScale: changeTorusSquereScale,
        changeCubeScale: changeCubeScale,
        changeGroupScale: changeGroupScale,
        changeFileScale: changeFileScale,
        //--
        changeColor: changeColor,
        changeGroupColor: changeGroupColor,
        //--
        resetSessionScene: resetSessionScene,
        resetCameraPosition: resetCameraPosition,
    };

}());


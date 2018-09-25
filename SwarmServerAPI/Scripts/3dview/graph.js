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
        var marginBottom = 10;

        cube.position.y = marginBottom + adjustToZeroAxisY;
        cube.position.x = sizeWithMargin * positionX;
        cube.position.z = sizeWithMargin * positionZ;

        cube.initialCalculatedPositionX = cube.position.x;
        cube.initialCalculatedPositionZ = cube.position.z;
        cube.initialCalculatedPositionY = adjustToZeroAxisY;
        cube.marginBottom = marginBottom;

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
        var marginBottom = 10; 

        var heightWithMargin = height + marginBottom;

        sphere.position.y = radius + topMargin + heightWithMargin;
        sphere.position.x = sizeWithMargin * positionX;
        sphere.position.z = sizeWithMargin * positionZ;

        sphere.initialCalculatedPositionX = sphere.position.x;
        sphere.initialCalculatedPositionZ = sphere.position.z;
        sphere.initialHeight = height;
        sphere.radius = radius;
        sphere.topMargin = topMargin;
        sphere.marginBottom = marginBottom;

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
        var marginBottom = 10; 

        var heightWithMargin = height + marginBottom;

        torus.position.y = heightWithMargin;
        torus.position.x = sizeWithMargin * positionX;
        torus.position.z = sizeWithMargin * positionZ;

        torus.rotation.x = 1.6; //flip to horizontal

        torus.initialCalculatedPositionX = torus.position.x;
        torus.initialCalculatedPositionZ = torus.position.z;
        torus.initialHeight = height;
        torus.radius = radius;
        torus.marginBottom = marginBottom;

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
        var marginBottom = 10; 

        var heightWithMargin = height + marginBottom;

        torus.position.y = heightWithMargin;
        torus.position.x = sizeWithMargin * positionX;
        torus.position.z = sizeWithMargin * positionZ;

        torus.rotation.x = 1.6; //flip to horizontal
        torus.rotation.z = 0.8; //rotate to equal cube node

        torus.initialCalculatedPositionX = torus.position.x;
        torus.initialCalculatedPositionZ = torus.position.z;
        torus.initialHeight = height;
        torus.marginBottom = marginBottom;

        return torus;
    }

    var drawTube = function (vertices) {

        if (vertices == undefined)
            return new THREE.Object3D();

        if (vertices.length == 0)
            return new THREE.Object3D();

        var curveTube = new THREE.CatmullRomCurve3(vertices, false, 'catmullrom', 0.2);
        var geometryTube = new THREE.TubeGeometry(curveTube, 100, 0.1, 20, false);
        var materialTube = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var tube = new THREE.Mesh(geometryTube, materialTube);

        tube.originalVertices = vertices;

        return tube;
    };

    var drawTubeSphere = function (vertice) {
        var geometryTubeSphere = new THREE.SphereGeometry(0.2, 20, 20);
        var materialTubeSphere = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        var tubeSphere = new THREE.Mesh(geometryTubeSphere, materialTubeSphere);

        var marginBottom = 10;

        tubeSphere.position.x = vertice.x;
        tubeSphere.position.y = vertice.y;
        tubeSphere.position.z = vertice.z;

        tubeSphere.initialCalculatedPositionX = tubeSphere.position.x;
        tubeSphere.initialCalculatedPositionZ = tubeSphere.position.z;
        tubeSphere.initialHeight = tubeSphere.position.y;
        tubeSphere.marginBottom = marginBottom;

        return tubeSphere;
    };

    var drawArrow = function (vertice) {
        var direction = new THREE.Vector3(1, -1, 1);
        direction.normalize();

        var positionAdjustment = 0.7;
        var position = new THREE.Vector3(vertice.x - positionAdjustment, vertice.y + positionAdjustment, vertice.z - positionAdjustment);
        var length = 1;
        var headLength = 0.4 * length;
        var marginBottom = 10;

        var arrowHelper = new THREE.ArrowHelper(direction, position, length, 0xff0000, headLength);

        arrowHelper.initialCalculatedPositionX = vertice.x;
        arrowHelper.initialCalculatedPositionZ = vertice.z;
        arrowHelper.initialHeight = vertice.y;
        arrowHelper.positionAdjustment = positionAdjustment;
        arrowHelper.marginBottom = marginBottom;

        return arrowHelper;
    };

    function resetPathNodeScale(fileScale) {
        var groupTube = graph.scene.getObjectByName('groupTube');

        for (var j = 0; j < groupTube.children.length; j++) {
            var newPoints = [];
            for (var i = 0; i < groupTube.children[j].originalVertices.length; i++) {
                var cubeFromPathNode = graph.scene.getObjectById(groupTube.children[j].originalVertices[i].cubeId, true);

                var height = groupTube.children[j].geometry.parameters.path.points[i].y;
                if (fileScale != undefined)
                    height = ((groupTube.children[j].originalVertices[i].y - groupTube.children[j].originalVertices[i].marginBottom) * fileScale) + groupTube.children[j].originalVertices[i].marginBottom;
                
                newPoints.push(new THREE.Vector3(cubeFromPathNode.position.x, height, cubeFromPathNode.position.z));
            }

            groupTube.children[j].geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(newPoints, false, 'catmullrom', 0.2), 100, groupTube.children[j].geometry.parameters.radius, 20, false);
        }

    };

    var changeTorusScale = function (scaleOptions) {
        graph.scene.traverse(function (node) {
            if ((node instanceof THREE.Mesh || node instanceof THREE.ArrowHelper) && node.canScaleChange && node.isTorus) {
                node.geometry = new THREE.TorusBufferGeometry(node.radius, scaleOptions.breakpointScale, 100, 100);
            }
        });
    };

    var changeTorusSquereScale = function (scaleOptions) {
        graph.scene.traverse(function (node) {
            if ((node instanceof THREE.Mesh || node instanceof THREE.ArrowHelper) && node.canScaleChange && node.isTorusSquare) {
                node.geometry = new THREE.TorusBufferGeometry(node.radius, scaleOptions.eventScale, 100, 4);
            }
        });
    };

    var changeTubeScale = function (scaleOptions) {
        graph.scene.traverse(function (node) {
            if (node instanceof THREE.Mesh && node.isTube) {
                var curveTube = new THREE.CatmullRomCurve3(node.geometry.parameters.path.points, false, 'catmullrom', 0.2);
                node.geometry = new THREE.TubeGeometry(curveTube, 100, scaleOptions.pathScale, 20, false);
            }
        });
    };

    var changeCubeScale = function (scaleOptions) {
        graph.scene.traverse(function (node) {
            if (node instanceof THREE.Mesh && node.canScaleChange) {
                node.position.x = node.initialCalculatedPositionX * scaleOptions.cubeSpace;
                node.position.z = node.initialCalculatedPositionZ * scaleOptions.cubeSpace;
            } else if (node instanceof THREE.ArrowHelper && node.canScaleChange) {
                node.position.x = (node.initialCalculatedPositionX * scaleOptions.cubeSpace) - node.positionAdjustment;
                node.position.z = (node.initialCalculatedPositionZ * scaleOptions.cubeSpace) - node.positionAdjustment;
            }
        });

        resetPathNodeScale();
    };

    var changeGroupScale = function (scaleOptions) {
        var groupBefore = undefined;
        var firstNodeOfGroup = undefined;

        graph.scene.traverse(function (node) {
            if ((node instanceof THREE.Mesh || node instanceof THREE.ArrowHelper) && node.canScaleChange) {
                if (node.isArrow) {
                    var cubeParent = graph.scene.getObjectById(node.cubeId, true);

                    node.position.x = cubeParent.position.x - node.positionAdjustment;
                    node.position.z = cubeParent.position.z - node.positionAdjustment;
                } else if (node.isTubeSphere) {
                    var cubeParent = graph.scene.getObjectById(node.cubeId, true);

                    node.position.x = cubeParent.position.x;
                    node.position.z = cubeParent.position.z;
                } else if (groupBefore == undefined) {
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
            if ((node instanceof THREE.Mesh || node instanceof THREE.ArrowHelper) && node.canScaleChange) {
                if (node.isCube != undefined) {
                    node.scale.y = scaleOptions.fileScale;
                    node.position.y = (node.initialCalculatedPositionY * scaleOptions.fileScale) + node.marginBottom;
                } else if (node.isSphere != undefined) {
                    node.position.y = (node.initialHeight * scaleOptions.fileScale) + node.topMargin + node.radius + node.marginBottom;
                } else if (node.isArrow != undefined) {
                    node.position.y = ((node.initialHeight - node.marginBottom) * scaleOptions.fileScale) + node.positionAdjustment + node.marginBottom;
                } else if (node.isTubeSphere != undefined) {
                    node.position.y = ((node.initialHeight - node.marginBottom) * scaleOptions.fileScale) + node.marginBottom;
                } else if (node.isTorus != undefined || node.isTorusSquare != undefined) {
                    node.position.y = (node.initialHeight * scaleOptions.fileScale) + node.marginBottom;
                }
            }
        });

        resetPathNodeScale(scaleOptions.fileScale);
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
        drawTubeSphere: drawTubeSphere,
        drawArrow: drawArrow,
        //--
        changeTorusScale: changeTorusScale,
        changeTorusSquereScale: changeTorusSquereScale,
        changeCubeScale: changeCubeScale,
        changeGroupScale: changeGroupScale,
        changeFileScale: changeFileScale,
        changeTubeScale: changeTubeScale,
        //--
        changeColor: changeColor,
        changeGroupColor: changeGroupColor,
        //--
        resetSessionScene: resetSessionScene,
        resetCameraPosition: resetCameraPosition,
    };

}());


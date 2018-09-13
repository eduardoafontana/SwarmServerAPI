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

    var drawTorus = function (positionX, positionZ, line, data, mostHighFileLine, group) {
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

        torus.group = group;
        torus.initialCalculatedPositionX = torus.position.x;
        torus.initialCalculatedPositionZ = torus.position.z;
        torus.initialHeight = adjustToZeroAxisY;
        torus.data = data;
        torus.topMargin = topMargin;
        torus.radius = radius;
        torus.isTorus = true;
        torus.canOpenDetailBox = true;
        torus.canHighlightOnMouseOver = true;
        torus.canScaleChange = true;

        return torus;
    }

    var drawTorusSquare = function (positionX, positionZ, line, data, mostHighFileLine, group) {
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

        torus.group = group;
        torus.initialCalculatedPositionX = torus.position.x;
        torus.initialCalculatedPositionZ = torus.position.z;
        torus.initialHeight = adjustToZeroAxisY;
        torus.data = data;
        torus.topMargin = topMargin;
        torus.isTorusSquare = true;
        torus.canOpenDetailBox = true;
        torus.canHighlightOnMouseOver = true;
        torus.canScaleChange = true;

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

        return tube;
    }

    return {
        drawCube: drawCube,
        drawSphere: drawSphere,
        drawTorus: drawTorus,
        drawTorusSquare: drawTorusSquare,
        drawTube: drawTube
    };

}());


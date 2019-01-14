var ArrowHuge = function (sessionsQuantity) {

    var verticeX = 0;
    var verticeY = groupAssembler.getPositionTopBase();
    var verticeZ = 0;

    var direction = new THREE.Vector3(0, 0, 1);
    direction.normalize();

    var positionAdjustmentX = 0.5;
    var positionAdjustmentZ = 0.5;
    var positionAdjustmentY = 0.05;

    var positionArray = new THREE.Vector3(verticeX - positionAdjustmentX, verticeY + positionAdjustmentY, verticeZ - positionAdjustmentZ);

    var length = sessionsQuantity * groupAssembler.getSessionMargin();
    var headLength = 3;
    var headWidth = 1;

    var mesh = new THREE.ArrowHelper(direction, positionArray, length, 0xff0000, headLength)

    internalAnimate();

    function internalAnimate() {
        window.requestAnimationFrame(internalAnimate);

        if (render.getSelectedScene() == null)
            return;

        mesh.setColor(new THREE.Color(render.getSelectedColorPalette().tube));

        mesh.visible = render.getSelectedScene().hideShowOptions.options.start;

        mesh.setLength(length * render.getSelectedScene().scaleOptions.options.sessionSpace, headLength, headWidth);
    }

    return {
        mesh: mesh
    };

};


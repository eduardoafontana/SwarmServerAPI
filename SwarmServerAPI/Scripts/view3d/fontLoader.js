var FontLoader = () => new Promise(function (resolve, reject) {

    var loader = new THREE.FontLoader();
    loader.load('../Scripts/view3d/fonts/helvetiker_regular.typeface.json', resolve);

});
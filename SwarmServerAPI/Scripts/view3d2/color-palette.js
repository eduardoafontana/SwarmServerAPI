var colorPalette = (function () {
    var palettes = [{
        name: 'BlackToBlack', colors: {
            cube: 0xb0aeae,
            cubeContrast: 0xdddddd,
            group: 0x404040,
            hideCube: 0x37444c,
            square: 0x404040,
            torus: 0x404040,
            tube: 0x404040,
            tubeSphere: 0x404040,
            pointOver: 0xff0000,
        }
    },
    {
        name: 'BlueToBlue', colors: {
            cube: 0x68a9f2,
            cubeContrast: 0x95bcff,
            group: 0x288eec,
            hideCube: 0x00e4f6,
            square: 0x00e4f6,
            torus: 0x00e4f6,
            tube: 0x00e4f6,
            tubeSphere: 0x00e4f6,
            pointOver: 0xff0000,
        }
    },
    {
        name: 'YellowToYellow', colors: {
            cube: 0xf2c50a,
            cubeContrast: 0xf6cf2d,
            group: 0xf0a412,
            hideCube: 0x936103,
            square: 0x936103,
            torus: 0x936103,
            tube: 0x936103,
            tubeSphere: 0x936103,
            pointOver: 0xff0000,
        }
    },
    {
        name: 'PinkToPink', colors: {
            cube: 0xfde5ff,
            cubeContrast: 0xffb7fa,
            group: 0xd22597,
            hideCube: 0xf772ff,
            square: 0xf772ff,
            torus: 0xf772ff,
            tube: 0xf772ff,
            tubeSphere: 0xf772ff,
            pointOver: 0xff0000,
        }
    }];

    var getColorPalatteArray = function () {
        var paletteArray = [];

        for (var i = 0; i < palettes.length; i++) {
            paletteArray.push(palettes[i].name);
        }

        return paletteArray;
    };

    var getColorPalleteByName = function (paletteName) {
        for (var i = 0; i < palettes.length; i++) {
            if (palettes[i].name == paletteName)
                return palettes[i].colors;
        }
    };

    var getColorPalleteFirst = function () {
        return palettes[0];
    };

    return {
        getColorPalatteArray: getColorPalatteArray,
        getColorPalleteByName: getColorPalleteByName,
        getColorPalleteFirst: getColorPalleteFirst
    };
}());
var colorPalette = (function () {
    var defaultColorPalette = 9;
    
    var colorPalettes = [
        {
            palette: 'Blue', colors: [
                '#3b5998',
                '#8b9dc3',
                '#dfe3ee',
                '#f7f7f7',
                '#fff',
                '#7289da',
                '#fff',
                '#99aab5',
                '#2c2f33',
                '#23272a',
                '#011f4b',
                '#03396c',
                '#005b96',
                '#6497b1',
                '#b3cde0',
            ]
        },
        {
            palette: 'Yellow', colors: [
                '#ffe0bd',
                '#ffcd94',
                '#eac086',
                '#ffad60',
                '#ffe39f',
                '#a67c00',
                '#bf9b30',
                '#ffbf00',
                '#ffcf40',
                '#ffdc73',
                '#8d5524',
                '#c68642',
                '#e0ac69',
                '#f1c27d',
                '#ffdbac',
            ]
        },
        {
            palette: 'Rainbow', colors: [
                '#d9534f',
                '#f9f9f9',
                '#5bc0de',
                '#5cb85c',
                '#428bca',
                '#008744',
                '#0057e7',
                '#d62d20',
                '#ffa700',
                '#fff',
                '#d11141',
                '#00b159',
                '#00aedb',
                '#f37735',
                '#ffc425',
            ]
        },
        {
            palette: 'Pastel Rainbow', colors: [
                '#e1f7d5',
                '#ffbdbd',
                '#c9c9ff',
                '#fff',
                '#f1cbff',
                '#ffb3ba',
                '#ffdfba',
                '#ffffba',
                '#baffc9',
                '#bae1ff',
                '#96ceb4',
                '#ffeead',
                '#ff6f69',
                '#ffcc5c',
                '#88d8b0',
            ]
        },
        {
            palette: 'Gray', colors: [
                '#999',
                '#777',
                '#555',
                '#333',
                '#111',
                '#343d46',
                '#4f5b66',
                '#65737e',
                '#a7adba',
                '#c0c5ce',
                '#6e7f80',
                '#536872',
                '#708090',
                '#536878',
                '#36454f',
            ]
        },
        {
            palette: 'Purple', colors: [
                '#efbbff',
                '#d896ff',
                '#be29ec',
                '#800080',
                '#606',
                '#373854',
                '#493267',
                '#9e379f',
                '#e86af0',
                '#7bb3ff',
                '#363b74',
                '#673888',
                '#ef4f91',
                '#c79dd7',
                '#4d1b7b',
            ]
        },
        {
            palette: 'Green', colors: [
                '#b3ecec',
                '#89ecda',
                '#43e8d8',
                '#40e0d0',
                '#3bd6c6',
                '#a3c1ad',
                '#a0d6b4',
                '#5f9ea0',
                '#317873',
                '#49796b',
                '#009688',
                '#35a79c',
                '#54b2a9',
                '#65c3ba',
                '#83d0c9',
            ]
        },
        {
            palette: 'Dark Green', colors: [
                '#1a472a',
                '#2a623d',
                '#5d5d5d',
                '#aaa',
                '#000000',
                '#077',
                '#066',
                '#055',
                '#044',
                '#033',
                '#b2d8d8',
                '#66b2b2',
                '#008080',
                '#066',
                '#004c4c',
            ]
        },
        {
            palette: 'Red', colors: [
                '#eec1ad',
                '#dbac98',
                '#d29985',
                '#c98276',
                '#e35d6a',
                '#ffc2cd',
                '#ff93ac',
                '#ff6289',
                '#fc3468',
                '#ff084a',
                '#ff00a9',
                '#fb9f9f',
                '#ff0065',
                '#ffbfd3',
                '#fb5858',
            ]
        },
        {
            palette: 'Metro Rainbow', colors: [
                '#00aedb',
                '#a200ff',
                '#f47835',
                '#d41243',
                '#8ec127',
                '#ee4035',
                '#f37736',
                '#fdf498',
                '#7bc043',
                '#0392cf',
                '#cc181e',
                '#2793e8',
                '#590',
                '#666',
                '#f1f1f1',
            ]
        },
        {
            palette: 'Neon Rainbow', colors: [
                '#fe0000',
                '#fdfe02',
                '#0bff01',
                '#011efe',
                '#fe00f6',
                '#326ada',
                '#d4d8d4',
                '#433e90',
                '#a19c9c',
                '#d2d2d2',
                '#ff4e50',
                '#fc913a',
                '#f9d62e',
                '#eae374',
                '#e2f4c7',
            ]
        },
        {
            palette: 'Dark Yellow', colors: [
                '#9c7248',
                '#926a2d',
                '#876127',
                '#7c501a',
                '#6f4f1d',
                '#d7c797',
                '#845422',
                '#ead61c',
                '#a47c48',
                '#000000',
                '#6b3e26',
                '#ffc5d9',
                '#c2f2d0',
                '#fdf5c9',
                '#ffcb85',
            ]
        },
    ];

    function getColorPaletteFromName(paletteName) {
        for (var i = 0; i < colorPalettes.length; i++) {
            if (colorPalettes[i].palette == paletteName)
                return colorPalettes[i];
        }
    };

    var iColor = Math.floor(Math.random() * 9);

    var pickUpColor = function (colorPaletteName) {
        var colorPalette = colorPalettes[defaultColorPalette];

        if (colorPaletteName != undefined)
            colorPalette = getColorPaletteFromName(colorPaletteName);

        var color = colorPalette.colors[iColor];

        iColor++;

        if (iColor == colorPalette.colors.length)
            iColor = 0;

        return color;
    };

    var getColorPalatteArray = function() {
        var paletteArray = [];

        for (var i = 0; i < colorPalettes.length; i++) {
            paletteArray.push(colorPalettes[i].palette);
        }

        return paletteArray;
    };

    return {
        pickUpColor: pickUpColor,
        getColorPalatteArray: getColorPalatteArray,
        defaultColorPaletteName: colorPalettes[defaultColorPalette].palette,
    };
}());
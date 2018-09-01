var sessionData = (function () {
    var defaultGuid = '8ab5c019-fdf8-4b4f-8c79-286372200417';

    var dataArray = [
        {
            guid: 'a98f0e6a-e632-48b1-9ab1-34c5d85a41ac', name: 'Session Example 1', data: [
                { lines: 150, group: 2, breakpoints: [{ line: 10, data: '<h4>título 10</h4><p>10 lines</p><p>breakpoint</p>' }], events: [] },
                { lines: 160, group: 2, breakpoints: [], events: [] },
                { lines: 130, group: 2, breakpoints: [], events: [] },
                { lines: 170, group: 2, breakpoints: [], events: [] },
                { lines: 140, group: 2, breakpoints: [], events: [] },
                { lines: 180, group: 2, breakpoints: [], events: [] },
                { lines: 200, group: 2, breakpoints: [], events: [] },
                { lines: 76, group: 2, breakpoints: [], events: [] },
                {
                    lines: 1300, group: 1, breakpoints: [
                        { line: 20, data: '<h4>título 20</h4><p>20 lines</p><p>breakpoint</p>' }
                    ], events: []
                },
                {
                    lines: 210, group: 1, breakpoints: [
                        { line: 30, data: '<h4>título 30</h4><p>30 lines</p><p>breakpoint</p>' },
                        { line: 40, data: '<h4>título 40</h4><p>40 lines</p><p>breakpoint</p>' }
                    ], events: []
                },
                {
                    lines: 489, group: 1, breakpoints: [
                    ], events: [
                        { line: 100, data: '<h4>título 100</h4><p>100 lines</p><p>event</p>' },
                        { line: 300, data: '<h4>título 300</h4><p>300 lines</p><p>event</p>' },
                        { line: 350, data: '<h4>título 350</h4><p>350 lines</p><p>event</p>' },
                    ]
                },
                { lines: 10, group: 1, breakpoints: [], events: [] },
                { lines: 890, group: 1, breakpoints: [], events: [] },
                {
                    lines: 2200, group: 1, breakpoints: [
                        { line: 478, data: '<h4>título 478</h4><p>478 lines</p><p>breakpoint</p>' },
                        { line: 510, data: '<h4>título 510</h4><p>510 lines</p><p>breakpoint</p>' },
                        { line: 515, data: '<h4>título 515</h4><p>515 lines</p><p>breakpoint</p>' },
                    ], events: []
                },
                { lines: 25, group: 1, breakpoints: [], events: [] },
                { lines: 245, group: 1, breakpoints: [], events: [] },
                { lines: 459, group: 1, breakpoints: [], events: [] },
                {
                    lines: 31, group: 3, breakpoints: [
                        { line: 2, data: '<h4>título 2</h4><p>2 lines</p><p>breakpoint</p>' },
                        { line: 31, data: '<h4>título 31</h4><p>31 lines</p><p>breakpoint</p>' },
                    ], events: []
                },
                {
                    lines: 357, group: 3, breakpoints: [
                        { line: 210, data: '<h4>título 210</h4><p>210 lines</p><p>breakpoint</p>' },
                        { line: 211, data: '<h4>título 211</h4><p>211 lines</p><p>breakpoint</p>' },
                        { line: 213, data: '<h4>título 213</h4><p>213 lines</p><p>breakpoint</p>' },
                        { line: 355, data: '<h4>título 355</h4><p>355 lines</p><p>breakpoint</p>' },
                    ], events: []
                },
                { lines: 1672, group: 3, breakpoints: [], events: [] },
                { lines: 100, group: 4, breakpoints: [], events: [] },
            ]
        },
        {
            guid: '8ab5c019-fdf8-4b4f-8c79-286372200417', name: 'Session Example 2', data: [
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 2, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 10, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 4, breakpoints: [], events: [] },
                { lines: 1, group: 3, breakpoints: [], events: [] },
                { lines: 1, group: 3, breakpoints: [], events: [] },
                { lines: 1, group: 3, breakpoints: [], events: [] },
                { lines: 1, group: 3, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 7, breakpoints: [], events: [] },
            ]
        },
        {
            guid: '2ec1fae8-d615-4190-8d7d-3c6d22ea9bec', name: 'Session Example 3', data: [
                { lines: 1, group: 2, breakpoints: [], events: [] },
                { lines: 1, group: 2, breakpoints: [], events: [] },
                { lines: 1, group: 2, breakpoints: [], events: [] },
                { lines: 1, group: 2, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 3, breakpoints: [], events: [] },
                { lines: 1, group: 4, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 7, breakpoints: [], events: [] },
                { lines: 1, group: 8, breakpoints: [], events: [] },
                { lines: 1, group: 9, breakpoints: [], events: [] },
                { lines: 1, group: 10, breakpoints: [], events: [] },
                {
                    lines: 120, group: 11, breakpoints: [], events: [
                        { line: 100, data: '<h4>título 100</h4><p>100 lines</p><p>event</p>' },
                        { line: 20, data: '<h4>título 20</h4><p>20 lines</p><p>event</p>' },
                        { line: 50, data: '<h4>título 50</h4><p>50 lines</p><p>event</p>' },
                    ]
                },
            ]
        },
        {
            guid: 'lk06oiam-e632-48b1-9ab1-35buka091509', name: 'Session Example 1', data: [
                {
                    lines: 402, group: 1, breakpoints: [
                        { line: 200, data: '<h4>título 200</h4><p>200 lines</p><p>breakpoint 35buka091509</p>' },
                        { line: 10, data: '<h4>título 10</h4><p>10 lines</p><p>breakpoint 35buka091509</p>' }
                    ], events: []
                },
            ]
        }
    ];

    var getDefault = function () {
        return defaultGuid;
    };

    var setDefault = function (guid) {
        defaultGuid = guid;
    };

    var getData = function () {
        for (var i = 0; i < dataArray.length; i++) {
            if (dataArray[i].guid == defaultGuid)
                return dataArray[i].data;
        }
    };

    var getDataByGuid = function (guid) {
        for (var i = 0; i < dataArray.length; i++) {
            if (dataArray[i].guid == guid)
                return dataArray[i].data;
        }
    };

    var getByGuid = function (guid) {
        for (var i = 0; i < dataArray.length; i++) {
            if (dataArray[i].guid == guid)
                return dataArray[i];
        }
    };

    var getArray = function () {
        var array = [];

        for (var i = 0; i < dataArray.length; i++) {
            array.push(dataArray[i].guid);
        }

        return array;
    };

    return {
        getData: getData,
        getDataByGuid: getDataByGuid,
        getArray: getArray,
        getByGuid: getByGuid,
        getDefault: getDefault,
        setDefault: setDefault
    };

}());


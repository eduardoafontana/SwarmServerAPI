﻿var projectData = (function () {
    var defaultGuid = '08bd0856-fb66-447f-aac1-64d0f16ae9f1';

    var dataArray = [
        {
            guid: '08bd0856-fb66-447f-aac1-64d0f16ae9f1', name: 'Project Example 1', data: ['8ab5c019-fdf8-4b4f-8c79-286372200417', '2ec1fae8-d615-4190-8d7d-3c6d22ea9bec']
        },
        {
            guid: '46cadc3c-a962-4440-bd14-db70b34aa712', name: 'Project Example 2', data: ['a98f0e6a-e632-48b1-9ab1-34c5d85a41ac']
        },
        {
            guid: 'ef2adb89-b6d3-4565-9e83-eb9cab9cca10', name: 'Project Test Over Breakpoint', data: ['lk06oiam-e632-48b1-9ab1-35buka091509']
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
            array.push({ 'name': dataArray[i].name, 'guid': dataArray[i].guid });
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


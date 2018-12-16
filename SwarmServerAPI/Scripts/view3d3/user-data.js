var userData = (function () {
    var defaultGuid = '08bd0856-fb66-447f-aac1-64d0f16ae9f1';

    var dataArray = [
        {
            guid: 'ca3e1e84-fd4b-4f60-abd6-2a9be4d5ed32', name: 'User ABC', data: ['08bd0856-fb66-447f-aac1-64d0f16ae9f1', '46cadc3c-a962-4440-bd14-db70b34aa712']
        },
        {
            guid: '2cf7c124-021d-4c01-9c9b-5d551899a2b9', name: 'User XYZ', data: ['ef2adb89-b6d3-4565-9e83-eb9cab9cca10']
        },
        {
            guid: '1da87893-9fe1-43be-8e1a-9cccc43678f6', name: 'User OKS', data: ['ad119620-80c8-418c-b198-eae5aa65fd70']
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


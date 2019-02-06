var dataControl = (function () {

    var view = null;

    var getView = function () {
        return view;
    };

    var setView = function (data) {
        view = data;
    };

    var getDataFromServer = (selectedList) => new Promise(function (resolve, reject) {
        var url = location.origin + '/api/Visualization/View3d';

        $.post(url, { list: selectedList }).done(function(responseJson) {
            console.log(responseJson);
            resolve(responseJson);
        });
    });

    var getSourceCodeFromServer = (originalId) => new Promise(function (resolve, reject) {
        var filter = '?originalId=' + encodeURI(originalId);
        var url = location.origin + '/api/Visualization/SourceCode' + filter;

        $.get(url, function(responseJson) {
            resolve(responseJson);
        });
    });

    var getTaskProjectDataFilterFromServer = () => new Promise(function (resolve, reject) {
        var url = location.origin + '/api/Visualization/View3dTaskProjectFilter';

        $.get(url, function (responseJson) {
            console.log(responseJson);
            resolve(responseJson);
        });
    });

    var getUserDataFilteFromServer = (selectedList) => new Promise(function (resolve, reject) {
        var url = location.origin + '/api/Visualization/View3dUserFilter';

        $.post(url, { list: selectedList }).done(function (responseJson) {
            console.log(responseJson);
            resolve(responseJson);
        });
    });

    var getSessionDataFilteFromServer = (selectedList) => new Promise(function (resolve, reject) {
        var url = location.origin + '/api/Visualization/View3dSessionFilter';

        $.post(url, { list: selectedList }).done(function (responseJson) {
            console.log(responseJson);
            resolve(responseJson);
        });
    });

    return {
        getView: getView,
        setView: setView,
        getDataFromServer: getDataFromServer,
        getSourceCodeFromServer: getSourceCodeFromServer,
        getTaskProjectDataFilterFromServer: getTaskProjectDataFilterFromServer,
        getUserDataFilteFromServer: getUserDataFilteFromServer,
        getSessionDataFilteFromServer: getSessionDataFilteFromServer
    };

}());


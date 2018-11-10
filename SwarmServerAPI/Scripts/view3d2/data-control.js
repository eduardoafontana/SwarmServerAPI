var dataControl = (function () {

    var users = [];

    var getUsers = function () {
        return users;
    };

    var getProjects = function (i) {
        return users[i].projects;
    };


    var getDataFromServer = () => new Promise(function (resolve, reject) {
        var xmlhttp = new XMLHttpRequest();
        var url = location.origin + '/api/Visualization/View3d';

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var jsonData = JSON.parse(this.responseText);
                console.log(jsonData);
                resolve(jsonData);
            }
        };

        xmlhttp.open('GET', url, true);
        xmlhttp.send();
    });

    var loadData = function (data) {
        users = data;
    };

    return {
        getUsers: getUsers,
        getProjects: getProjects,
        loadData: loadData,
        getDataFromServer: getDataFromServer
    };

}());


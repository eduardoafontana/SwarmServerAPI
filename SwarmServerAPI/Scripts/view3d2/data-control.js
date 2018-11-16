var dataControl = (function () {

    var users = [];

    var getUsers = function () {
        return users;
    };

    var getTasks = function (u, p) {
        if (u < 0 || p < 0)
            return [];

        if (users[u].projects == undefined || users[u].projects[p].tasks == undefined)
            return [];

        return users[u].projects[p].tasks;
    };

    var getProjects = function (u) {
        if (u < 0)
            return [];

        if (users[u].projects == undefined)
            return [];

        return users[u].projects;
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
        getTasks: getTasks,
        getProjects: getProjects,
        loadData: loadData,
        getDataFromServer: getDataFromServer
    };

}());


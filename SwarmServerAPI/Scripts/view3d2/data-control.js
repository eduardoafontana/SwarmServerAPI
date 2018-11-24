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

    var getDataFilterFromServer = () => new Promise(function (resolve, reject) {
        var xmlhttp = new XMLHttpRequest();
        var url = location.origin + '/api/Visualization/View3dFilter';

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

    var getDataFromServer = (user, project, task) => new Promise(function (resolve, reject) {
        var filter = '?user=' + encodeURI(user) + '&project=' + encodeURI(project) + '&task=' + encodeURI(task);

        var xmlhttp = new XMLHttpRequest();
        var url = location.origin + '/api/Visualization/View3d' + filter;

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

    var setFilter = function (data) {
        users = data;
    };

    var setData = function (data, userIndex, projectIndex, taskIndex) {

        if (userIndex == undefined || userIndex == '') {
            console.log('None userIndex loaded in user selector, on load server data.');
            return;
        }

        if (projectIndex == undefined || projectIndex == '') {
            console.log('None projectIndex loaded in project selector, on load server data.');
            return;
        }

        if (taskIndex == undefined || taskIndex == '') {
            console.log('None taskIndex loaded in task selector, on load server data.');
            return;
        }

        if (data[0] == undefined) {
            console.log('None user object found on server, on load server data.');
            return;
        }

        if (data[0].projects[0] == undefined) {
            console.log('None project object found on server, on load server data.');
            return;
        }

        if (data[0].projects[0].tasks[0] == undefined) {
            console.log('None tasks object found on server, on load server data.');
            return;
        }

        users[userIndex].projects[projectIndex].tasks[taskIndex] = data[0].projects[0].tasks[0];
    };

    return {
        getUsers: getUsers,
        getTasks: getTasks,
        getProjects: getProjects,
        setFilter: setFilter,
        setData: setData,
        getDataFilterFromServer: getDataFilterFromServer,
        getDataFromServer: getDataFromServer
    };

}());


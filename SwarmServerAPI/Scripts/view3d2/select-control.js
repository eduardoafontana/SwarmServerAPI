var selectControl = (function () {

    var init = function () {

        var selectUser = document.getElementById('user-select');
        var selectProject = document.getElementById('project-select');
        var selectTask = document.getElementById('task-select');

        var array = dataControl.getUsers();

        for (let i = 0; i < array.length; i++) {
            var option = document.createElement('option');

            option.text = array[i].name;
            option.value = i;

            selectUser.add(option);
        }

        onSelectUserChange();

        selectUser.addEventListener("change", onSelectUserChange);

        function onSelectUserChange() {
            do {
                selectProject.remove(0);
            } while (selectProject.length > 0);

            var array = dataControl.getProjects(selectUser.selectedIndex);

            for (let i = 0; i < array.length; i++) {
                var option = document.createElement('option');

                option.text = array[i].name;
                option.value = i;

                selectProject.add(option);
            }

            onSelectProjectChange();
        }

        selectProject.addEventListener("change", onSelectTaskChange);

        function onSelectProjectChange() {
            do {
                selectTask.remove(0);
            } while (selectTask.length > 0);

            var array = dataControl.getTasks(selectUser.selectedIndex, selectProject.selectedIndex);

            for (let i = 0; i < array.length; i++) {
                var option = document.createElement('option');

                option.text = array[i].name;
                option.value = i;

                selectTask.add(option);
            }

            onSelectTaskChange();
        }

        selectTask.addEventListener("change", onSelectTaskChange);

        function onSelectTaskChange() {
            render.setSelectedSceneById(selectUser.value, selectProject.value, selectTask.value);
        }
    };

    return {
        init: init
    };
}());
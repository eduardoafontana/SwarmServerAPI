var selectControl = (function () {

    var init = function () {

        var selectUser = document.getElementById('user-select');
        var selectProject = document.getElementById('project-select');

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
                option.value = array[i].sceneId;

                selectProject.add(option);
            }

            onSelecProjectChange();
        }

        selectProject.addEventListener("change", onSelecProjectChange);

        function onSelecProjectChange() {
            render.setSelectedSceneById(selectProject.value);
        }
    };

    return {
        init: init
    };
}());
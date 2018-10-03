var selectControl = function (objectName, data, parentSelectorObject) {

    var select = document.getElementById(objectName);
    var array = data.getArray();

    for (let i = 0; i < array.length; i++) {
        var option = document.createElement('option');

        option.text = array[i].name;
        option.value = array[i].guid;

        if (array[i].guid == data.getDefault())
            option.selected = true;

        select.add(option);
    }

    if (parentSelectorObject != undefined)
        parentSelectorObject.select.addEventListener("change", onSelectChange);

    function onSelectChange(obj) {
        console.log(obj.target.selectedIndex); //selecionado no pai

        console.log(objectName);
        console.log(select); //filho
        var array = data.getArray();
        console.log(array.length); //filho

        //TODO: aplicar filtro nos dados do filho a partir do selecionado do pai

        //aqui eu quero acessar os dados do filho filtrando pelo pai selecionado
        //console.log(parentSelectorObject.data);

        //do {
        //    select.remove(0);
        //} while (select.length > 0);

        //var dataOfProject = projectData.getDataByGuid(projectGuid);

        //for (let i = 0; i < dataOfProject.length; i++) {
        //    var session = sessionData.getByGuid(dataOfProject[i]);
        //    var option = document.createElement('option');

        //    option.text = session.name;
        //    option.value = session.guid;

        //    if (session.guid == sessionData.getDefault())
        //        option.selected = true;

        //    sessionSelect.add(option);
        //}

        //projectData.setDefault(document.getElementById("project-select").value);
        //graph.resetSessionScene(sessionData.getDefault());
    };

    return {
        select: select,
        data: data
    };
};
﻿var taskProjectFilter = (function () {

    var init = function (tasksprojects) {
        var listDiv = document.querySelector('#taskproject-list-div');
        listDiv.innerHTML = '';

        var select = document.createElement('select');
        select.classList.add('selectpicker');
        select.multiple = true;
        select.setAttribute('data-live-search', 'true');
        select.setAttribute('data-show-subtext', 'true');

        for (var i = 0; i < tasksprojects.length; i++) {
            var option = document.createElement('option');
            option.text = tasksprojects[i].taskName;
            option.setAttribute('data-subtext', tasksprojects[i].projectName);
            option.value = tasksprojects[i].projectName;
            
            select.appendChild(option);
        }

        listDiv.appendChild(select);

        $('#taskproject-list-div .selectpicker').selectpicker({ width: 'fit' });

        $('#taskproject-list-div .selectpicker').on('show.bs.select', function (e, clickedIndex, isSelected, previousValue) {
            var divDropdownMenu = document.querySelector('div.dropdown-menu');
            divDropdownMenu.style.minWidth = '290px';
            divDropdownMenu.style.width = '290px';
            divDropdownMenu.style.fontSize = '0.8rem';
            divDropdownMenu.style.transform = 'translate3d(0px, 38px, 0px)';

            var ulDropdownMenu = document.querySelector('ul.dropdown-menu');
            ulDropdownMenu.style.fontSize = '0.8rem';
        });

        $('#taskproject-list-div div.bs-searchbox input').on('input', function () {
            var divDropdownMenu = document.querySelector('div.dropdown-menu');
            divDropdownMenu.style.minWidth = '290px';
            divDropdownMenu.style.width = '290px';
            divDropdownMenu.style.fontSize = '0.8rem';
            divDropdownMenu.style.transform = 'translate3d(0px, 38px, 0px)';

            var ulDropdownMenu = document.querySelector('ul.dropdown-menu');
            ulDropdownMenu.style.fontSize = '0.8rem';
        });

        

        $('#taskproject-list-div .selectpicker').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {

            var selectedList = [];

            for (var i = 0; i < e.target.options.length; i++) {
                if (e.target.options[i].selected == false)
                    continue;

                selectedList.push({ taskName: e.target.options[i].text, projectName: e.target.options[i].value });
            }

            dataControl.getUserDataFilteFromServer(selectedList).then(function (userDataFromServer) {
                userFilter.init(userDataFromServer);
            });
        });
    };

    return {
        init: init
    };
})();
var taskProjectFilter = (function () {

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
            
            select.appendChild(option);
        }

        listDiv.appendChild(select);

        $('.selectpicker').selectpicker({ width: 'fit' });

        $('.selectpicker').on('show.bs.select', function (e, clickedIndex, isSelected, previousValue) {
            var divDropdownMenu = document.querySelector('div.dropdown-menu');
            divDropdownMenu.style.minWidth = '290px';
            divDropdownMenu.style.width = '290px';
            divDropdownMenu.style.fontSize = '0.8rem';
            divDropdownMenu.style.transform = 'translate3d(0px, 38px, 0px)';

            var ulDropdownMenu = document.querySelector('ul.dropdown-menu');
            ulDropdownMenu.style.fontSize = '0.8rem';
        });

        $('div.bs-searchbox input').on('input', function () {
            var divDropdownMenu = document.querySelector('div.dropdown-menu');
            divDropdownMenu.style.minWidth = '290px';
            divDropdownMenu.style.width = '290px';
            divDropdownMenu.style.fontSize = '0.8rem';
            divDropdownMenu.style.transform = 'translate3d(0px, 38px, 0px)';

            var ulDropdownMenu = document.querySelector('ul.dropdown-menu');
            ulDropdownMenu.style.fontSize = '0.8rem';
        });

        

        //$('.selectpicker').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        //    var divDropdownMenu = document.querySelector('div.dropdown-menu');
        //    divDropdownMenu.style.minWidth = '200px';
        //    divDropdownMenu.style.width = '200px';
        //    divDropdownMenu.style.transform = 'translate3d(0px, 38px, 0px)';

        //    var divDropdown = document.querySelector('div.dropdown');
        //    console.log(divDropdown.style.width);
        //    divDropdown.style.width = '200px !important';
        //});
    };

    return {
        init: init
    };
})();

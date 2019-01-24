var userFilter = (function () {

    var init = function (users) {
        var listDiv = document.querySelector('#user-list-div');
        listDiv.innerHTML = '';

        var select = document.createElement('select');
        select.classList.add('selectpicker');
        select.multiple = true;
        select.setAttribute('data-live-search', 'true');
        select.setAttribute('data-show-subtext', 'true');

        for (var i = 0; i < users.length; i++) {
            var option = document.createElement('option');
            option.text = users[i].name;
            
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

        

        $('.selectpicker').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {

            //TODO prepare filter

            //TODO get sessions
            //dataControl.getUserDataFilterFromServer().then(function (userDataFromServer) {
            //    userFilter.init(userDataFromServer);
            //});
        });
    };

    return {
        init: init
    };
})();

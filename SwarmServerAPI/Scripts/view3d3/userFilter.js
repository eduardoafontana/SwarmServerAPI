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
            option.text = users[i].userName;
            option.setAttribute('taskName', users[i].taskName);
            option.setAttribute('projectName', users[i].projectName);
            
            select.appendChild(option);
        }

        listDiv.appendChild(select);

        $('#user-list-div .selectpicker').selectpicker({ width: '290px' });

        $('#user-list-div .selectpicker').on('show.bs.select', function (e, clickedIndex, isSelected, previousValue) {
            var divDropdownMenu = document.querySelector('#user-list-div div.dropdown-menu');
            divDropdownMenu.style.fontSize = '0.8rem';

            var ulDropdownMenu = document.querySelector('#user-list-div ul.dropdown-menu');
            ulDropdownMenu.style.fontSize = '0.8rem';
        });

        $('#user-list-div div.bs-searchbox input').on('input', function () {
            var divDropdownMenu = document.querySelector('#user-list-div div.dropdown-menu');
            divDropdownMenu.style.fontSize = '0.8rem';

            var ulDropdownMenu = document.querySelector('#user-list-div ul.dropdown-menu');
            ulDropdownMenu.style.fontSize = '0.8rem';
        });

        $('#user-list-div .selectpicker').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {

            var selectedList = [];

            for (var i = 0; i < e.target.options.length; i++) {
                if (e.target.options[i].selected == false)
                    continue;

                selectedList.push({ userName: e.target.options[i].text, taskName: e.target.options[i].getAttribute('taskName'), projectName: e.target.options[i].getAttribute('projectName') });
            }

            dataControl.getSessionDataFilteFromServer(selectedList).then(function (sessionDataFromServer) {
                sessionFilter.init(sessionDataFromServer);
            });
        });
    };

    return {
        init: init
    };
})();

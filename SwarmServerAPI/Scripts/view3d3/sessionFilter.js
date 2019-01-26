var sessionFilter = (function () {

    var init = function (sessions) {
        var sessionListDiv = document.querySelector('#session-list-div');
        sessionListDiv.innerHTML = '';

        for (var s = 0; s < sessions.length; s++) {
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'session-checkbox';
            checkbox.value = sessions[s].originalId;
            checkbox.checked = false;
            checkbox.classList.add('form-check-input');

            var label = document.createElement('label')
            label.htmlFor = checkbox.id;
            label.appendChild(document.createTextNode(sessions[s].name));
            label.classList.add('form-check-label');

            var div = document.createElement('div');
            div.classList.add('form-check');

            div.appendChild(checkbox);
            div.appendChild(label);

            var checkboxVisible = document.createElement('input');
            checkboxVisible.type = 'checkbox';
            checkboxVisible.name = 'session-checkbox-visible';
            checkboxVisible.value = sessions[s].sessionId;
            checkboxVisible.id = 'sessionId-checkbox-visible-id-' + sessions[s].sessionId;
            checkboxVisible.checked = true;
            checkboxVisible.classList.add('session-checkbox-visible');

            div.appendChild(checkboxVisible);

            var label = document.createElement('label')
            label.htmlFor = checkboxVisible.id;

            div.appendChild(label);

            var span = document.createElement('i')
            span.classList.add('far');
            span.classList.add('fa-eye-slash');
            span.classList.add('fa-lg');
            span.classList.add('feather');
            span.classList.add('unchecked');

            label.appendChild(span);

            var span = document.createElement('i')
            span.classList.add('far');
            span.classList.add('fa-eye');
            span.classList.add('fa-lg');
            span.classList.add('feather');
            span.classList.add('checked');

            label.appendChild(span);

            var label = document.createElement('label')
            label.appendChild(document.createTextNode(sessions[s].breakpointCount));
            label.title = 'Amount of breakpoints';
            label.classList.add('form-check-label');
            label.classList.add('session-label-breakpoint');

            div.appendChild(label);

            var label = document.createElement('label')
            label.appendChild(document.createTextNode(sessions[s].eventCount));
            label.title = 'Amount of events';
            label.classList.add('form-check-label');
            label.classList.add('session-label-event');

            div.appendChild(label);

            sessionListDiv.appendChild(div);
        }
    };

    var getSelectedSessions = function () {
        var selectedList = [];

        var selectedSessions = document.querySelectorAll('input[name="session-checkbox"]:checked');

        for (var i = 0; i < selectedSessions.length; i++) {
            selectedList.push({ id: selectedSessions[i].value });
        }

        return selectedList;
    };

    var getVisible = function (sessionId, internalControlVisible) {
        var visible = false;

        var checkbox = document.querySelector('#sessionId-checkbox-visible-id-' + sessionId);

        if (checkbox == undefined)
            return visible;

        visible = checkbox.checked;

        if (checkbox.checked)
            visible = internalControlVisible;

        return visible;
    };

    return {
        init: init,
        getVisible: getVisible,
        getSelectedSessions: getSelectedSessions
    };
})();

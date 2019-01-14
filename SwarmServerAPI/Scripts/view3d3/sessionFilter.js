var sessionFilter = (function () {

    var init = function (sessions) {
        var sessionListDiv = document.querySelector('#session-list-div');
        sessionListDiv.innerHTML = '';

        for (var s = 0; s < sessions.length; s++) {
            var content = sessions[s].name;

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'session-checkbox';
            checkbox.value = sessions[s].sessionId;
            checkbox.id = 'sessionId-checkbox-id-' + sessions[s].sessionId;
            checkbox.checked = true;
            checkbox.classList.add('form-check-input');

            var label = document.createElement('label')
            label.htmlFor = checkbox.id;
            label.appendChild(document.createTextNode('Debug ' + content));
            label.classList.add('form-check-label');

            var div = document.createElement('div');
            div.classList.add('form-check');

            div.appendChild(checkbox);
            div.appendChild(label);

            sessionListDiv.appendChild(div);
        }
    };

    var getVisible = function (sessionId, internalControlVisible) {
        var visible = false;

        var checkbox = document.querySelector('#sessionId-checkbox-id-' + sessionId);

        if (checkbox == undefined)
            return visible;

        visible = checkbox.checked;

        if (checkbox.checked)
            visible = internalControlVisible;

        return visible;
    };

    return {
        init: init,
        getVisible: getVisible
    };
})();

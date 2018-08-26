var sessionData = (function () {
    var defaultSession = 2;

    var sessions = [
        {
            session: 'Session Example 1', files: [
                { lines: 150, group: 2, breakpoints: [{ line: 10, data: '<h4>título 10</h4><p>10 lines</p><p>breakpoint</p>' }], events: [] },
                { lines: 160, group: 2, breakpoints: [], events: [] },
                { lines: 130, group: 2, breakpoints: [], events: [] },
                { lines: 170, group: 2, breakpoints: [], events: [] },
                { lines: 140, group: 2, breakpoints: [], events: [] },
                { lines: 180, group: 2, breakpoints: [], events: [] },
                { lines: 200, group: 2, breakpoints: [], events: [] },
                { lines: 76, group: 2, breakpoints: [], events: [] },
                {
                    lines: 1300, group: 1, breakpoints: [
                        { line: 20, data: '<h4>título 20</h4><p>20 lines</p><p>breakpoint</p>' }
                    ], events: []
                },
                {
                    lines: 210, group: 1, breakpoints: [
                        { line: 30, data: '<h4>título 30</h4><p>30 lines</p><p>breakpoint</p>' },
                        { line: 40, data: '<h4>título 40</h4><p>40 lines</p><p>breakpoint</p>' }
                    ], events: []
                },
                {
                    lines: 489, group: 1, breakpoints: [
                    ], events: [
                        { line: 100, data: '<h4>título 100</h4><p>100 lines</p><p>event</p>' },
                        { line: 300, data: '<h4>título 300</h4><p>300 lines</p><p>event</p>' },
                        { line: 350, data: '<h4>título 350</h4><p>350 lines</p><p>event</p>' },
                    ]
                },
                { lines: 10, group: 1, breakpoints: [], events: [] },
                { lines: 890, group: 1, breakpoints: [], events: [] },
                {
                    lines: 2200, group: 1, breakpoints: [
                        { line: 478, data: '<h4>título 478</h4><p>478 lines</p><p>breakpoint</p>' },
                        { line: 510, data: '<h4>título 510</h4><p>510 lines</p><p>breakpoint</p>' },
                        { line: 515, data: '<h4>título 515</h4><p>515 lines</p><p>breakpoint</p>' },
                    ], events: []
                },
                { lines: 25, group: 1, breakpoints: [], events: [] },
                { lines: 245, group: 1, breakpoints: [], events: [] },
                { lines: 459, group: 1, breakpoints: [], events: [] },
                {
                    lines: 31, group: 3, breakpoints: [
                        { line: 2, data: '<h4>título 2</h4><p>2 lines</p><p>breakpoint</p>' },
                        { line: 31, data: '<h4>título 31</h4><p>31 lines</p><p>breakpoint</p>' },
                    ], events: []
                },
                {
                    lines: 357, group: 3, breakpoints: [
                        { line: 210, data: '<h4>título 210</h4><p>210 lines</p><p>breakpoint</p>' },
                        { line: 211, data: '<h4>título 211</h4><p>211 lines</p><p>breakpoint</p>' },
                        { line: 213, data: '<h4>título 213</h4><p>213 lines</p><p>breakpoint</p>' },
                        { line: 355, data: '<h4>título 355</h4><p>355 lines</p><p>breakpoint</p>' },
                    ], events: []
                },
                { lines: 1672, group: 3, breakpoints: [], events: [] },
                { lines: 100, group: 4, breakpoints: [], events: [] },
            ]
        },
        {
            session: 'Session Example 2', files: [
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 2, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 10, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 4, breakpoints: [], events: [] },
                { lines: 1, group: 3, breakpoints: [], events: [] },
                { lines: 1, group: 3, breakpoints: [], events: [] },
                { lines: 1, group: 3, breakpoints: [], events: [] },
                { lines: 1, group: 3, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 7, breakpoints: [], events: [] },
            ]
        },
        {
            session: 'Session Example 3', files: [
                { lines: 1, group: 2, breakpoints: [], events: [] },
                { lines: 1, group: 2, breakpoints: [], events: [] },
                { lines: 1, group: 2, breakpoints: [], events: [] },
                { lines: 1, group: 2, breakpoints: [], events: [] },
                { lines: 1, group: 1, breakpoints: [], events: [] },
                { lines: 1, group: 3, breakpoints: [], events: [] },
                { lines: 1, group: 4, breakpoints: [], events: [] },
                { lines: 1, group: 5, breakpoints: [], events: [] },
                { lines: 1, group: 6, breakpoints: [], events: [] },
                { lines: 1, group: 7, breakpoints: [], events: [] },
                { lines: 1, group: 8, breakpoints: [], events: [] },
                { lines: 1, group: 9, breakpoints: [], events: [] },
                { lines: 1, group: 10, breakpoints: [], events: [] },
                { lines: 1, group: 11, breakpoints: [], events: [] },
            ]
        }
    ];

    var getDefaultSessionName = function () {
        return sessions[defaultSession].session;
    };

    var getSessionData = function () {
        return sessions[defaultSession].files;
    };

    var getSessionArray = function () {
        var array = [];

        for (var i = 0; i < sessions.length; i++) {
            array.push(sessions[i].session);
        }

        return array;
    };

    var setDefaultSession = function (index) {
        defaultSession = index;
    };

    return {
        getSessionData: getSessionData,
        getSessionArray: getSessionArray,
        getDefaultSessionName: getDefaultSessionName,
        setDefaultSession: setDefaultSession
    };

}());


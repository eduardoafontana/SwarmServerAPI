var dataControl = (function () {

    var users = [
        {
            name: 'User ABC', projects: [{
                name: 'Project 1 ABC', sessions: [{
                    files: [
                        { lines: 150, breakpoints: [{ line: 10, data: '<h4>título 10</h4><p>10 lines</p><p>breakpoint</p>' }], events: [] },
                        { fileId: 'b6ffd257', lines: 160, breakpoints: [], events: [], nodes: [{ line: 30 }] },
                        { fileId: '2d7c', lines: 170, breakpoints: [], events: [], nodes: [{ line: 50 }, { line: 15 }] },
                        { fileId: '4038', lines: 140, breakpoints: [], events: [], nodes: [{ line: 60 }] },
                        { lines: 180, breakpoints: [], events: [] },
                        { lines: 200, breakpoints: [], events: [] },
                        { fileId: '7f8aeab1cb38', lines: 130, breakpoints: [], events: [], nodes: [{ line: 40 }] },
                        { lines: 76, breakpoints: [], events: [] },
                        {
                            lines: 300, breakpoints: [
                                { line: 20, data: '<h4>título 20</h4><p>20 lines</p><p>breakpoint</p>' }
                            ], events: []
                        },
                        {
                            lines: 210, breakpoints: [
                                { line: 30, data: '<h4>título 30</h4><p>30 lines</p><p>breakpoint</p>' },
                                { line: 40, data: '<h4>título 40</h4><p>40 lines</p><p>breakpoint</p>' }
                            ], events: []
                        },
                        {
                            lines: 120, breakpoints: [
                            ], events: [
                                { line: 10, data: '<h4>título 100</h4><p>100 lines</p><p>event</p>' },
                                { line: 30, data: '<h4>título 300</h4><p>300 lines</p><p>event</p>' },
                                { line: 35, data: '<h4>título 350</h4><p>350 lines</p><p>event</p>' },
                            ]
                        },
                        { lines: 10, breakpoints: [], events: [] },
                        { lines: 280, breakpoints: [], events: [] },
                        {
                            lines: 200, breakpoints: [
                                { line: 178, data: '<h4>título 478</h4><p>478 lines</p><p>breakpoint</p>' },
                                { line: 60, data: '<h4>título 510</h4><p>510 lines</p><p>breakpoint</p>' },
                                { line: 65, data: '<h4>título 515</h4><p>515 lines</p><p>breakpoint</p>' },
                            ], events: []
                        },
                        { lines: 25, breakpoints: [], events: [] },
                        { lines: 245, breakpoints: [], events: [] },
                        { lines: 240, breakpoints: [], events: [] },
                        {
                            lines: 31, breakpoints: [
                                { line: 2, data: '<h4>título 2</h4><p>2 lines</p><p>breakpoint</p>' },
                                { line: 31, data: '<h4>título 31</h4><p>31 lines</p><p>breakpoint</p>' },
                            ], events: []
                        },
                        {
                            lines: 300, breakpoints: [
                                { line: 210, data: '<h4>título 210</h4><p>210 lines</p><p>breakpoint</p>' },
                                { line: 211, data: '<h4>título 211</h4><p>211 lines</p><p>breakpoint</p>' },
                                { line: 213, data: '<h4>título 213</h4><p>213 lines</p><p>breakpoint</p>' },
                                { line: 235, data: '<h4>título 355</h4><p>355 lines</p><p>breakpoint</p>' },
                            ], events: []
                        },
                        { lines: 140, breakpoints: [], events: [] },
                        { lines: 100, breakpoints: [], events: [] },
                    ],
                    pathnodes: [{ fileId: 'b6ffd257', line: 30 }, { fileId: '2d7c', line: 50 }, { fileId: '2d7c', line: 15 }, { fileId: '4038', line: 60 }, { fileId: '7f8aeab1cb38', line: 40 } ]
                },
                {
                    files: [
                        { lines: 10, breakpoints: [], events: [], nodes: [{ line: 5 }] },
                        { lines: 20, breakpoints: [], events: [], nodes: [{ line: 10 }] },
                        { lines: 30, breakpoints: [], events: [], nodes: [{ line: 15 }] },
                        { lines: 40, breakpoints: [], events: [], nodes: [{ line: 20 }] },
                    ],
                    pathnodes: []
                },
                {
                    files: [
                        { lines: 1, breakpoints: [], events: [], nodes: [{ line: 1 }] },
                        { lines: 1, breakpoints: [], events: [], nodes: [{ line: 1 }] },
                        { lines: 1, breakpoints: [], events: [], nodes: [{ line: 1 }] },
                        { lines: 1, breakpoints: [], events: [], nodes: [{ line: 1 }] },
                    ], pathnodes: []
                }
                ]
            }]
        },
        {
            name: 'User XYZ', projects: [{
                name: 'Project 1 XYZ', sessions: [{
                    files: [{
                        lines: 300,
                        breakpoints: [],
                        events: [],
                        nodes: []
                    }],
                    pathnodes: []
                }]
            }]
        },
        {
            name: 'User OKS', projects: [
                {
                    name: 'Project 1 OKS', sessions: [{
                        files: [{
                            lines: 120,
                            breakpoints: [],
                            events: [],
                            nodes: []
                        }],
                        pathnodes: []
                    }]
                },
                {
                    name: 'Project 2 OKS', sessions: [
                        {
                            files: [
                                { lines: 1, breakpoints: [], events: [] },
                                { lines: 1, breakpoints: [], events: [] },
                                { lines: 1, breakpoints: [], events: [] },
                                {
                                    lines: 120, breakpoints: [], events: [
                                        { line: 100, data: '<h4>título 100</h4><p>100 lines</p><p>event</p>' },
                                        { line: 20, data: '<h4>título 20</h4><p>20 lines</p><p>event</p>' },
                                        { line: 50, data: '<h4>título 50</h4><p>50 lines</p><p>event</p>' },
                                    ]
                                },
                            ], pathnodes: []
                        }
                    ]
                }
            ]
        }
    ];

    var getUsers = function () {
        return users;
    };

    var getProjects = function (i) {
        return users[i].projects;
    };

    return {
        getUsers: getUsers,
        getProjects: getProjects
    };

}());


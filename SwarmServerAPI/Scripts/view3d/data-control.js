var dataControl = (function () {

    var users = [
        {
            name: 'User ABC', projects: [{
                name: 'Day 17-10 presentation', sessions: [{
                    files: [{
                        fileId: '1',
                        groupId: 1,
                        lines: 10,
                        breakpoints: [{
                            line: 5, data: 'dados html'
                        }],
                        events: [{ line: 7, data: 'dados html' }],
                        nodes: [{ line: 5 }]
                    },
                    {
                        fileId: '2',
                        groupId: 1,
                        lines: 20,
                        breakpoints: [{
                            line: 10, data: 'dados html'
                        }],
                        events: [{ line: 12, data: 'dados html' }],
                        nodes: [{ line: 10 }]
                    },
                    {
                        fileId: '3',
                        groupId: 1,
                        lines: 30,
                        breakpoints: [{
                            line: 15, data: 'dados html'
                        }],
                        events: [{ line: 17, data: 'dados html' }],
                        nodes: [{ line: 15 }]
                    },
                    {
                        fileId: '4',
                        groupId: 2,
                        lines: 40,
                        breakpoints: [{
                            line: 20, data: 'dados html'
                        }],
                        events: [{ line: 22, data: 'dados html' }],
                        nodes: [{ line: 20 }]
                    },
                    {
                        fileId: '5',
                        groupId: 3,
                        lines: 50,
                        breakpoints: [{
                            line: 25, data: 'dados html'
                        }],
                        events: [{ line: 27, data: 'dados html' }],
                        nodes: [{ line: 25 }]
                    },
                    {
                        fileId: '6',
                        groupId: 3,
                        lines: 60,
                        breakpoints: [{
                            line: 30, data: 'dados html'
                        }],
                        events: [{ line: 32, data: 'dados html' }],
                        nodes: [{ line: 30 }]
                    }],
                    pathnodes: [{ fileId: '1', line: 5 }, { fileId: '2', line: 10 }, { fileId: '3', line: 15 }, { fileId: '4', line: 20 }, { fileId: '5', line: 25 }, { fileId: '6', line: 30 }]
                },
                {
                    files: [{
                        fileId: '10',
                        groupId: 1,
                        lines: 10,
                        breakpoints: [{
                            line: 5, data: 'dados html'
                        }],
                        events: [{ line: 7, data: 'dados html' }],
                        nodes: [{ line: 5 }]
                    },
                    {
                        fileId: '20',
                        groupId: 1,
                        lines: 20,
                        breakpoints: [{
                            line: 10, data: 'dados html'
                        }],
                        events: [{ line: 12, data: 'dados html' }],
                        nodes: [{ line: 10 }]
                    },
                    {
                        fileId: '50',
                        groupId: 3,
                        lines: 50,
                        breakpoints: [{
                            line: 25, data: 'dados html'
                        }],
                        events: [{ line: 27, data: 'dados html' }],
                        nodes: [{ line: 25 }]
                    },
                    {
                        fileId: '60',
                        groupId: 3,
                        lines: 60,
                        breakpoints: [{
                            line: 30, data: 'dados html'
                        }],
                        events: [{ line: 32, data: 'dados html' }],
                        nodes: [{ line: 30 }]
                    },
                    {
                        fileId: '70',
                        groupId: 3,
                        lines: 70,
                        breakpoints: [{
                            line: 35, data: 'dados html'
                        }],
                        events: [{ line: 37, data: 'dados html' }],
                        nodes: [{ line: 35 }]
                    }],
                    pathnodes: [{ fileId: '10', line: 5 }, { fileId: '20', line: 10 }, { fileId: '50', line: 25 }, { fileId: '60', line: 30 }, { fileId: '70', line: 35 }]
                },
                {
                    files: [{
                        fileId: '100',
                        groupId: 1,
                        lines: 10,
                        breakpoints: [{
                            line: 5, data: 'dados html'
                        }],
                        events: [{ line: 7, data: 'dados html' }],
                        nodes: [{ line: 5 }]
                    }],
                    pathnodes: []
                },
                {
                    files: [{
                        fileId: '5001',
                        groupId: 3,
                        lines: 50,
                        breakpoints: [{
                            line: 25, data: 'dados html'
                        }],
                        events: [{ line: 27, data: 'dados html' }],
                        nodes: [{ line: 25 }]
                    },
                    {
                        fileId: '6001',
                        groupId: 3,
                        lines: 60,
                        breakpoints: [{
                            line: 30, data: 'dados html'
                        }],
                        events: [{ line: 32, data: 'dados html' }],
                        nodes: [{ line: 30 }]
                    },
                    {
                        fileId: '7001',
                        groupId: 3,
                        lines: 70,
                        breakpoints: [{
                            line: 35, data: 'dados html'
                        }],
                        events: [{ line: 37, data: 'dados html' }],
                        nodes: [{ line: 35 }]
                    }],
                    pathnodes: [{ fileId: '5001', line: 25 }, { fileId: '6001', line: 30 }, { fileId: '7001', line: 35 }]
                },
                {
                    files: [{
                        fileId: '1000',
                        groupId: 1,
                        lines: 10,
                        breakpoints: [{
                            line: 5, data: 'dados html'
                        }],
                        events: [{ line: 7, data: 'dados html' }],
                        nodes: [{ line: 5 }]
                    },
                    {
                        fileId: '2000',
                        groupId: 1,
                        lines: 20,
                        breakpoints: [{
                            line: 10, data: 'dados html'
                        }],
                        events: [{ line: 12, data: 'dados html' }],
                        nodes: [{ line: 10 }]
                    },
                    {
                        fileId: '4000',
                        groupId: 2,
                        lines: 40,
                        breakpoints: [{
                            line: 20, data: 'dados html'
                        }],
                        events: [{ line: 22, data: 'dados html' }],
                        nodes: [{ line: 20 }]
                    },
                    {
                        fileId: '5000',
                        groupId: 2,
                        lines: 50,
                        breakpoints: [{
                            line: 25, data: 'dados html'
                        }],
                        events: [{ line: 27, data: 'dados html' }],
                        nodes: [{ line: 25 }]
                    }],
                    pathnodes: [{ fileId: '1000', line: 5 }, { fileId: '2000', line: 10 }, { fileId: '4000', line: 20 }, { fileId: '5000', line: 25 }]
                }],
                groups: [{ groupId: 1, widthQuantity: 3 }, { groupId: 2, widthQuantity: 2 }, { groupId: 3, widthQuantity: 3 }]
            },
            {
                name: 'Project 1 ABC', sessions: [{
                    files: [
                        { groupId: 0, lines: 150, breakpoints: [{ line: 10, data: '<h4>título 10</h4><p>10 lines</p><p>breakpoint</p>' }], events: [] },
                        { fileId: 'b6ffd257', groupId: 0, lines: 160, breakpoints: [], events: [], nodes: [{ line: 30 }] },
                        { fileId: '2d7c', groupId: 1, lines: 170, breakpoints: [], events: [], nodes: [{ line: 50 }, { line: 15 }] },
                        { fileId: '4038', groupId: 1, lines: 140, breakpoints: [], events: [], nodes: [{ line: 60 }] },
                        { groupId: 2, lines: 180, breakpoints: [], events: [] },
                        { groupId: 2, lines: 200, breakpoints: [], events: [] },
                        { fileId: '7f8aeab1cb38', groupId: 2, lines: 130, breakpoints: [], events: [], nodes: [{ line: 40 }] },
                        { groupId: 2, lines: 76, breakpoints: [], events: [] },
                        {
                            groupId: 2, lines: 300, breakpoints: [
                                { line: 20, data: '<h4>título 20</h4><p>20 lines</p><p>breakpoint</p>' }
                            ], events: []
                        },
                        {
                            groupId: 2, lines: 210, breakpoints: [
                                { line: 30, data: '<h4>título 30</h4><p>30 lines</p><p>breakpoint</p>' },
                                { line: 40, data: '<h4>título 40</h4><p>40 lines</p><p>breakpoint</p>' }
                            ], events: []
                        },
                        {
                            groupId: 2, lines: 120, breakpoints: [
                            ], events: [
                                { line: 10, data: '<h4>título 100</h4><p>100 lines</p><p>event</p>' },
                                { line: 30, data: '<h4>título 300</h4><p>300 lines</p><p>event</p>' },
                                { line: 35, data: '<h4>título 350</h4><p>350 lines</p><p>event</p>' },
                            ]
                        },
                        { groupId: 2, lines: 10, breakpoints: [], events: [] },
                        { groupId: 2, lines: 280, breakpoints: [], events: [] },
                        {
                            groupId: 2, lines: 200, breakpoints: [
                                { line: 178, data: '<h4>título 478</h4><p>478 lines</p><p>breakpoint</p>' },
                                { line: 60, data: '<h4>título 510</h4><p>510 lines</p><p>breakpoint</p>' },
                                { line: 65, data: '<h4>título 515</h4><p>515 lines</p><p>breakpoint</p>' },
                            ], events: []
                        },
                        { groupId: 2, lines: 25, breakpoints: [], events: [] },
                        { groupId: 2, lines: 245, breakpoints: [], events: [] },
                        { groupId: 2, lines: 240, breakpoints: [], events: [] },
                        {
                            groupId: 2, lines: 31, breakpoints: [
                                { line: 2, data: '<h4>título 2</h4><p>2 lines</p><p>breakpoint</p>' },
                                { line: 31, data: '<h4>título 31</h4><p>31 lines</p><p>breakpoint</p>' },
                            ], events: []
                        },
                        {
                            groupId: 2, lines: 300, breakpoints: [
                                { line: 210, data: '<h4>título 210</h4><p>210 lines</p><p>breakpoint</p>' },
                                { line: 211, data: '<h4>título 211</h4><p>211 lines</p><p>breakpoint</p>' },
                                { line: 213, data: '<h4>título 213</h4><p>213 lines</p><p>breakpoint</p>' },
                                { line: 235, data: '<h4>título 355</h4><p>355 lines</p><p>breakpoint</p>' },
                            ], events: []
                        },
                        { groupId: 2, lines: 140, breakpoints: [], events: [] },
                        { groupId: 2, lines: 100, breakpoints: [], events: [] },
                    ],
                    pathnodes: [{ fileId: 'b6ffd257', line: 30 }, { fileId: '2d7c', line: 50 }, { fileId: '2d7c', line: 15 }, { fileId: '4038', line: 60 }, { fileId: '7f8aeab1cb38', line: 40 }]
                },
                {
                    files: [
                        { fileId: 'aaa', groupId: 0, lines: 10, breakpoints: [], events: [], nodes: [{ line: 5 }] },
                        { fileId: 'bbb', groupId: 0, lines: 20, breakpoints: [], events: [], nodes: [{ line: 10 }] },
                        { groupId: 0, lines: 20, breakpoints: [], events: [] },
                        { fileId: 'ccc', groupId: 1, lines: 30, breakpoints: [], events: [], nodes: [{ line: 15 }] },
                        { fileId: 'ddd', groupId: 1, lines: 40, breakpoints: [], events: [], nodes: [{ line: 20 }] },
                    ],
                    pathnodes: [{ fileId: 'aaa', line: 5 }, { fileId: 'bbb', line: 10 }, { fileId: 'ccc', line: 15 }, { fileId: 'ddd', line: 20 }]
                },
                {
                    files: [
                        { groupId: 0, lines: 40, breakpoints: [], events: [], nodes: [{ line: 1 }] },
                        { groupId: 0, lines: 45, breakpoints: [{ line: 5, data: '<h4>título 10</h4><p>10 lines</p><p>breakpoint</p>' }], events: [{ line: 5, data: '<h4>título 5</h4><p>5 lines</p><p>event</p>' }], nodes: [{ line: 1 }] },
                        { groupId: 1, lines: 56, breakpoints: [], events: [], nodes: [{ line: 1 }] },
                        { groupId: 1, lines: 54, breakpoints: [], events: [], nodes: [{ line: 1 }] },
                        { groupId: 1, lines: 34, breakpoints: [], events: [], nodes: [{ line: 1 }] },
                        { groupId: 1, lines: 35, breakpoints: [], events: [], nodes: [{ line: 1 }] },
                        { groupId: 3, lines: 15, breakpoints: [], events: [], nodes: [{ line: 1 }] },
                    ], pathnodes: []
                },
                {
                    files: [
                        { groupId: 1, lines: 10, breakpoints: [{ line: 5, data: '<h4>título 10</h4><p>10 lines</p><p>breakpoint</p>' }], events: [], nodes: [{ line: 1 }] },
                        { groupId: 1, lines: 10, breakpoints: [], events: [{ line: 5, data: '<h4>título 5</h4><p>5 lines</p><p>event</p>' }], nodes: [{ line: 1 }] },
                        { groupId: 3, lines: 10, breakpoints: [], events: [], nodes: [{ line: 1 }] },
                    ], pathnodes: []
                }],
                groups: [{ groupId: 0, widthQuantity: 3 }, { groupId: 1, widthQuantity: 4 }, { groupId: 2, widthQuantity: 17 }, { groupId: 3, widthQuantity: 1 }]
            }]
        },
        {
            name: 'User XYZ', projects: [{
                name: 'Project 1 XYZ', sessions: [{
                    files: [{
                        groupId: 0,
                        lines: 300,
                        breakpoints: [],
                        events: [],
                        nodes: []
                    }],
                    pathnodes: []
                }], groups: []
            }]
        },
        {
            name: 'User OKS', projects: [
                {
                    name: 'Project 1 OKS', sessions: [{
                        files: [{
                            groupId: 0,
                            lines: 120,
                            breakpoints: [],
                            events: [],
                            nodes: []
                        }],
                        pathnodes: []
                    }], groups: []
                },
                {
                    name: 'Project 2 OKS', sessions: [
                        {
                            files: [
                                { groupId: 0, lines: 1, breakpoints: [], events: [] },
                                { groupId: 0, lines: 10, breakpoints: [], events: [] },
                                { groupId: 0, lines: 1, breakpoints: [], events: [] },
                                {
                                    groupId: 0, lines: 120, breakpoints: [], events: [
                                        { line: 100, data: '<h4>título 100</h4><p>100 lines</p><p>event</p>' },
                                        { line: 20, data: '<h4>título 20</h4><p>20 lines</p><p>event</p>' },
                                        { line: 50, data: '<h4>título 50</h4><p>50 lines</p><p>event</p>' },
                                    ]
                                },
                            ], pathnodes: []
                        }
                    ],
                    groups: [{ groupId: 0, widthQuantity: 4 }]
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


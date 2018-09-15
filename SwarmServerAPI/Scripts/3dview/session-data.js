var sessionData = (function () {
    var defaultGuid = '8ab5c019-fdf8-4b4f-8c79-286372200417';

    var dataArray = [
        {
            guid: 'a98f0e6a-e632-48b1-9ab1-34c5d85a41ac', name: 'Session Example 1', data: [
                { lines: 150, group: 2, breakpoints: [{ line: 10, data: '<h4>título 10</h4><p>10 lines</p><p>breakpoint</p>' }], events: [] },
                { lines: 160, group: 2, breakpoints: [], events: [], point: { line: 30, fromRef: '', toRef: '8b31e26e-f348-4ff5-9562-4d0094fb9935' } },
                { lines: 170, group: 2, breakpoints: [], events: [], point: { line: 50, fromRef: '129c0aa8-7d24-457d-9d96-867d84d08725', toRef: 'dd6c4382-ec51-413b-b053-5f9c29eb3d53' } },
                { lines: 140, group: 2, breakpoints: [], events: [], point: { line: 60, fromRef: 'dd6c4382-ec51-413b-b053-5f9c29eb3d53', toRef: '' } },
                { lines: 180, group: 2, breakpoints: [], events: [] },
                { lines: 200, group: 2, breakpoints: [], events: [] },
                { lines: 130, group: 2, breakpoints: [], events: [], point: { line: 40, fromRef: '8b31e26e-f348-4ff5-9562-4d0094fb9935', toRef: '129c0aa8-7d24-457d-9d96-867d84d08725' } },
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
            guid: '5a5a2f2c-f8a2-4f4f-98ef-713afb528da3', name: 'Session Example 4', data: [
                { lines: 10, group: 1, breakpoints: [], events: [], point: { line: 5, fromRef: '', toRef: '8b31e26e-f348-4ff5-9562-4d0094fb9935' } },
                { lines: 20, group: 1, breakpoints: [], events: [], point: { line: 10, fromRef: '129c0aa8-7d24-457d-9d96-867d84d08725', toRef: 'dd6c4382-ec51-413b-b053-5f9c29eb3d53' } },
                { lines: 30, group: 1, breakpoints: [], events: [], point: { line: 15, fromRef: 'dd6c4382-ec51-413b-b053-5f9c29eb3d53', toRef: '' } },
                { lines: 40, group: 1, breakpoints: [], events: [], point: { line: 20, fromRef: '8b31e26e-f348-4ff5-9562-4d0094fb9935', toRef: '129c0aa8-7d24-457d-9d96-867d84d08725' } },
            ]
        },
        {
            guid: '8ab5c019-fdf8-4b4f-8c79-286372200417', name: 'Session Example 2', data: [
                { lines: 1, group: 1, breakpoints: [], events: [], point: { line: 1, fromRef: '', toRef: '8b31e26e-f348-4ff5-9562-4d0094fb9935' } },
                { lines: 1, group: 1, breakpoints: [], events: [], point: { line: 1, fromRef: '129c0aa8-7d24-457d-9d96-867d84d08725', toRef: 'dd6c4382-ec51-413b-b053-5f9c29eb3d53' } },
                { lines: 1, group: 1, breakpoints: [], events: [], point: { line: 1, fromRef: 'dd6c4382-ec51-413b-b053-5f9c29eb3d53', toRef: '' } },
                { lines: 1, group: 1, breakpoints: [], events: [], point: { line: 1, fromRef: '8b31e26e-f348-4ff5-9562-4d0094fb9935', toRef: '129c0aa8-7d24-457d-9d96-867d84d08725' } },
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
                {
                    lines: 1000, group: 1, breakpoints: [
                        { line: 1, data: '<h4>título 1 teste</h4>' }
                    ], events: []
                },
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
                {
                    lines: 50, group: 6, breakpoints: [
                        { line: 1, data: '<h4>título 1 teste</h4>' }
                    ], events: []
                },
                {
                    lines: 1, group: 6, breakpoints: [
                        { line: 1, data: '<h4>título 1 teste</h4>' }
                    ], events: []
                },
                {
                    lines: 10, group: 6, breakpoints: [
                        { line: 1, data: '<h4>título 1 teste</h4>' }
                    ], events: []
                },
                { lines: 1, group: 7, breakpoints: [], events: [] },
            ]
        },
        {
            guid: '2ec1fae8-d615-4190-8d7d-3c6d22ea9bec', name: 'Session Example 3', data: [
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
                {
                    lines: 120, group: 11, breakpoints: [], events: [
                        { line: 100, data: '<h4>título 100</h4><p>100 lines</p><p>event</p>' },
                        { line: 20, data: '<h4>título 20</h4><p>20 lines</p><p>event</p>' },
                        { line: 50, data: '<h4>título 50</h4><p>50 lines</p><p>event</p>' },
                    ]
                },
            ]
        },
        {
            guid: 'lk06oiam-e632-48b1-9ab1-35buka091509', name: 'Session Example 5', data: [
                {
                    lines: 402, group: 1, breakpoints: [
                        { line: 200, data: '<h4>título 200</h4><p>200 lines</p><p>breakpoint 35buka091509</p>' },
                        {
                            line: 10, data: '<h4>título 10</h4><p>10 lines</p><p>breakpoint 35buka091509</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida blandit quam ut hendrerit. Duis dictum imperdiet porta. Nunc vestibulum dapibus dolor vel pretium. Praesent at metus nunc. Praesent in magna accumsan, mollis libero non, rutrum metus. Cras at ullamcorper nisl, sollicitudin iaculis eros. Maecenas nibh enim, mattis ornare molestie in, pharetra in dui. Phasellus sagittis leo vel arcu rutrum rutrum ut et dolor. Nulla laoreet aliquet nibh. Nunc semper elit et facilisis facilisis. Praesent venenatis ornare lectus ornare sollicitudin. Morbi id aliquet sapien, eget rutrum arcu. In a feugiat ligula, non hendrerit risus. Duis ornare pharetra malesuada. Etiam euismod nulla eu aliquam tincidunt.Nunc diam magna, vehicula quis massa et, placerat malesuada nisi. Sed ac sodales mi. Donec aliquam mauris eget lacus varius, quis iaculis sem viverra.In in libero sollicitudin, molestie tortor in, mattis magna.Vestibulum nec tristique tortor. Cras id tellus augue. Mauris placerat lorem sodales euismod convallis. Nunc auctor efficitur lectus eu tempor. Pellentesque tincidunt accumsan nisi sit amet accumsan.In tincidunt leo ut ornare tincidunt. Etiam ullamcorper, elit et pretium convallis, eros arcu venenatis metus, nec pretium nibh purus ultricies neque.Phasellus euismod sit amet risus sit amet fermentum. Etiam feugiat diam dolor, eu congue odio gravida eu. Quisque urna diam, eleifend nec vehicula non, vehicula scelerisque felis. Etiam maximus lobortis odio, in eleifend nisi congue sit amet.Suspendisse dolor ligula, pellentesque nec sem id, fringilla sagittis ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras ultricies purus sed magna porta elementum.Maecenas tempus libero metus, id eleifend tellus egestas in. Mauris a sem eget leo dignissim venenatis.Maecenas elementum hendrerit egestas. Etiam sagittis gravida nunc quis congue. Nulla ex nisl, convallis sit amet iaculis et, volutpat vel quam. Praesent tristique felis quis lectus interdum, non vestibulum orci pellentesque.Donec euismod faucibus ante, id vestibulum ante euismod sed. Suspendisse orci erat, aliquam fringilla dui a, vehicula dictum diam. Etiam commodo mollis hendrerit. Praesent in vestibulum lorem, ac convallis augue. Mauris purus odio, placerat ut massa ac, gravida ultrices dui. Donec id dolor augue. Phasellus nec enim accumsan nulla posuere aliquet.Vestibulum dapibus vel leo vel commodo. Integer rhoncus ac ante at maximus. Phasellus varius velit vitae bibendum bibendum. Nam et dui metus.Etiam tempus consequat placerat. Curabitur sit amet turpis in lorem tempor lacinia.Fusce vitae massa diam. Sed vitae enim lacus. Proin elementum nulla ut faucibus posuere. Nam pellentesque purus ex, vel maximus odio porta eu. Morbi scelerisque sapien eget metus vehicula ullamcorper.Suspendisse enim massa, egestas vel semper nec, vehicula ut risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent eget faucibus leo, facilisis elementum enim. Phasellus dui ligula, dignissim a lorem in, condimentum efficitur enim. Vivamus bibendum pulvinar dolor, vel posuere arcu pretium id. Pellentesque sed nisi blandit, placerat nunc et, suscipit nisl.Mauris tortor nisl, blandit ac ipsum vel, malesuada consequat justo. Cras tincidunt eleifend ipsum feugiat porttitor. Ut consequat massa mollis felis laoreet, vel dignissim purus suscipit.Mauris imperdiet libero et rutrum laoreet. Integer ut vulputate elit. Aenean pellentesque sapien sit amet nisl congue aliquam. Phasellus at ligula est. Aenean rutrum non elit at tincidunt.Quisque hendrerit, ligula at dignissim faucibus, nisi justo porttitor tellus, non porttitor nisi odio sit amet nisl. Maecenas convallis vel lectus at consequat. Interdum et malesuada fames ac ante ipsum primis in faucibus.Morbi pellentesque eros metus, ut faucibus nibh imperdiet at. Curabitur vitae sagittis risus. Praesent in nisl id est scelerisque tempus ut ac lectus. Etiam quis sem justo. In varius enim in mauris vehicula, ut lacinia urna laoreet.Vestibulum lobortis vel sem nec luctus. Nunc et lobortis massa. In eu libero est. Mauris ut erat mauris. Quisque sodales bibendum libero, eu accumsan leo lobortis vel. Phasellus dapibus accumsan bibendum. Suspendisse ac blandit libero. Sed mi lacus, maximus non ornare sed, blandit eu risus. In in tincidunt quam. Phasellus elementum nulla non eros pretium, nec dictum nisi dapibus.Praesent convallis aliquet metus, eget pharetra erat tempus vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer in volutpat est, porta pretium erat. Nulla non dignissim mauris. Vivamus vitae sem mauris. Aenean id lorem mauris. Integer ultrices viverra ligula a vestibulum. Quisque lacus diam, viverra in massa eget, ultrices gravida lorem. Sed erat purus, imperdiet vel dui lacinia, suscipit dapibus massa. Suspendisse accumsan tellus at hendrerit scelerisque.Etiam eget orci eu odio tristique malesuada.Nulla facilisi. In at ornare sapien. Quisque viverra tristique mauris, maximus blandit lectus condimentum facilisis. Nulla eleifend tellus quam, ac ultricies urna maximus a. Pellentesque dictum at ante ut aliquet.</p>'
                        }
                    ], events: []
                },
            ]
        },
        {
            guid: '280feb69-b675-4942-ae6b-54f9ca2f8cf2', name: 'Session Example 6', data: [
                {
                    lines: 100, group: 0, breakpoints: [], events: [], point: {
                        line: 10, fromRef: '', toRef: 'ec0dd386-92d0-42fa-97fc-b458c59f3d60'
                    }
                },
                {
                    lines: 100, group: 0, breakpoints: [], events: [], point: {
                        line: 20, fromRef: 'ec0dd386-92d0-42fa-97fc-b458c59f3d60', toRef: 'fc4becdf-7a9f-4fec-b1aa-761a599861d0'
                    }
                },
                {
                    lines: 100, group: 1, breakpoints: [], events: [], point: {
                        line: 30, fromRef: 'fc4becdf-7a9f-4fec-b1aa-761a599861d0', toRef: '1472a443-2b44-48af-a37a-028995671aeb'
                    }
                },
                {
                    lines: 100, group: 1, breakpoints: [], events: [], point: {
                        line: 40, fromRef: '1472a443-2b44-48af-a37a-028995671aeb', toRef: ''
                    },
                },
            ]
        }
    ];

    var getDefault = function () {
        return defaultGuid;
    };

    var setDefault = function (guid) {
        defaultGuid = guid;
    };

    var getData = function () {
        for (var i = 0; i < dataArray.length; i++) {
            if (dataArray[i].guid == defaultGuid)
                return dataArray[i].data;
        }
    };

    var getDataByGuid = function (guid) {
        for (var i = 0; i < dataArray.length; i++) {
            if (dataArray[i].guid == guid)
                return dataArray[i].data;
        }
    };

    var getByGuid = function (guid) {
        for (var i = 0; i < dataArray.length; i++) {
            if (dataArray[i].guid == guid)
                return dataArray[i];
        }
    };

    var getArray = function () {
        var array = [];

        for (var i = 0; i < dataArray.length; i++) {
            array.push(dataArray[i].guid);
        }

        return array;
    };

    return {
        getData: getData,
        getDataByGuid: getDataByGuid,
        getArray: getArray,
        getByGuid: getByGuid,
        getDefault: getDefault,
        setDefault: setDefault
    };

}());


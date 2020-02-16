var tourInstructions = (function () {

    var tour = null;

    var startTour = function () {
        // Instance the tour
        tour = new Tour({
            steps: [
                {
                    element: "#taskproject-list-div",
                    title: "1/4 - Select task",
                    content: "To show the session on the view, first select the task you are woring on."
                },
                {
                    element: "#taskproject-list-div",
                    title: "Close box",
                    content: "Click out of box to close the selector."
                },
                {
                    element: "#user-list-div",
                    title: "2/4 - Select user/developer",
                    content: "Then, select de users/developers that have debugged."
                },
                {
                    element: "#session-list-div",
                    title: "3/4 - Select sessions",
                    content: "Now you have the executed debugging session, select wich one you want to see."
                },
                {
                    element: "#loadview-button",
                    title: "4/4 - Show view",
                    content: "Last step, press here to load the view."
                }
            ],
            template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3><div class='popover-content'></div><div class='popover-navigation'></div><div class='popover-navigation'><button class='btn btn-sm btn-default' data-role='end'>End tour</button></div></div>"
        });

        tour.init();
        tour.restart();
    };

    var goTo = function (position) {
        tour.goTo(position);
    };

    var endTour = function () {
        tour.end();
    };

    return {
        startTour: startTour,
        goTo: goTo,
        endTour: endTour
    };
})();
var tourInstructions = (function () {

    var startTour = function () {
        // Instance the tour
        var tour = new Tour({
            steps: [
                {
                    element: "#taskproject-list-div",
                    title: "Title of my step",
                    content: "Content of my step"
                },
                {
                    element: "#user-list-div",
                    title: "Title of my step",
                    content: "Content of my step"
                }
            ]
        });

        tour.init();
        tour.start(true);
    };

    return {
        startTour: startTour
    };
})();
﻿define([], function () {
    "use strict";

    var logo = "data:image/png;base64,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";

    function Course(id, title, author) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.logo = logo;
        this.objectives = [];
    };

    return Course;
});
﻿define(['knockout', 'Q', 'plugins/router', 'dataContext'], function (ko, Q, router, dataContext) {

    var ViewModel = function () {
        this.objectiveTitle = ko.observable();
        this.pageTitle = ko.observable();
        this.contents = ko.observableArray([]);
    }

    ViewModel.prototype.activate = function (objectiveId, pageId) {
        var
            objective = dataContext.getObjective(objectiveId),
            page = dataContext.getPage(objectiveId, pageId),
            contents = [],
            promises = []
        ;

        this.objectiveTitle(objective.title);
        this.pageTitle(page.title);

        page.contents.forEach(function (content, index) {
            promises.push(content.text().then(function (text) {
                contents[index] = text;
            }));
        });

        var that = this;
        return Q.all(promises).then(function () {
            that.contents(contents);
        });
    }

    return ViewModel;

})
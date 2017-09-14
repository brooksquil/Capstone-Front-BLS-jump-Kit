"use strict";
console.log("pt.history.ctrl.js", "historyCtrl");

app.controller("historyCtrl", function($scope, $window, historyFactory, userFactory, $location) {

    let user = userFactory.getCurrentUser();

    $scope.history = {
        patientId: "",
        uid: user,
        symptoms: "",
        allergies: "",
        medications: "",
        pastIllness: "",
        lastIntake: "",
        eventsTo: "",
        notes: "",
    };

    $scope.submitHistory = function() {
        console.log("you clicked submit history");
        historyFactory.addHistory($scope.history)
            .then((data) => {
                $location.url("/menu");
            });
    };



});
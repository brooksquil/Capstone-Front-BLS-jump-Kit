"use strict";

app.controller('selectPatientCtrl', function($scope, $window, $location, historyFactory, userFactory, patientFactory) {

    $scope.allPatients = [];
    let user = userFactory.getCurrentUser();
    console.log("EMT USER", user);


    const showAllPatients = function() {
        patientFactory.getAllPatients(user)
            .then((allPatients) => {
                console.log("showAllPatients from promise", allPatients);
                $scope.allPatients = allPatients;
            });
    };


    $scope.deletePatient = function(id) {
        patientFactory.deletePatient(id)
            .then((irrelevant) => {
                showAllPatients();
            });
    };
    showAllPatients();
});
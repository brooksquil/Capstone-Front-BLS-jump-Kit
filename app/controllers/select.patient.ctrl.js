"use strict";

app.controller('selectPatientCtrl', function($scope, $window, $location, historyFactory, userFactory, patientFactory, $routeParams) {

    $scope.allPatients = [];
    let user = userFactory.getCurrentUser();
    console.log("EMT USER", user);


    const showAllPatients = function() {
        patientFactory.getAllPatients(user)
            .then((allPatients) => {
                // console.log("showAllPatients from promise", allPatients);
                $scope.allPatients = allPatients;
            });
    };

    let currentPatient = patientFactory.getCurrentPatient();


    $scope.deletePatient = function(uglyId, patientID) {
        // console.log("current Patient ugly Id", uglyId);
        // console.log("PATIENT ID", patientID);
        patientFactory.deletePatient(uglyId)
            .then((data) => {
                historyFactory.getSingleHistory(patientID)
                    .then((singleHistory) => {
                        // console.log("get single HISTORY", singleHistory);
                        historyFactory.deleteHistory(singleHistory.historyId);
                        // resolve and then .then
                    });
                showAllPatients();
            });

    };


    showAllPatients();
});
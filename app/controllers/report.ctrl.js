"use strict";
console.log("reportCtrl");

app.controller("reportCtrl", function($scope, $window, userFactory, patientFactory, $location, historyFactory) {

    //call current patient
    let currentPatient = patientFactory.getCurrentPatient();
    console.log("Patient Id for Get History?", currentPatient);


    //call curent patient history object back from firebase
    $scope.currentPatientHistory = function() {
        console.log("you clicked patient report!!");
        historyFactory.getSingleHistory(currentPatient)
            .then((data) => {
                let thisPatientHistory = data;
                $scope.thisPatientHistory = thisPatientHistory;
                console.log("This one", $scope.thisPatientHistory);
            });
    };
});
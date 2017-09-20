"use strict";
console.log("reportCtrl");

app.controller("reportCtrl", function($scope, $window, userFactory, patientFactory, $location, historyFactory, $routeParams) {

    //call current patient
    let currentPatient = patientFactory.getCurrentPatient();
    console.log("Patient Id for Get History?", currentPatient);


    //call curent patient history object back from firebase
    $scope.currentPatientHistory = function() {
        let patientFromRoute = $routeParams.patientID;
        console.log("test", angular.isUndefined(patientFromRoute));
        let patientReport = angular.isUndefined(patientFromRoute) ? currentPatient : patientFromRoute;

        console.log("THE VALUE", patientReport);
        console.log("you clicked patient report!!");
        historyFactory.getSingleHistory(patientReport)
            .then((data) => {
                console.log("data in report control", data);
                let thisPatientHistory = data;
                $scope.thisPatientHistory = thisPatientHistory;
                console.log("This one", $scope.thisPatientHistory);
            });
    };


    $scope.currentPatientHistory();
});
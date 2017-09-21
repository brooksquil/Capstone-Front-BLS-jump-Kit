"use strict";


app.controller("addPatientCtrl", function($scope, $window, userFactory, patientFactory, $location) {
    // console.log("Are you there?");
    ///////////////////////////////////////
    //ADD PATIENT MODAL STUFF
    ///////////////////////////////////////
    let user = userFactory.getCurrentUser();


    $scope.patient = {
        patientID: "",
        calledFor: "",
        // timeStamp: "", commented until I hook up moment
        uid: user
    };

    $scope.submitPatient = function() {
        console.log("you clicked add patient");
        console.log("patient being added", $scope.patient);
        patientFactory.addPatient($scope.patient)
            .then((data) => {
                $location.url("/menu");
            });
    };
});
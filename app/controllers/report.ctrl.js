"use strict";
console.log("reportCtrl");

app.controller("reportCtrl", function($scope, $window, userFactory, patientFactory, $location, historyFactory) {

    //call current patient
    let patientId = patientFactory.getCurrentPatient();
    console.log("Patient Id for Get History?", patientId);


    //call curent patient history object back from firebase
    $scope.patientHistory = function() {
        console.log("you clicked patient report!!");
        historyFactory.getSingleHistory(patientId)
            .then((data) => {
                console.log(data);
                // return data;
            });
    };
});

// $scope.submitHistory = function() {
//     console.log("you clicked submit history");
//     console.log("Symptoms", $scope.history.symptoms);
//     historyFactory.addHistory($scope.history)
//         .then((data) => {
//             $location.url("/menu");
//         });
// };
"use strict";
console.log("pt.history.ctrl.js", "historyCtrl");

app.controller("historyCtrl", function($scope, $window, $location, historyFactory, userFactory) {

    ////////////////////////////////
    //HISTORY DROPDOWN ARRAYS
    ////////////////////////////////
    $scope.symptoms = ["Not Applicable", "Vomiting", "Nausea", "Dizziness", "Shortness of Breath", "Pain"];
    $scope.allergies = ["No Allergies", "Environmental", "Medications(note)", "Latex", "Other"];
    $scope.medications = ["None", "Unknown", "Asprin", "Acetominophen", "Buspar", "Cumidin", "Insulin", "Warfarin"];
    $scope.pastIllness = ["None", "Unknown", "Diabetes", "Cancer", "HIV", "Hepatitis", "CVA", "CAD", "Cardiac", "Pneumonia", "COPD"];
    $scope.lastIntake = ["Unknown", "Less than 1 Hour", "1 Hours", "2 Hours", "3 Hours", "4 Hours", "5 Hours", "6 Hours", "7 Hours", "8 Hours", "9 Hours", "10 Hours", "11 Hours", " 12+ Hours"];
    $scope.eventsTo = ["Unknown", "Physical Activity", "On Waking", "On Eating", "On Drinking", "Drug Use", "Alcohol Use"];

    //////////////////////////////
    //Add History Object to FB
    //////////////////////////////
    let user = userFactory.getCurrentUser();

    $scope.history = {
        uid: user,
        // patientId: patient,
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
        console.log("Symptoms", $scope.history.symptoms);
        historyFactory.addHistory($scope.history)
            .then((data) => {
                $location.url("/menu");
            });
    };



});
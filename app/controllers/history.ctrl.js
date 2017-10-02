"use strict";
// console.log("pt.history.ctrl.js", "historyCtrl");

app.controller("historyCtrl", function($scope, $window, $location, historyFactory, userFactory, patientFactory) {

    ////////////////////////////////
    //HISTORY DROPDOWN ARRAYS
    ////////////////////////////////
    $scope.symptoms = [];
    console.log("symptoms array", $scope.symptoms);
    $scope.symptomsOptions = [{ id: 1, label: "Not Applicable" }, { id: 2, label: "Vomiting" }, { id: 3, label: "Nausea" }, { id: 4, label: "Dizziness" }, { id: 5, label: "Shortness of Breath" }, { id: 6, label: "Pain" }, { id: 7, label: "Injury" }, { id: 8, label: "Bleeding" }, { id: 9, label: "Seizure" }, { id: 10, label: "Syncopy" }, { id: 11, label: "Psych" }, { id: 12, label: "Chest Pain" }, { id: 13, label: "Hemmoraging" }, { id: 14, label: "Pregancy/Labor" }];
    $scope.searchSelectAllSettings = { enableSearch: true, showSelectAll: true, keyboardControls: true };

    $scope.allergies = ["No Allergies", "Unknown", "Environmental", "Medications(note)", "Food(note)", "Latex", "Other", "Adhesive"];
    $scope.medications = ["None", "Unknown", "Aspirin", "Acetominophen", "Buspar", "Cumidin", "Insulin", "Warfarin", "Abilify", "Nexium", "Humira", "Crestor", "Advair Diskus,", "Remicade", "Cymbalta", "Copaxone", "Lantus", "Januvia", "Lyrica", "Oxycontin", "Celebrex", "Herceptin", "Namenda", "Symbicort", "Suboxone", "Seroquel", "Viagra", "Cialis", "Flovent", "Lunesta", "Betaseron", "Simvastatin", "Omeprazole", "Metformin", "Plavix", "Prozac", "Zoloft", "Phenobarbitol", "Depakote"];
    $scope.pastIllness = ["None", "Unknown", "Diabetes", "Cancer", "HIV", "Hepatitis", "CVA", "CAD", "Cardiac", "Hypertension", "Pneumonia", "COPD", "Asthma", "Amputation", "Renal Failure", "Depression"];
    $scope.lastIntake = ["Unknown", "Less than 1 Hour", "1 Hours", "2 Hours", "3 Hours", "4 Hours", "5 Hours", "6 Hours", "7 Hours", "8 Hours", "9 Hours", "10 Hours", "11 Hours", " 12+ Hours"];
    $scope.eventsTo = ["Unknown", "Physical Activity", "Waking", "Eating", "Drinking", "Drug Use", "Alcohol Use", "MVA", "Trauma"];

    //////////////////////////////
    //Add History Object to FB
    //////////////////////////////
    let user = userFactory.getCurrentUser();
    let patientId = patientFactory.getCurrentPatient();
    // console.log("Patient Id?", patientId);

    $scope.history = {
        uid: user,
        patientId: patientId,
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
        // console.log("Symptoms", $scope.history.symptoms);
        historyFactory.addHistory($scope.history)
            .then((data) => {
                // console.log("submit history data:", data.data.name);
                $scope.history.symptoms = $scope.symptoms;
                $scope.history.historyId = data.data.name;
                historyFactory.editHistory(data.data.name, $scope.history);
                $location.url("/menu");
            });
    };



});
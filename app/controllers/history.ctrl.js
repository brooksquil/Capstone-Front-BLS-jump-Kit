"use strict";
// console.log("pt.history.ctrl.js", "historyCtrl");

app.controller("historyCtrl", function($scope, $window, $location, historyFactory, userFactory, patientFactory) {

    ////////////////////////////////
    //HISTORY DROPDOWN ARRAYS
    ////////////////////////////////

    //SYMPTOMS
    $scope.symptoms = [];
    console.log("symptoms array", $scope.symptoms);
    $scope.symptomsOptions = [{ id: 1, label: "Not Applicable" }, { id: 2, label: "Vomiting" }, { id: 3, label: "Nausea" }, { id: 4, label: "Dizziness" }, { id: 5, label: "Shortness of Breath" }, { id: 6, label: "Pain" }, { id: 7, label: "Injury" }, { id: 8, label: "Bleeding" }, { id: 9, label: "Seizure" }, { id: 10, label: "Syncopy" }, { id: 11, label: "Psych" }, { id: 12, label: "Chest Pain" }, { id: 13, label: "Hemmoraging" }, { id: 14, label: "Pregancy/Labor" }, { id: 15, label: "AMS" }];
    $scope.searchSelectAllSettings = { enableSearch: true, showSelectAll: true, keyboardControls: true, scrollableHeight: '250px', scrollable: true };

    //ALLERGIES
    $scope.allergies = [];
    console.log("allergies array", $scope.allergies);
    $scope.allergiesOptions = [{ id: 1, label: "No Allergies" }, { id: 2, label: "Unknown" }, { id: 3, label: "Medications(note)" }, { id: 4, label: "Environmental" }, { id: 5, label: "Food(note)" }, { id: 6, label: "Latex" }, { id: 7, label: "Adhesive" }, { id: 8, label: "Cat/Dog" }, { id: 9, label: "Other(note)" }];
    $scope.searchSelectAllSettings = { enableSearch: true, showSelectAll: true, keyboardControls: true, scrollableHeight: '250px', scrollable: true };
    //MEDICATIONS
    $scope.medications = [];
    console.log("medications array", $scope.medications);
    $scope.medicationsOptions = [{ id: 1, label: "None" }, { id: 2, label: "Unknown" }, { id: 3, label: "Aspirin" }, { id: 4, label: "Acetominophen" }, { id: 5, label: "Buspar" }, { id: 6, label: "Cumidin" }, { id: 7, label: "Insulin" }, { id: 8, label: "Warfarin" }, { id: 9, label: "Abilify" }, { id: 10, label: "Nexium" }, { id: 11, label: "Humira" }, { id: 12, label: "Crestor" }, { id: 13, label: "Advair Diskus" }, { id: 14, label: "Remicade" }, { id: 15, label: "Cymbalta" }, { id: 16, label: "Copaxone" }, { id: 17, label: "Lantus" }, { id: 18, label: "Januvia" }, { id: 19, label: "Lyrica" }, { id: 20, label: "Oxycontin" }, { id: 21, label: "Celebrex" }, { id: 22, label: "Herceptin" }, { id: 23, label: "Namenda" }, { id: 24, label: "Symbicort" }, { id: 25, label: "Suboxone" }, { id: 26, label: "Seroquel" }, { id: 27, label: "Viagra" }, { id: 28, label: "Cialis" }, { id: 29, label: "Flovent" }, { id: 30, label: "Lunesta" }, { id: 31, label: "Betaseron" }, { id: 32, label: "Simvastatin" }, { id: 33, label: "Omeprazole" }, { id: 34, label: "Metformin" }, { id: 35, label: "Plavix" }, { id: 36, label: "Prozac" }, { id: 37, label: "Zoloft" }, { id: 38, label: "Phenobarbitol" }, { id: 39, label: "Depakote" }];
    $scope.searchSelectAllSettings = { enableSearch: true, showSelectAll: true, keyboardControls: true, scrollableHeight: '400px', scrollable: true };

    //PAST ILLNESS
    $scope.pastIllness = [];
    console.log("pastIllness array", $scope.pastIllness);
    $scope.pastIllnessOptions = [{ id: 1, label: "None" }, { id: 2, label: "Unknown" }, { id: 3, label: "Diabetes" }, { id: 4, label: "Cancer" }, { id: 5, label: "HIV" }, { id: 6, label: "Hepatitis" }, { id: 7, label: "CVA" }, { id: 8, label: "CAD" }, { id: 9, label: "Cardiac" }, { id: 10, label: "Hypertension" }, { id: 11, label: "Pneumonia" }, { id: 12, label: "COPD" }, { id: 13, label: "Asthma" }, { id: 14, label: "Amputation" }, { id: 15, label: "Renal Failure" }, { id: 14, label: "Depression" }, { id: 14, label: "Psych (note)" }, { id: 16, label: "Other (note)" }, { id: 17, label: "Surgical History (note)" }, { id: 18, label: "Disability (note)" }, { id: 19, label: "Bleeding Disorder" }];
    $scope.searchSelectAllSettings = { enableSearch: true, showSelectAll: true, keyboardControls: true, scrollableHeight: '250px', scrollable: true };

    //LAST ORAL INTAKE
    $scope.lastIntake = [];
    console.log("lastIntake array", $scope.lastIntake);
    $scope.lastIntakeOptions = [{ id: 1, label: "Unknown" }, { id: 2, label: "Less than 1 Hour" }, { id: 3, label: "1 Hour" }, { id: 4, label: "2 Hours" }, { id: 5, label: "3 Hours" }, { id: 6, label: "4 Hours" }, { id: 7, label: "5 Hours" }, { id: 8, label: "6 Hours" }, { id: 9, label: "7 Hours" }, { id: 10, label: "8 Hours" }, { id: 11, label: "9 Hours" }, { id: 12, label: "10 Hours" }, { id: 13, label: "11 Hours" }, { id: 14, label: "12+ Hours" }];
    $scope.searchSelectAllSettings = { enableSearch: true, showSelectAll: true, keyboardControls: true, scrollableHeight: '250px', scrollable: true };

    //EVENTS LEADING TO CALL
    $scope.eventsTo = [];
    console.log("eventsTo array", $scope.eventsTo);
    $scope.eventsToOptions = [{ id: 1, label: "Unknown" }, { id: 2, label: "Physical Activity" }, { id: 3, label: "Waking" }, { id: 4, label: "Eating" }, { id: 5, label: "Drug Use" }, { id: 6, label: "Alcohol Use" }, { id: 7, label: "MVA" }, { id: 8, label: "Fall < 20 Feet" }, { id: 9, label: "Fall > 20 Feet" }];
    $scope.searchSelectAllSettings = { enableSearch: true, showSelectAll: true, keyboardControls: true, scrollableHeight: '250px', scrollable: true };
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
                $scope.history.allergies = $scope.allergies;
                $scope.history.medications = $scope.medications;
                $scope.history.pastIllness = $scope.pastIllness;
                $scope.history.lastIntake = $scope.lastIntake;
                $scope.history.eventsTo = $scope.eventsTo;
                $scope.history.historyId = data.data.name;
                historyFactory.editHistory(data.data.name, $scope.history);
                $location.url("/menu");
            });
    };



});
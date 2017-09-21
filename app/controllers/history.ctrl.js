"use strict";
// console.log("pt.history.ctrl.js", "historyCtrl");

app.controller("historyCtrl", function($scope, $window, $location, historyFactory, userFactory, patientFactory) {

    ////////////////////////////////
    //HISTORY DROPDOWN ARRAYS
    ////////////////////////////////
    $scope.symptoms = ["Not Applicable", "Vomiting", "Nausea", "Dizziness", "Shortness of Breath", "Pain", "Injury", "Bleeding", "Seizure", "Syncopy", "Psych"];
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
                $scope.history.historyId = data.data.name;
                historyFactory.editHistory(data.data.name, $scope.history);
                $location.url("/menu");
            });
    };



});
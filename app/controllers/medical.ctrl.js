"use strict";
// console.log("pt.history.ctrl.js", "historyCtrl");

app.controller("medicalCtrl", function($scope, $window, $location, historyFactory, userFactory, patientFactory, medicalFactory) {

    ////////////////////////////////
    //MEDICAL DROPDOWN ARRAYS
    ////////////////////////////////

    //ONSET
    $scope.onset = [];
    console.log("onset array", $scope.onset);
    $scope.onsetOptions = [{ id: 1, label: "Active" }, { id: 2, label: "Inactive" }, { id: 3, label: "Stressed" }, { id: 4, label: "Sudden" }, { id: 5, label: "Gradual" }, { id: 6, label: "Chronic" }];
    $scope.searchSelectAllSettings = { enableSearch: true, showSelectAll: true, keyboardControls: true, scrollableHeight: '250px', scrollable: true };


    //PROVOCATION
    $scope.provocation = [];
    console.log("provocation array", $scope.provocation);
    $scope.provocationOptions = [{ id: 1, label: "Movement" }, { id: 2, label: "Pressure" }, { id: 3, label: "Touch" }, { id: 4, label: "Sitting" }, { id: 5, label: "Standing" }, { id: 6, label: "Supine" }, { id: 7, label: "Activity" }, { id: 8, label: "Inactivity" }];
    $scope.searchSelectAllSettings = { enableSearch: true, showSelectAll: true, keyboardControls: true, scrollableHeight: '250px', scrollable: true };

    //QUALITY
    $scope.quality = [];
    console.log("quality array", $scope.quality);
    $scope.qualityOptions = [{ id: 1, label: "None" }, { id: 2, label: "Sharp" }, { id: 3, label: "Dull" }, { id: 4, label: "Crushing" }, { id: 5, label: "Burning" }, { id: 6, label: "Tearing" }, { id: 7, label: "Intermittent" }, { id: 8, label: "Constant" }, { id: 9, label: "Throbbing" }, { id: 10, label: "Chronic" }];
    $scope.searchSelectAllSettings = { enableSearch: true, showSelectAll: true, keyboardControls: true, scrollableHeight: '250px', scrollable: true };

    //RADIATION
    $scope.radiation = [];
    console.log("radiation array", $scope.radiation);
    $scope.radiationOptions = [{ id: 1, label: "None" }, { id: 2, label: "Left Arm" }, { id: 3, label: "Right Arm" }, { id: 4, label: "Left Leg" }, { id: 5, label: "Right Leg" }, { id: 6, label: "Upper Abdomen" }, { id: 7, label: "Lower Abdomen" }, { id: 8, label: "Buttocks" }, { id: 9, label: "Groin" }, { id: 10, label: "Lower Back" }, { id: 11, label: "Upper Back" }, { id: 12, label: "Neck" }];
    $scope.searchSelectAllSettings = { enableSearch: true, showSelectAll: true, keyboardControls: true, scrollableHeight: '250px', scrollable: true };

    //SEVERITY
    $scope.severity = [];
    console.log("severity array", $scope.severity);
    $scope.severityOptions = [{ id: 1, label: "0 || No Pain" }, { id: 2, label: "1" }, { id: 3, label: "2 || Annoying" }, { id: 4, label: "3" }, { id: 5, label: "4 || Uncomfortable" }, { id: 6, label: "5" }, { id: 7, label: "6 || Dreadful" }, { id: 8, label: "7" }, { id: 9, label: "8 || Unbearable" }, { id: 10, label: "9" }, { id: 11, label: "10 || Agonizing" }];
    $scope.searchSelectAllSettings = { enableSearch: true, showSelectAll: true, keyboardControls: true, scrollableHeight: '250px', scrollable: true };

    //TIME
    $scope.time = [];
    console.log("time array", $scope.time);
    $scope.timeOptions = [{ id: 1, label: "Just Before Call" }, { id: 2, label: "Less Than 1 Hour" }, { id: 3, label: "More Than 1 Hour " }, { id: 4, label: "2 Hours" }, { id: 5, label: "3 Hours" }, { id: 6, label: "4 Hours" }, { id: 7, label: "5 Hours" }, { id: 8, label: "6 Hours" }, { id: 9, label: "12 Hours" }, { id: 10, label: "1 Day" }, { id: 11, label: "More Than 1 day" }, { id: 12, label: "Change in Symptoms (Note)" }, { id: 13, label: "Reoccurence (Note)" }];
    $scope.searchSelectAllSettings = { enableSearch: true, showSelectAll: true, keyboardControls: true, scrollableHeight: '250px', scrollable: true };

    //////////////////////////////
    //Add History Object to FB
    //////////////////////////////
    let user = userFactory.getCurrentUser();
    let patientId = patientFactory.getCurrentPatient();
    // console.log("Patient Id?", patientId);

    $scope.medical = {
        uid: user,
        patientId: patientId,
        onset: "",
        provocation: "",
        quality: "",
        radiation: "",
        severity: "",
        time: "",
        notes: "",
    };

    $scope.submitMedical = function() {
        console.log("you clicked submit medical");
        // console.log("Medical", $scope.medical.onset);
        medicalFactory.addMedical($scope.medical)
            .then((data) => {
                // console.log("submit history data:", data.data.name);
                $scope.medical.onset = $scope.onset;
                $scope.medical.provocation = $scope.provocation;
                $scope.medical.quality = $scope.quality;
                $scope.medical.radiation = $scope.radiation;
                $scope.medical.severity = $scope.severity;
                $scope.medical.time = $scope.time;
                $scope.medical.medicalId = data.data.name;
                medicalFactory.editMedical(data.data.name, $scope.medical);
                $location.url("/menu");
            });
    };



});
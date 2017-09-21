"use strict";
// console.log("Patient factory file");

app.factory("patientFactory", function($q, $http, FBCreds) {

    let currentPatientId = null;


    const getAllPatients = function(user) {
        let patients = [];
        // console.log("url is", `${FBCreds.databaseURL}/patients.json?orderBy="uid"&equalTo="${user}"`);
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/patients.json?orderBy="uid"&equalTo="${user}"`)
                .then((itemObject) => {
                    let patientCollection = itemObject.data;
                    // console.log("patient Collection", patientCollection);
                    Object.keys(patientCollection).forEach((key) => {
                        patientCollection[key].id = key;
                        patients.push(patientCollection[key]);
                    });
                    resolve(patients);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };


    const addPatient = function(obj) {
        let newObj = JSON.stringify(obj);
        // console.log("obj.patientId", obj.patientID);
        currentPatientId = obj.patientID;
        return $http.post(`${FBCreds.databaseURL}/patients.json`, newObj)
            .then((data) => {
                // console.log("data", data);
                return data;
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });

    };


    const getCurrentPatient = function() {
        return currentPatientId;
    };

    const deletePatient = function(id) {
        // console.log("id", id);
        return $q((resolve, reject) => {
            $http.delete(`${FBCreds.databaseURL}/patients/${id}.json`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };


    const getSinglePatientid = function(passedId) {
        // console.log("passedId", passedId);
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/patients.json?orderBy="patientId"&equalTo="${passedId}"`)
                .then((patient) => {
                    // console.log("patient id object", patient);
                    let singlePatientObj = patient;
                    $scope.singlePatientObj = singlePatientObj;
                    // console.log("scoped obj", $scope.singlePatientObj);
                    resolve($scope.singlePatientObj);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    return { getAllPatients, addPatient, deletePatient, getCurrentPatient };
});
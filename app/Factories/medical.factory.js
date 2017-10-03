"use strict";
// console.log("History factory file");

app.factory("medicalFactory", function($q, $http, FBCreds) {

    const getAllMedical = function(patientId) {
        let medical = [];
        // console.log("url is", `${FBCreds.databaseURL}/medical.json?orderBy="uid"&equalTo="${patientId}"`);
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/medical.json?orderBy="uid"&equalTo="${patientId}"`)
                .then((itemObject) => {
                    let medicalCollection = itemObject.data;
                    // console.log("patient Collection", historyCollection);
                    Object.keys(medicalCollection).forEach((key) => {
                        medicalCollection[key].id = key;
                        medical.push(medicalCollection[key]);
                    });
                    resolve(medical);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const addMedical = function(obj) {
        let newObj = JSON.stringify(obj);
        return $http.post(`${FBCreds.databaseURL}/medical.json`, newObj)
            .then((data) => {
                // console.log("add history data", data);
                return data;
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
    };

    const deleteMedical = function(id) {
        // console.log("history factory id", id);
        return $q((resolve, reject) => {
            $http.delete(`${FBCreds.databaseURL}/medical/${id}.json`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };


    const editMedical = function(id, obj) {
        return $q((resolve, reject) => {
            // stringify and strips out angular meta data
            let stringObject = angular.toJson(obj);
            $http.patch(`${FBCreds.databaseURL}/medical/${id}.json`, stringObject)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const getSingleMedical = function(currentPatient) {
        // console.log("get single history", currentPatient);
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/medical.json?&orderBy="patientId"&equalTo="${currentPatient}"`)
                .then((itemObj) => {
                    let singleMedical = itemObj.data;
                    // console.log("item object single medical", singleMedical);
                    resolve(singleMedical[Object.keys(singleMedical)[0]]);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    return { getAllMedical, addMedical, deleteMedical, getSingleMedical, editMedical };
});
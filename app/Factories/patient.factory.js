"use strict";
console.log("Patient factory file");

app.factory("patientFactory", function($q, $http, FBCreds) {

    const getAllPatients = function(user) {
        let patients = [];
        console.log("url is", `${FBCreds.databaseURL}/patients.json?orderBy="uid"&equalTo="${user}"`);
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/patients.json?orderBy="uid"&equalTo="${user}"`)
                .then((itemObject) => {
                    let patientCollection = itemObject.data;
                    console.log("patient Collection", patientCollection);
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
        return $http.post(`${FBCreds.databaseURL}/patients.json`, newObj)
            .then((data) => {
                console.log("data", data);
                return data;
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
    };

    const deletePatient = function(id) {
        return $q((resolve, reject) => {
            $http.delete(`${FBCreds.databaseURL}/patient/${id}.json`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const getSinglePatient = function(itemId) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/patients/${itemId}.json`)
                .then((itemObj) => {
                    resolve(itemObj.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    return { getAllPatients, addPatient, deletePatient, getSinglePatient };
});
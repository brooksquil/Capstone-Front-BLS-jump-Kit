"use strict";
console.log("History factory file");

app.factory("historyFactory", function($q, $http, FBCreds) {

    const getAllHistory = function(patientId) {
        let history = [];
        console.log("url is", `${FBCreds.databaseURL}/history.json?orderBy="uid"&equalTo="${patientId}"`);
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/history.json?orderBy="uid"&equalTo="${patientId}"`)
                .then((itemObject) => {
                    let historyCollection = itemObject.data;
                    console.log("patient Collection", historyCollection);
                    Object.keys(historyCollection).forEach((key) => {
                        historyCollection[key].id = key;
                        history.push(historyCollection[key]);
                    });
                    resolve(history);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const addHistory = function(obj) {
        let newObj = JSON.stringify(obj);
        return $http.post(`${FBCreds.databaseURL}/history.json`, newObj)
            .then((data) => {
                console.log("data", data);
                return data;
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
    };

    const deleteHistory = function(id) {
        return $q((resolve, reject) => {
            $http.delete(`${FBCreds.databaseURL}/history/${id}.json`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const getSingleHistory = function(itemId) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/history/${itemId}.json`)
                .then((itemObj) => {
                    resolve(itemObj.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    return { getAllHistory, addHistory, deleteHistory, getSingleHistory };
});
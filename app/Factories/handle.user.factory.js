"use strict";
// console.log("handle users factory file");

app.factory("handleUserFactory", function($q, $http, FBCreds) {

    const getAllUsers = function(user) {
        let users = [];
        // console.log("url is", `${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${user}"`);
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${user}"`)
                .then((itemObject) => {
                    let userCollection = itemObject.data;
                    // console.log("user Collection", userCollection);
                    Object.keys(userCollection).forEach((key) => {
                        userCollection[key].id = key;
                        users.push(userCollection[key]);
                    });
                    resolve(users);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const addNewUser = function(obj) {
        let newObj = JSON.stringify(obj);
        return $http.post(`${FBCreds.databaseURL}/users.json`, newObj)
            .then((data) => {
                // console.log("data", data);
                return data;
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
    };

    const deleteUser = function(id) {
        return $q((resolve, reject) => {
            $http.delete(`${FBCreds.databaseURL}/users/${id}.json`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const getSingleUser = function(itemId) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/users/${itemId}.json`)
                .then((itemObj) => {
                    resolve(itemObj.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    return { getAllUsers, addNewUser, deleteUser, getSingleUser };
});
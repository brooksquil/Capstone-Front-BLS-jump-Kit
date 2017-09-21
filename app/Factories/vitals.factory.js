// "use strict";
// // console.log("History factory file");

// app.factory("vitalsFactory", function($q, $http, FBCreds) {

//     const getAllVitals = function(patientId) {
//         let vitals = [];
//         console.log("url is", `${FBCreds.databaseURL}/vitals.json?orderBy="uid"&equalTo="${patientId}"`);
//         return $q((resolve, reject) => {
//             $http.get(`${FBCreds.databaseURL}/vitals.json?orderBy="uid"&equalTo="${patientId}"`)
//                 .then((itemObject) => {
//                     let vitalsCollection = itemObject.data;
//                     console.log("patient Collection", vitalsCollection);
//                     Object.keys(vitalsCollection).forEach((key) => {
//                         vitalsCollection[key].id = key;
//                         vitals.push(vitalsCollection[key]);
//                     });
//                     resolve(vitals);
//                 })
//                 .catch((error) => {
//                     reject(error);
//                 });
//         });
//     };

//     const addVitals = function(obj) {
//         let newObj = JSON.stringify(obj);
//         return $http.post(`${FBCreds.databaseURL}/vitals.json`, newObj)
//             .then((data) => {
//                 console.log("add VITALS data", data);
//                 return data;
//             }, (error) => {
//                 let errorCode = error.code;
//                 let errorMessage = error.message;
//                 console.log("error", errorCode, errorMessage);
//             });
//     };

//     const deleteVitals = function(id) {
//         console.log("VITALS factory id", id);
//         return $q((resolve, reject) => {
//             $http.delete(`${FBCreds.databaseURL}/vitals/${id}.json`)
//                 .then((response) => {
//                     resolve(response);
//                 })
//                 .catch((error) => {
//                     reject(error);
//                 });
//         });
//     };


//     const editVitals = function(id, obj) {
//         return $q((resolve, reject) => {
//             // stringify and strips out angular meta data
//             let stringObject = angular.toJson(obj);
//             $http.patch(`${FBCreds.databaseURL}/vitals/${id}.json`, stringObject)
//                 .then((response) => {
//                     resolve(response);
//                 })
//                 .catch((error) => {
//                     reject(error);
//                 });
//         });
//     };

//     const getSingleVitals = function(currentPatient) {
//         console.log("get single history", currentPatient);
//         return $q((resolve, reject) => {
//             $http.get(`${FBCreds.databaseURL}/vitals.json?&orderBy="patientId"&equalTo="${currentPatient}"`)
//                 .then((itemObj) => {
//                     let singleVitals = itemObj.data;
//                     console.log("item object single history", singleVitals);
//                     resolve(singleVitals[Object.keys(singleVitals)[0]]);
//                 })
//                 .catch((error) => {
//                     reject(error);
//                 });
//         });
//     };

//     return { getAllVitals, addVitals, deleteVitals, getSingleVitals, editVitals };
// });
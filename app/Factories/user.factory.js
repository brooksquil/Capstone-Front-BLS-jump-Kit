"use strict";
// console.log("user factory");

app.factory("userFactory", function($q, $http) {

    let currentUser = null;
    let addNewUserObj = [];

    const isAuthenticated = function() {
        // console.log("userFactory: isAuthentcated");
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    currentUser = user.uid;
                    addNewUserObj.push({
                        userEmail: user.email
                    });
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    };

    const getCurrentUser = function() {
        return currentUser;
    };

    const logIn = function(userObj) {
        return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
    };

    const logOut = function() {
        console.log("log out user");
        return firebase.auth().signOut();
    };

    const register = function(userObj) {
        return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
    };

    let provider = new firebase.auth.GoogleAuthProvider();

    let authWithProvider = function() {
        return firebase.auth().signInWithPopup(provider);
    };

    return { getCurrentUser, logIn, logOut, register, isAuthenticated, authWithProvider };
});
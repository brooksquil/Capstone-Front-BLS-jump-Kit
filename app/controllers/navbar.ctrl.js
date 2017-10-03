"use strict";

app.controller("navCtrl", function($scope, $window, userFactory, $apply, $location) {

    $scope.isLoggedIn = false;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.isLoggedIn = true;
            // console.log("currentUser logged in?", user);
            console.log("logged in t-f", $scope.isLoggedIn);
            // $scope.apply();
        } else {
            $scope.isLoggedIn = false;
            console.log("user logged in?", $scope.isLoggedIn);
            $location.url("/");
        }
    });






});
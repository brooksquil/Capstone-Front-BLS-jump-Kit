"use strict";

const app = angular.module("jump-kit", ['ngRoute']);

let isAuth = (userFactory) => new Promise((resolve, reject) => {
    console.log("isAuth is", userFactory);
    userFactory.isAuthenticated()
        .then((userIs) => {
            if (userIs) {
                console.log("yup, go ahead");
                resolve();
            } else {
                reject();
            }
        });
});

app.config(($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/loggedout.html',
            controller: 'authCtrl'
        })
        .when('/profile', {
            templateUrl: 'partials/user.profile.html',
            controller: 'profileCtrl',
            resolve: { isAuth }
        })
        //do I need to put partial here for modal to add patient?
        .when('/menu', {
            templateUrl: 'partials/menu.html',
            controller: 'menuCtrl',
            resolve: { isAuth }
        })
        .when('/menu/history', {
            templateUrl: 'partials/pt.history.html',
            controller: 'historyCtrl',
            resolve: { isAuth }
        })
        .when('/menu/report', {
            templateUrl: 'partials/patient.report.html',
            controller: 'reportCtrl',
            resolve: { isAuth }
        })
        .otherwise('/profile');
});

// not done, not yet sure of routing or if modals need to be routed in

/////////////////////////////////////////////////////
//Firebase Initialize and config fb object for login
/////////////////////////////////////////////////////

app.run(($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    };

    firebase.initializeApp(authConfig);
});

app.run(function($rootScope) {
    $rootScope.showSearch = false;
});
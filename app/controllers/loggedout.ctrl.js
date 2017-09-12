"use strict";
console.log("loggedout.ctrl.js", "authCtrl");

app.controller("authCtrl", function($scope, $window, userFactory, $location) {

    console.log("they all float down here");

    $scope.account = {
        email: "",
        password: ""
    };

    $scope.register = () => {
        console.log("you registered");
        userFactory.register({
                email: $scope.account.email,
                password: $scope.account.password
            })
            .then((userData) => {
                console.log("User Controller", userData);
                $scope.logIn();
            }, (error) => {
                console.log("error creating user", error);
            });
    };

    $scope.logIn = () => {
        userFactory.logIn($scope.account)
            .then(() => {
                $window.location.href = "#!/user-profile";
            });
    };

    let logout = () => {
        console.log("logout clicked");
        userFactory.logOut()
            .then(function() {
                console.log("logged out!");
            }, function(error) {
                console.log("error on logout");
            });
    };

    $scope.loginGoogle = () => {
        console.log("you clicked google login");

        userFactory.authWithProvider()
            .then((result) => {
                let user = result.user.uid;
                $location.path("/user-profile");
                $scope.apply();
            }).catch((error) => {
                console.log("google login error");
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("errors", errorCode, errorMessage);
            });
    };

    $scope.isLoggedIn = false;

    $scope.logout = () => {
        userFactory.logOut();
    };

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.isLoggedIn = true;
            console.log("currentUser logged in?", user);
            console.log("logged in t-f", $scope.isLoggedIn);
            $scope.$apply();
        } else {
            $scope.isLoggedIn = false;
            console.log("user logged in?", $scope.isLoggedIn);
            $window.location.href = "#!/login";
        }
    });

});
"use strict";
console.log("loggedout.ctrl.js", "authCtrl");

app.controller("authCtrl", function($scope, $window, userFactory, $location, handleUserFactory) {

    console.log("authCtrl, they all float down here");


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

    //////////////////////////
    //REGISTER NEW USER
    //////////////////////////
    let user = userFactory.getCurrentUser();

    $scope.newUser = {
        email: "",
        // nationalCert: "",
        // stateCert: "",
        // cprCert: "",
        // level: "",
        // timeStamp: "", commented until I hook up moment
        uid: user
    };

    $scope.submitUser = function() {
        console.log("you clicked add register");
        console.log("newuser", $scope.newUser);
        handleUserFactory.addNewUser($scope.newUser)
            .then((data) => {
                $location.url("/profile");
                $scope.apply();
            });
    };





    $scope.logIn = () => {
        userFactory.logIn($scope.account)
            .then(() => {
                // $window.location.href = "#!/profile";
            });
    };

    let logout = () => {
        console.log("logout clicked");
        userFactory.logOut()
            .then(function() {
                console.log("logged out!");
                // $window.location.href = "#!/";
                // $scope.apply();
            }, function(error) {
                console.log("error on logout");
            });
    };

    $scope.loginGoogle = () => {
        console.log("you clicked google login");

        userFactory.authWithProvider()
            .then((result) => {
                let user = result.user.uid;
                // $window.location.href = "#!/profile";
                // $scope.apply();
            }).catch((error) => {
                console.log("google login error");
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("errors", errorCode, errorMessage);
            });
    };


});
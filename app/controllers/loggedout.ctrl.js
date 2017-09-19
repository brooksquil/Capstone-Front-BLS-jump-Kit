"use strict";
// console.log("loggedout.ctrl.js", "authCtrl");

app.controller("authCtrl", function($scope, $window, userFactory, $location, handleUserFactory) {

    // console.log("authCtrl, they all float down here");


    $scope.account = {
        email: "",
        password: ""
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
                $location.url("#!/profile");
                $scope.apply();
            });
    };


    $scope.loginGoogle = () => {
        console.log("you clicked google login");

        userFactory.authWithProvider()
            .then((result) => {
                let user = result.user.uid;
                $window.location.href = "#!/profile";
            }).catch((error) => {
                console.log("google login error");
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("errors", errorCode, errorMessage);
            });
    };

});
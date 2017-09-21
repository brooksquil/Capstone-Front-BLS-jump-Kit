"use strict";
// console.log("user.profile.ctrl.js", "profileCtrl");

app.controller("profileCtrl", function($scope, $window, userFactory, patientFactory, $location) {
    // console.log("Are you there?");


    $scope.isLoggedIn = false;

    $scope.logout = () => {
        // console.log("Logout Function Runs");
        userFactory.logOut();
        $location.url("/");
    };

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.isLoggedIn = true;
            // console.log("currentUser logged in?", user);
            console.log("logged in t-f", $scope.isLoggedIn);
            $scope.$apply();
        } else {
            $scope.isLoggedIn = false;
            // console.log("user logged in?", $scope.isLoggedIn);
            $window.location.href = "#!/";
        }
    });


    /////////////////////////////////
    //CARD SCRIPTS
    /////////////////////////////////
    var $cards = $('.card-object'),
        $faceButtons = $('.face');

    $faceButtons.on('click', flipCard);

    function flipCard(event) {
        event.preventDefault();
    }
});
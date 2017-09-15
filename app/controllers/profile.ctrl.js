"use strict";
// console.log("user.profile.ctrl.js", "profileCtrl");

app.controller("profileCtrl", function($scope, $window, userFactory, patientFactory, $location) {
    console.log("Are you there?");


    /////////////////////////////////////
    //Logout Functions IN SETTINGS MODAL
    ///////////////////////////////////// 
    $scope.isLoggedIn = false;

    $scope.logout = () => {
        console.log("Logout Function Runs");
        userFactory.logOut();
        $location.url("/");
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
            $window.location.href = "#!/";
        }
    });


    ///////////////////////////////////////
    //ADD PATIENT MODAL STUFF
    ///////////////////////////////////////
    let user = userFactory.getCurrentUser();


    $scope.patient = {
        patientID: "",
        calledFor: "",
        // timeStamp: "", commented until I hook up moment
        uid: user
    };

    $scope.submitPatient = function() {
        console.log("you clicked add patient");
        console.log("patient being added", $scope.patient);
        patientFactory.addPatient($scope.patient)
            .then((data) => {
                $location.url("/menu");
            });
    };

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
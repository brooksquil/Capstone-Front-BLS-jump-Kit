"use strict";
console.log("user.profile.ctrl.js", "profileCtrl");

app.controller("profileCtrl", function($scope, $window, userFactory, $location) {

    /////////////////////////////////
    //CARD SCRIPTS
    /////////////////////////////////
    var $cards = $('.card-object'),
        $faceButtons = $('.face');

    $faceButtons.on('click', flipCard);

    function flipCard(event) {
        event.preventDefault();

        var $btnFace = $(this),
            $card = $btnFace.parent('.card-object');

        if ($card.hasClass('flip-in')) {
            closeCards();
        } else {
            closeCards();
            openCard($card);
        }

    }

    function closeCards() {
        $cards
            .filter('.flip-in')
            .removeClass('flip-in')
            .addClass('flip-out');
    }

    function openCard($card) {
        $card
            .removeClass('flip-out')
            .addClass('flip-in');
    }


    //might need this here if logout is in modal
    // $scope.isLoggedIn = false;

    // $scope.logout = () => {
    //     userFactory.logOut();
    // };

    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //         $scope.isLoggedIn = true;
    //         console.log("currentUser logged in?", user);
    //         console.log("logged in t-f", $scope.isLoggedIn);
    //         $scope.$apply();
    //     } else {
    //         $scope.isLoggedIn = false;
    //         console.log("user logged in?", $scope.isLoggedIn);
    //         $window.location.href = "#!/login";
    //     }
    // });

});
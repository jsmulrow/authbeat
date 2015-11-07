app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    // set up authbeat
    authbeatReset();
    authbeatLogin();

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        console.log(authbeatPasswordIntervals);

        loginInfo.intervals = authbeatPasswordIntervals;

        console.log("login info", loginInfo);

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});
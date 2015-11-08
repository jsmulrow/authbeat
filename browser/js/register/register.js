app.config(function ($stateProvider) {

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'js/register/register.html',
        controller: 'registerCtrl'
    });

});

app.controller('registerCtrl', function ($scope, AuthService, $state) {

    $scope.register = {};
    $scope.error = null;

    // set up authbeat
    authbeatReset();
    authbeatRegister();

    $scope.sendRegister = function (registerInfo) {

        $scope.error = null;

        registerInfo.intervals = authbeatRegisterIntervals;

        AuthService.register(registerInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid register credentials.';
        });

    };

});


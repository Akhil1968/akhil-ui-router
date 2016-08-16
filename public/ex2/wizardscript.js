  angular.module('wizardApp', [
    'ui.router',
    'wizardapp.controllers'
    ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/wizard/start');
    $stateProvider
      .state('wizard', {
        abstract: true,
        url: '/wizard',
        templateUrl: 'wizardpages/main.html'
      })
      .state('wizard.start', {
        url: '/start',
        templateUrl: 'wizardpages/step1.html'
      })
      .state('wizard.email', {
        url: '/email',
        templateUrl: 'wizardpages/step2.html'
      })
      .state('wizard.finish', {
        url: '/complete',
        templateUrl: 'wizardpages/step3.html',
        controller: function($scope) {
          $scope.signup();
        }
      })
  }]);
  
  angular.module('wizardapp.controllers', [])
  .controller('WizardSignupController', ['$scope', '$state', function($scope, $state) {
    $scope.user = {};
    $scope.signup = function() {
    }
  }]);
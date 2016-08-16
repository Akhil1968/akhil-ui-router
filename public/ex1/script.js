var routerApp = angular.module('uiRouterApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'pages/home.html'
        })
        .state('home.list', {
            url: '/list', //this can be commented
            templateUrl: 'pages/home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Leo', 'Tiger', 'Dug'];
            }
        })
        .state('home.paragraph', {
            url: '/paragraph', //this can be commented
            template: 'UI-Router applications are modeled as a hierarchical tree of states.'
        })

        .state('about', {
        url: '/about',
        views: {
            '': { templateUrl: 'pages/about.html' },
            'subview-one@about': { template: 'I am sub view1!' },
            'subview-two@about': { 
                templateUrl: 'pages/about-fruits.html',
                controller: 'myController'
            },
            'subview-three@about': { 
                templateUrl: 'pages/about-rivers.html',
                controller: 'myController'
            }
        }
    });
}); //  $routerApp.config()

routerApp.controller('myController', function($scope) {
    $scope.message = 'Fruits Stall';
    $scope.fruits = [
        {   name: 'Banana', price: 50  },
        {   name: 'Mango',  price: 500 },
        {   name: 'Apple',  price: 200 }
    ];

    $scope.rivers = [
        {   name: 'Ganga', origin: 'Gangotri'  },
        {   name: 'Yamuna',  origin: 'Yamunotri' },
        {   name: 'Kaveri',  origin: 'Tal Kaveri, Coorg' }
    ];
}); //  $routerApp.controller()
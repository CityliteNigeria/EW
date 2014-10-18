angular.module('enroutify',['ui.router','enroutify.interfaceService','enroutify.locationCtrl'])
.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
    // State for any unmatched url
    $urlRouterProvider.otherwise('/');
    //load states
    $stateProvider
    //state for the homepage
    .state('home',{
        url: '/',
        templateUrl: 'templates/home.html',
        //controller: 'homeCtrl' 
    })
    .state('location',{
        url: '/location/:userid/:locationid',
        templateUrl: 'templates/location.html',
        controller: 'locationCtrl' 
    })
}])
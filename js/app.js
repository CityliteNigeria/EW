angular.module('enroutify',['ui.router'])
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
        url: '/location/:locationcode',
        templateUrl: 'templates/location.html',
        //controller: 'locationCtrl' 
    })
}])
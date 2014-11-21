angular.module('enroutify',['ui.router','enroutify.interfaceService','enroutify.locationCtrl','enroutify.locationService','enroutify.loginCtrl','firebase','angular-loading-bar','ngAnimate'])
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
    .state('login',{
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl' 
    })
    .state('location',{
        url: '/location/:userid/:locationid',
        templateUrl: 'templates/location.html',
        controller: 'locationCtrl',
        resolve: {
            "currentUser": ['$firebaseSimpleLogin',function($firebaseSimpleLogin){
            var ref = new Firebase("https://enroutify.firebaseio.com");
            var auth = $firebaseSimpleLogin(ref);
            return auth.$getCurrentUser();
        }]
        }
    })
}])
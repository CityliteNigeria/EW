angular.module('enroutify.loginCtrl', [])
.controller('loginCtrl',['InterfaceService','$scope','$firebaseSimpleLogin','$rootScope','$state','$location',function(InterfaceService,$scope,$firebaseSimpleLogin,$rootScope,$state,$location){
    var dataRef = new Firebase("https://enroutify.firebaseio.com");
    $scope.auth = $firebaseSimpleLogin(dataRef);
    var bufferData = InterfaceService.getBuffer();
    if(!bufferData){
        $state.go('home');
    }else{
        $rootScope.$on("$firebaseSimpleLogin:login", function(evt,data){
            $location.path('/location/'+bufferData.userid+'/'+bufferData.locationid,bufferData);
        });
    }
}])
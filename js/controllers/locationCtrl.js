angular.module('enroutify.locationCtrl', [])
.controller('locationCtrl',['InterfaceService','$stateParams','$firebase','$scope','$firebaseSimpleLogin','currentUser','$rootScope','LocationService','$state',function(InterfaceService,$stateParams,$firebase,$scope,$firebaseSimpleLogin,currentUser,$rootScope,LocationService,$state){
    if(!currentUser){
        data = {
            userid: $stateParams.userid,
            locationid: $stateParams.locationid
        }
        InterfaceService.buffer(data);
        $state.go('login');
    }else{
        var dataRef = new Firebase("https://enroutify.firebaseio.com");
        $scope.auth = $firebaseSimpleLogin(dataRef);
        $scope.logout = function(){
            data = {
                userid: $stateParams.userid,
                locationid: $stateParams.locationid
            }
            InterfaceService.buffer(data);
            $state.go('login');
            $scope.auth.$logout();
        }      
        $scope.user = currentUser;
        var locationRef = new Firebase("https://enroutify.firebaseio.com/locations/"+$stateParams.userid+"/"+$stateParams.locationid);
        var location = $firebase(locationRef);
        var locationData = location.$asObject();
        locationData.$loaded(function(data){
            var coords = data.coords;
            LocationService.drawRoute(coords);
        });
    }
}])
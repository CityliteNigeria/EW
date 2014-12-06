angular.module('enroutify.locationCtrl', [])
.controller('locationCtrl',['InterfaceService','$stateParams','$firebase','$scope','$firebaseSimpleLogin','currentUser','$rootScope','LocationService','$state',function(InterfaceService,$stateParams,$firebase,$scope,$firebaseSimpleLogin,currentUser,$rootScope,LocationService,$state){
    mixpanel.track("Web Location Page");
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
            angular.element('#name').append(data.name);
            angular.element('#address').append(data.address);
            angular.element('#city').append(data.city);
            angular.element('#state').append(data.state);
            angular.element('#country').append(data.country);
            angular.element('#desc').append(data.description);
            angular.element('#locationpic').append('<img src="'+data.picture+'" />');
            $scope.refreshMap = function(){
                mixpanel.track("Refreshed Map");
                LocationService.drawRoute(coords);
            }
        });
    }
}])
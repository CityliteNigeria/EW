angular.module('enroutify.loginCtrl', [])
.controller('loginCtrl',['InterfaceService','$scope','$firebaseSimpleLogin','$rootScope','$state','$location',function(InterfaceService,$scope,$firebaseSimpleLogin,$rootScope,$state,$location){
    mixpanel.track("Web Login Page");
    var dataRef = new Firebase("https://enroutify.firebaseio.com");
    $scope.auth = $firebaseSimpleLogin(dataRef);
    var bufferData = InterfaceService.getBuffer();
    if(!bufferData){
        $state.go('home');
    }else{
        $rootScope.$on("$firebaseSimpleLogin:login", function(evt,data){
            mixpanel.identify(data.thirdPartyUserData.email);
            
            mixpanel.people.set({
                "$email": data.thirdPartyUserData.email,
                "name": data.displayName,
                "gender": data.thirdPartyUserData.gender,
                "Login Source": data.provider
                
            });
            mixpanel.people.set_once({
                'First Login Date': new Date()
            });
            mixpanel.register({
                "email": data.thirdPartyUserData.email,
                "gender": data.thirdPartyUserData.gender,
                "Login Source": data.provider
            });
            mixpanel.track("Logged In");
            $location.path('/location/'+bufferData.userid+'/'+bufferData.locationid,bufferData);
        });
    }
}])
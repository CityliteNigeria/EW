angular.module('enroutify.interfaceService', [])

.factory('InterfaceService', ['$rootScope','$state',function($rootScope,$state){
    $rootScope.mapSize = {"width":"100%","height":angular.element(window).height()-2};
    $rootScope.windowHeight = angular.element(window).height() - 76;      
    var store = null;
    return {
        //Handle temporary data
        /**
          serves as temporary storage for data. 
          Accepts objects.
        */
        buffer: function(data){
            store = data;
            return true;
        },
        /**
        Clears temporaryly stored data
        */
        clearBuffer: function(){
            store = null;
            return true;
        },
        /**
        Get value of a previously saved object
        */
        getBuffer: function(){
            if(store !== null){
                return store;
            }else{
                return false;
            }  
        }
    }
}]);
angular.module('enroutify.interfaceService', [])

.factory('InterfaceService', ['$rootScope',function($rootScope){
return $rootScope.mapSize = {"width":"100%","height":angular.element(window).height()-2};
}]);
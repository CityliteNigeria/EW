angular.module('enroutify.locationService', [])

.factory('LocationService', ['$rootScope',function($rootScope){    
return {
    drawRoute: function(coords){
        /**
        Accepts Coordinates in form of an object
        eg. coords = {
            latitude: 0.4444444, 
            longitude: 0.89999999
        }
        */
        GMaps.geolocate({
              success: function(position) {
                map = new GMaps({
                    el: '#map',
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  });
                map.drawOverlay({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                  content: '<div class="overlay">You are here <div class="overlay_arrow above"></div></div>'
                });
                map.drawOverlay(
                {
                  lat: coords.latitude,
                  lng: coords.longitude,
                  content: '<div class="overlay">Destination <div class="overlay_arrow above"></div></div>'
                });
              map.travelRoute({
                  origin: [position.coords.latitude, position.coords.longitude],
                  destination: [coords.latitude, coords.longitude],
                  travelMode: 'driving',
                  step: function(e) {
                    angular.element('#instructions').append('<li class="list-group-item">'+e.instructions+'</li>');
                    angular.element('#instructions li:eq(' + e.step_number + ')').delay(450 * e.step_number).fadeIn(200, function() {
                      map.drawPolyline({
                        path: e.path,
                        strokeColor: '#313131',
                        strokeOpacity: 0.9,
                        strokeWeight: 6
                      });
                    });
                  }
                });
              },
              error: function(error) {
                
              },
              not_supported: function() {
                
              },
              always: function() {
                
              }
            });
    }
}
}]);
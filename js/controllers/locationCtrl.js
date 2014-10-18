angular.module('enroutify.locationCtrl', [])
.controller('locationCtrl',['InterfaceService','$stateParams','$firebase','$scope','$firebaseSimpleLogin','currentUser',function(InterfaceService,$stateParams,$firebase,$scope,$firebaseSimpleLogin,currentUser){
    if(!currentUser){
        
    }else{
        var locationRef = new Firebase("https://enroutify.firebaseio.com/locations/"+$stateParams.userid+"/"+locationid);
        $scope.location = $firebase(locationRef);
        
            //Draw Route
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
                map.drawOverlay({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                  content: '<div class="overlay">Destination <div class="overlay_arrow above"></div></div>'
                });
              map.travelRoute({
                  origin: [position.coords.latitude, position.coords.longitude],
                  destination: [<?php echo $lat ?>, <?php echo $lng ?>],
                  travelMode: 'driving',
                  step: function(e) {
                    $('#instructions').append('<li>'+e.instructions+'</li>');
                    $('#instructions li:eq(' + e.step_number + ')').delay(450 * e.step_number).fadeIn(200, function() {
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
}])
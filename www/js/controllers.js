angular.module('starter.controllers', [])

  .controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
      LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
        $state.go('tab.dash');
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      });
    }
  })


  .controller('TrailsCtrl', function($scope, $ionicLoading) {
    // you can specify the default lat long
    var map,
      currentPositionMarker,
      mapCenter = new google.maps.LatLng(14.668626, 121.24295),
      map;

    // change the zoom if you want
    function initializeMap() {
      map = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: 18,
        center: mapCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    }

    function locError(error) {
      // tell the user if the current position could not be located
      alert("The current position could not be found!");
    }

    // current position of the user
    function setCurrentPosition(pos) {
      currentPositionMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(
          pos.coords.latitude,
          pos.coords.longitude
        ),
        title: "Current Position"
      });
      map.panTo(new google.maps.LatLng(
        pos.coords.latitude,
        pos.coords.longitude
      ));
    }

    function displayAndWatch(position) {

      // set current position
      setCurrentPosition(position);

      // watch position
      watchCurrentPosition();
    }

    function watchCurrentPosition() {
      var positionTimer = navigator.geolocation.watchPosition(
        function(position) {
          setMarkerPosition(
            currentPositionMarker,
            position
          );
        });
    }

    function setMarkerPosition(marker, position) {
      marker.setPosition(
        new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude)
      );
    }

    function initLocationProcedure() {
      initializeMap();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
      } else {
        // tell the user if a browser doesn't support this amazing API
        alert("Your browser does not support the Geolocation API!");
      }
    }
  })

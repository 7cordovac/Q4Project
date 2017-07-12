angular.module('starter.controllers', [])

.run(function ($ionicPlatform,$state,$ionicHistory,$ionicPopup) {
   $ionicPlatform.ready(function () {
     // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
     // for form inputs)
     if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

     }
     if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
     }

     $ionicPlatform.registerBackButtonAction(function (event) {
      event.preventDefault();
      if ($state.current.name == "tab.home") {
         var confirmPopup = $ionicPopup.confirm({
           title: 'Exit',
           template: 'Confirm Exit'
         });

         confirmPopup.then(function (res) {
           if (res) {
             navigator.app.exitApp();
           }

         });
      } else {
         $ionicHistory.nextViewOptions({ disableBack: true });
         $state.go('tab.home');
      }
     }, 800);//registerBackButton

   });
 })


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


 .controller('TrackCtrl', function($scope, $ionicLoading) {
  function displayLocation(position) {
   var latitude = position.coords.latitude;
   var longitude = position.coords.longitude;

   var pTime = document.getElementById("time");
   t2 = Date.now();
   pTime.innerHTML += "<br>Computed in " + (t2-t1) + " milliseconds";

   var pLocation = document.getElementById("location");
   pLocation.innerHTML += latitude + ", " + longitude + "<br>";

   var pInfo = document.getElementById("info");
   var date = new Date(position.timestamp);
   pInfo.innerHTML = "Location timestamp: " + date + "<br>";
   pInfo.innerHTML += "Accuracy of location: " +
                  position.coords.accuracy +
                  " meters<br>";
   if (position.coords.altitude) {
      pInfo.innerHTML += "Altitude: " + position.coords.altitude;
   }

   if (position.coords.altitudeAccuracy) {
      pInfo.innerHTML += " with accuracy " +
         position.coords.altitudeAccuracy + "???";
   }
   pInfo.innerHTML += "<br>";
  //direction you are heading
   if (position.coords.heading) {
      pInfo.innerHTML += "Heading: " + position.coords.heading + "<br>";
   }

   if (position.coords.speed) {
      pInfo.innerHTML += "Speed: " + position.coords.speed + "<br>";
   }
  }

  function displayError(error) {
   var errors = ["Unknown error", "Permission denied by user", "Position not available", "Timeout error"];
   var message = errors[error.code];
   console.warn("Error in getting your location: " + message, error.message);
   var pError = document.getElementById("error");
   pError.innerHTML = "Error in getting your location: " + message + ", " + error.message;
  }

  var t1 = 0, t2 = 0;

  window.onload = function() {
   if (navigator.geolocation) {
      var pTime = document.getElementById("time");
      pTime.innerHTML = "Timeout: 5000, maximumAge: 0";

      t1 = Date.now();

      navigator.geolocation.getCurrentPosition(displayLocation,
         displayError,
         { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
   } else {
      alert("Sorry, this browser doesn't support geolocation!");
   }
  }
  })

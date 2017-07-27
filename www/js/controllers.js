angular.module('starter.controllers', [])

  .run(function($ionicPlatform, $state, $ionicHistory, $ionicPopup) {
    $ionicPlatform.ready(function() {
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

      $ionicPlatform.registerBackButtonAction(function(event) {
        event.preventDefault();
        if ($state.current.name == "app.menu") {
          var confirmPopup = $ionicPopup.confirm({
            title: 'Exit',
            template: 'Confirm Exit'
          });

          confirmPopup.then(function(res) {
            if (res) {
              navigator.app.exitApp();
            }

          });
        } else {
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('app.menu');
        }
      }, 800); //registerBackButton

    });
  })

  .controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicSideMenuDelegate) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.toggleLeftSideMenu = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 3000);
    };
  })

  //////////////////////////////////

  .controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $window) {
    $scope.data = {};

    $scope.login = function() {
      LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
        $state.go('tab.track');
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      });
    }
  })

  .controller('MappingCtrl', function($scope, $ionicLoading) {
    // you can specify the default lat long

    var locations = [];
    // you can specify the default lat long
    var map,
      currentPositionMarker,
      mapCenter = new google.maps.LatLng(14.668626, 121.24295),
      map;

    var log = document.getElementById('log');
    var watchId = null;
    var positionOptions = {
      enableHighAccuracy: true,
      timeout: 10 * 1000, // 10 seconds
      maximumAge: 30 * 1000 // 30 seconds
    };

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
      setCurrentPosition(position);
      watchCurrentPosition();
    }

    // START A TIMER HERE
    function watchCurrentPosition() {
      let options = {
        frequency: 30000
      };
      var positionTimer = navigator.geolocation.watchPosition(
        function(position) {



          locations.push({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });

          $("#bucket").html(locations);
          console.log("ticking and bucket is ", locations);

          var routePath = new google.maps.Polyline({
            path: locations,
            geodesic: true,
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });

          routePath.setMap(map);


          setMarkerPosition(
            currentPositionMarker,
            position
          );
        }, null, options);
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


    function error(positionError) {
      log.innerHTML = 'Error: ' + positionError.message + '<br />' + log.innerHTML;
    }


    //STOP TIMER HERE
    document.getElementById('button-stop-watching').addEventListener('click', function() {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        log.innerHTML = 'Stopped watching position<br />' + log.innerHTML;
      }
    });

    /*   document.getElementById('clear-log').addEventListener('click', function() {
          log.innerHTML = '';
    });*/


    // initialize with a little help of jQuery
    $(document).ready(function() {
      initLocationProcedure();

      function loadSuccess(position) {
        document.getElementById('latitude').innerHTML =
          position.coords.latitude;

        document.getElementById('longitude').innerHTML =
          position.coords.longitude;

        document.getElementById('position-accuracy').innerHTML = position.coords.accuracy;

        document.getElementById('altitude').innerHTML =
          position.coords.altitude ?
          position.coords.altitude : 'unavailable';

        document.getElementById('altitude-accuracy').innerHTML = position.coords.altitudeAccuracy ?
          position.coords.altitudeAccuracy : 'unavailable';

        document.getElementById('heading').innerHTML =
          position.coords.heading ?
          position.coords.heading : 'unavailable';

        document.getElementById('speed').innerHTML =
          position.coords.speed ?
          position.coords.speed :
          'unavailable';

        document.getElementById('timestamp').innerHTML =
          (new Date(position.timestamp)).toString();

        //log.innerHTML =
        //'Position succesfully retrieved<br />' + log.innerHTML;
      }

      document.getElementById('button-get-position').addEventListener('click', function() {
        navigator.geolocation.getCurrentPosition(loadSuccess, error, positionOptions);

      });

      document.getElementById('button-watch-position').addEventListener('click', function() {
        watchId = navigator.geolocation.watchPosition(loadSuccess, error, positionOptions);
      });
    });
  })

/*.controller('TrackCtrl', function($scope, $ionicLoading) {
        window.navigator = window.navigator || {};
        window.navigator.geolocation = window.navigator.geolocation ||
                                       undefined;
        if (navigator.geolocation === undefined) {
           document.getElementById('g-unsupported').classList.remove('hidden');
           ['button-get-position', 'button-watch-position', 'button-stop-watching'].forEach(function(elementId) {
              document.getElementById(elementId).setAttribute('disabled', 'disabled');
           });
        } else {
           var log = document.getElementById('log');
           var watchId = null;
           var positionOptions = {
              enableHighAccuracy: false,
              timeout: 10 * 1000, // 10 seconds
              maximumAge: 30 * 1000 // 30 seconds
           };

           function success(position) {
              document.getElementById('latitude').innerHTML = position.coords.latitude;
              document.getElementById('longitude').innerHTML = position.coords.longitude;
              document.getElementById('position-accuracy').innerHTML = position.coords.accuracy;

              document.getElementById('altitude').innerHTML = position.coords.altitude ?  position.coords.altitude :
                      'unavailable';
              document.getElementById('altitude-accuracy').innerHTML = position.coords.altitudeAccuracy ?
                      position.coords.altitudeAccuracy :
                      'unavailable';
              document.getElementById('heading').innerHTML = position.coords.heading ? position.coords.heading :
                      'unavailable';
              document.getElementById('speed').innerHTML = position.coords.speed ? position.coords.speed :
                      'unavailable';

              document.getElementById('timestamp').innerHTML = (new Date(position.timestamp)).toString();

              log.innerHTML = 'Position succesfully retrieved<br />' + log.innerHTML;
           }

           function error(positionError) {
              log.innerHTML = 'Error: ' + positionError.message + '<br />' + log.innerHTML;
           }

           document.getElementById('button-get-position').addEventListener('click', function() {
              navigator.geolocation.getCurrentPosition(success, error, positionOptions);
           });

           document.getElementById('button-watch-position').addEventListener('click', function() {
              watchId = navigator.geolocation.watchPosition(success, error, positionOptions);
           });

           document.getElementById('button-stop-watching').addEventListener('click', function() {
              if (watchId !== null) {
                 navigator.geolocation.clearWatch(watchId);
                 log.innerHTML = 'Stopped watching position<br />' + log.innerHTML;
              }
           });

           document.getElementById('clear-log').addEventListener('click', function() {
              log.innerHTML = '';

      });
    }
})*/

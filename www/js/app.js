// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ionic.cloud'])

  .run(function($ionicPlatform) {
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
    });
  })

  .config(function($ionicCloudProvider) {
  $ionicCloudProvider.init({
    "core": {
      "app_id": "0c936b51S"
    }
  });
})
//.config(function($stateProvider, $urlRouterProvider) {

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider






  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

   .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
   })


    .state('app.track', {
      url: '/track',
      views: {
        'menuContent': {
          templateUrl: 'templates/track.html',
   //       controller: 'TrackCtrl'

        }
     }
  })

    .state('app.mapping', {
      url: '/mapping',
      views: {
        'menuContent': {
          templateUrl: 'templates/mapping.html',
   //       controller: 'MappingCtrl'

        }
      }
    })

    .state('app.multiplemarkers', {
      url: '/multiplemarkers.',
      views: {
        'menuContent': {
          templateUrl: 'templates/multiplemarkers.html',
        }
      }
    })

    .state('app.single', {
      url: '/playlists/:playlistId',
      views: {
        'menuContent': {
          templateUrl: 'templates/multiplemarkers.html',
        }
   }
});


      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/app/mapping');

});

      // if none of the above states are matched, use this as the fa

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic.cloud'])

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

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

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
            templateUrl: 'templates/saved.html',
          }
        }
      })


      .state('app.mapping', {
        url: '/mapping',
        views: {
          'menuContent': {
            templateUrl: 'templates/mapping.html',
            controller: 'MappingCtrl'
          }
        }
      })


      .state('app.saved', {
        url: '/saved',
        views: {
          'menuContent': {
            templateUrl: 'templates/saved.html',
          }
        }
      })


      .state('app.nearby', {
        url: '/nearby',
        views: {
          'menuContent': {
            templateUrl: 'templates/nearby.html',
          }
        }
      })


    $urlRouterProvider.otherwise('/app/saved');
  });

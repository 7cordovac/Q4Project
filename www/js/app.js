// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.controllers','starter.services'])

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

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tab.home', {
      url: "/home",
      abstract: true,
      templateUrl: "templates/tab-home.html"
    })
    .state('tab.login', {
      url: "/login",
      views: {
        'login-tab': {
          templateUrl: "templates/tab-login.html",
          controller: 'LoginCtrl'
        }
      }
    })
    .state('tab.track', {
      url: "/track",
      views: {
        'track-tab': {
          templateUrl: "templates/tab-track.html"
        }
      }
    })
    .state('tab.trails', {
      url: "/trails",
      views: {
        'trails-tab': {
          templateUrl: "templates/tab-trails.html"
        }
      }
    })


   $urlRouterProvider.otherwise("/tab");

})

.controller('TabsCtrl', function($scope) {
  console.log('HomeTabCtrl');
});

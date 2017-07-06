angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('TrackCtrl', function($scope) {})

.controller('ChatDetailCtrl', function($scope) {})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

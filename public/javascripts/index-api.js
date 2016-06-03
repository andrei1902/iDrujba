var myapp = angular.module("myapp", []);

myapp.controller('IndexController', function($scope, $http) {
  console.log('Index controler is online');
  $http.get('/features').
  success(function(response) {
    $scope.features = response;
    $scope.feature1 = $scope.features[0];
    $scope.feature2 = $scope.features[1];
    $scope.feature3 = $scope.features[2];
  }).
  error(function() {
    console.log('There was an error populating features');
  });
});


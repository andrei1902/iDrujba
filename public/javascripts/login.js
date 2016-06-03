var myapp = angular.module("myapp", []);

myapp.controller('loginControler', function($scope, $http) {
  console.log('Login controler is online');
  $scope.admin = {}

  $scope.signin = function(){
    $http.post('/api/login', $scope.admin).success(function(res){
    	console.log(res);
    });
  }
});
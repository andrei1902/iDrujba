var myapp = angular.module("myapp", []);

myapp.controller('cosCtrl', function($scope, $http){
  console.log('Cos controler is online');
  $scope.order = {};

  $http.get('/preorder').success(function(result){
  	$scope.preorder = result;
  	$scope.order.price = 0;
  	$scope.order.product = $scope.preorder.products;
  	$scope.order.status = "initializat";
  	$scope.order._type = "order";
  	$scope.order.date = new Date();
  		for(var i=0; i<$scope.preorder.products.length; i++){
  			$scope.order.price += parseInt($scope.preorder.products[i].price);
  		} 		
  });

  $scope.addOrder = function(){
  	$http.post('/addOrder', $scope.order).success(function(){
  		alert('comanda trimisa');
  		$scope.order = {}
  	});
  }
});

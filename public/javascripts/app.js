var myapp = angular.module("myapp", ['ngRoute', 'angularFileUpload']);

myapp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
      when('/', {templateUrl: '/ordersList.html', controller: 'ordersList'}).
      when('#', {templateUrl: '/ordersList.html', controller: 'ordersList'}).
      when('/list', {templateUrl: '/ordersList.html', controller: 'ordersList'}).
      when('/feature', {templateUrl: '/feature.html', controller: 'feature'}).
      when('/products', {templateUrl: '/productList.html', controller: 'products'}).
      when('/addProduct', {templateUrl: '/addProduct.html', controller: 'addProduct'}).
      when('/editProduct/:id', {templateUrl: '/editProduct.html', controller: 'editProduct'}).
      when('/upload', {templateUrl: '/upload.html', controller: 'upload'}).
      when('/metrics', {templateUrl: '/metrics.html', controller: 'metrics'}).
      when('/metricsIni', {templateUrl: '/metricsIni.html', controller: 'metricsIni'}).
      when('/metricsPp', {templateUrl: '/metricsPp.html', controller: 'metricsPp'}).
      when('/metricsExp', {templateUrl: '/metricsExp.html', controller: 'metricsExp'}).
      when('/metricsFin', {templateUrl: '/metricsFin.html', controller: 'metricsFin'}).
      when('/metricsRef', {templateUrl: '/metricsRef.html', controller: 'metricsRef'}).
      when('/editOrder/:id', {templateUrl: '/editOrder.html', controller: 'editOrder'}).
      when('/users', {templateUrl: '/users.html', controller: 'users'}).
      when('/newUser', {templateUrl: '/addUser.html', controller: 'newUser'}).
      when('/editUser/:id', {templateUrl: '/editUser.html', controller: 'editUser'}).
      when('/inConstruction', {templateUrl: '/underConstruction.html', controller: 'underConstruction'}).
      otherwise({redirectTo: '/list'});
  }]);

//under Construction controller
myapp.controller('underConstruction', function() {
  console.log('underConstruction controler is online');
});

//new user controller
myapp.controller('newUser', function($scope, $http) {
  console.log('new User controler is online');
});

//edit user controller
myapp.controller('editUser', function($scope, $http, $routeParams, $location) {
  console.log('Edit user controler is online');
  $scope.user={};
  /*$scope.user = $scope.users[$scope.$routeParams.id];*/
  $scope.user = $scope.$parent.users[$routeParams.id];

  $scope.deleteUser = function (key){
    var key = key;
    console.log('I will delete this key ' + key);
    $http.delete('/deleteUser/' + key).success(function(){
    }).error(function(){
      console.log('There was an error removing item');
    });
    $location.path('/users');
  }
});

//users controller
myapp.controller('users', function($scope, $http) {
  console.log('edit user controler is online');

  $scope.users = {};
  $http.get('/users').success(function(response){
    $scope.users = response;
    $scope.$parent.users = response
  }).error(function(){
    console.log('There was a problem returning your objects');
  });
});


//ordersList controller
myapp.controller('ordersList', function($scope, $http) {
  console.log('OrdersList controler is online');

  $http.get('/list').
  success(function(response) {
    $scope.orders = response;
    $scope.$parent.orders = response;
    console.log($scope.orders);
  }).
  error(function() {
    console.log('There was an error populating ordersList');
  });
});

//feature controller
myapp.controller('feature', function($scope, $http, $location, FileUploader) {
  console.log('Feature controler is online');

  $scope.uploader = new FileUploader();
  $http.get('/features').success(function(response){
    $scope.features = response;
  }).error(function(){
    console.log('There was an error returning your features');
  });


  $scope.editFeature = function(index){
    $scope.feature = $scope.features[index-1];
  }
});

//products controler
myapp.controller('products', function($scope, $http) {
  console.log('ProductList controler is online');
  
  $http.get('/products').
  success(function(response) {
    $scope.$parent.products = response
    $scope.products = response;
  }).
  error(function() {
    console.log('There was an error populating ordersList');
  });
});

myapp.controller('addProduct', function($scope, $http, $location) {
  console.log('addProduct controler is online');
});

myapp.controller('editProduct', function($scope, $routeParams, $location, $http) {
  console.log('EditProduct controler is online');
  $scope.params = $routeParams;
  $scope.list = $scope.products;
  $scope.product = $scope.list[$scope.params.id];

  $scope.deleteProduct = function(key){
    var key = key;
    console.log('I will delete this key ' + key);
    $http.delete('/deleteProduct/' + key).success(function(){
    }).error(function(){
      console.log('There was an error removing item');
    });
    $location.path('/products');
  }
});


//upload controller
myapp.controller('upload', function($scope, FileUploader, $http) {
        console.log('Upload controler is online');
        $scope.uploader = new FileUploader({url: '/api/upload'});
        $scope.upload = function(){
          $scope.uploader.queue[0].upload();
        }
});

//metrics controller
myapp.controller('metrics', function($scope, $http) {
  console.log('Metrics controler is online');

  $http.get('/daily').success(function(response){
    $scope.list = response[0];
  }).error(function(){
    console.log('There was an error returning your objects');
  });
});

//metricsIni controller
myapp.controller('metricsIni', function($scope, $http) {
  console.log('MetricsIni controler is online');

  $http.get('/dailyIni').success(function(response){
    $scope.list = response[0];
  }).error(function(){
    console.log('There was an error returning your objects');
  });
});

//metricsPp controller
myapp.controller('metricsPp', function($scope, $http) {
  console.log('MetricsPp controler is online');

  $http.get('/dailyPp').success(function(response){
    $scope.list = response[0];
  }).error(function(){
    console.log('There was an error returning your objects');
  });
});

//metricsExp controller
myapp.controller('metricsExp', function($scope, $http) {
  console.log('MetricsExp controler is online');

  $http.get('/dailyExp').success(function(response){
    $scope.list = response[0];
  }).error(function(){
    console.log('There was an error returning your objects');
  });
});

//metricsFin controller
myapp.controller('metricsFin', function($scope, $http) {
  console.log('MetricsFin controler is online');

  $http.get('/dailyFin').success(function(response){
    $scope.list = response[0];
  }).error(function(){
    console.log('There was an error returning your objects');
  });
});

//metricsFin controller
myapp.controller('metricsRef', function($scope, $http) {
  console.log('MetricsRef controler is online');

  $http.get('/dailyRef').success(function(response){
    $scope.list = response[0];
  }).error(function(){
    console.log('There was an error returning your objects');
  });
});

//edit order controller
myapp.controller('editOrder', function($scope, $http, $routeParams, $location){
  console.log('Edit order controler is online');
  $scope.order={};
  $scope.order = $scope.$parent.orders[$routeParams.id];

  //refuse order method
  $scope.refuseOrder = function(){
    $scope.order.status = 'refuzat';
    $http.post('api/updateOrder', $scope.order).success(function(){
      console.log('Your order update was sent to the server');
    }).error(function(){
      console.log('There was an error sending your order to the server');
    });
    $location.path('/list');
  }

  //update order method
  $scope.updateOrder = function(){
    //update status
    switch($scope.order.status) {
      case 'initializat':
        $scope.order.status = 'primit pentru procesare';
        break;
      case 'primit pentru procesare':
        $scope.order.status = 'expediat';
        break;
      case 'expediat':
        $scope.order.status = 'finalizat';
        break;
      default: 
        $scope.order.status = 'initializat';
        break;
    }

    //sendind data to server
    $http.post('api/updateOrder', $scope.order).success(function(){
      console.log('Your order update was sent to the server');
    }).error(function(){
      console.log('There was an error sending your order to the server');
    });

    //redirect client
    $location.path('/list'); 
  }


});
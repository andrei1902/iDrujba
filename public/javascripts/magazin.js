var myapp = angular.module("myapp", ['ngRoute', 'ngAnimate']);

myapp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
      when('/produse', {templateUrl: '/shelf.html', controller: 'shelf'}).
      when('/', {controller: 'magazin'}).
      otherwise({redirectTo: '/'});
  }]);

//main controller
myapp.controller('magazin', function($scope, $http, $location) {
  console.log('Magazin controler is online');
  $scope.status = {};
  $scope.status.show = true;
  $scope.pageClass = 'page-home';
  $scope.queryParams = [];

  $scope.restore = function(){
    $scope.status.show = true;
    $location.path('/');
  }

});

//products list controller
myapp.controller('shelf', function($scope, $http) {
  console.log('Shelf controler is online');
  $scope.$parent.status.show = false;
  $scope.pageClass = 'page-list';
  $scope.pressed = 'btn btn-default';
  $scope.manButtons = [];
  $scope.engineButtons = ['btn btn-default', 'btn btn-default', 'btn btn-default', 'btn btn-default'];
  $scope.bladeButtons = ['btn btn-default', 'btn btn-default', 'btn btn-default', 'btn btn-default', 'btn btn-default'];
  $scope.weightButtons = ['btn btn-default', 'btn btn-default', 'btn btn-default', 'btn btn-default', 'btn btn-default', 'btn btn-default'];

    $scope.restore = function(){
    $location.path('/');
  }



  $http.get('/products').
    success(function(response) {
      $scope.$parent.products = response
      $scope.products = response;
    }).
    error(function() {
      console.log('There was an error populating products list');
    });

  $http.get('/manufacturers').
    success(function(response) {
      $scope.manufacturers = response;
      console.log($scope.manufacturers);
      $scope.manufacturers.push('fara filtru');
      for (var i =0; i < $scope.manufacturers.length; i++){
        $scope.manButtons.push('btn btn-default');
      }
    }).
    error(function() {
      console.log('There was an error populating manufacturers list');
    });

  $scope.addToCart = function(product){
    $scope.preOrder = {product: product.name, manufacturer: product.manufacturer, price: product.price};
    $http.post('/api/addPreorder', $scope.preOrder).success(function(){
      console.log('Order sent to the server...');

    }).error(function(){
      console.log('There was an error sendind the order to the server');
    });
      alert('Product added to cart ' + $scope.preOrder.product);
/*    $location.path('/produse');*/
  }

    //filters
    $scope.manFilter = function(item, index){
        if(item == $scope.query1){
          $scope.query1 = '';
          $scope.manButtons[index] = 'btn btn-default';
        } else{
          $scope.query1 = item;
          for(var i = 0; i < $scope.manButtons[index].length; i++){
            $scope.manButtons[i] = 'btn btn-default'
          }
          $scope.manButtons[index] = 'btn btn-success';
        }

        if(item == 'fara filtru')
          $scope.query1 = '';
        /*$scope.queryParams.push(item);*/    
    }

    $scope.pwrFilter = function(item, index){
        if(item == $scope.query2){
          $scope.query2 = '';
          $scope.engineButtons[index] = 'btn btn-default';
        } else{
          $scope.query2 = item;
          for(var i = 0; i < $scope.engineButtons[index].length; i++){
            $scope.engineButtons[i] = 'btn btn-default'
          }
          $scope.engineButtons[index] = 'btn btn-success';
        }
    }

    $scope.bFilter = function(item, index){
        if(item == $scope.query3){
          $scope.query3 = '';
          $scope.bladeButtons[index] = 'btn btn-default';
        } else{
          $scope.query3 = item;
          for(var i = 0; i < $scope.bladeButtons[index].length; i++){
            $scope.bladeButtons[i] = 'btn btn-default'
          }
          $scope.bladeButtons[index] = 'btn btn-success';
        }     
    }

    $scope.wFilter = function(item, index){
        if(item == $scope.query4){
          $scope.query4 = '';
          $scope.weightButtons[index] = 'btn btn-default';
        } else{
          $scope.query4 = item;
          for(var i = 0; i < $scope.weightButtons[index].length; i++){
            $scope.weightButtons[i] = 'btn btn-default'
          }
          $scope.weightButtons[index] = 'btn btn-success';
        }      
    }

    $scope.noFilter = function(){
      $scope.query1 = $scope.query2 = $scope.query3 = $scope.query4 = '';
    }

/*    $scope.filterMan = function(element){
      console.log($scope.queryParams);
      console.log(element);
      for (i=0; i<$scope.queryParams.length; i++){
        if (element == $scope.queryParams[i]){
          return true
        } else {
          return false
        }
      }
    }*/

    $scope.listCrap = function(){
      return 'product in products | filter: query1 | query2 | query3 | query4'
    }
});



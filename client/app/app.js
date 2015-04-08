var app = angular.module('allBrews', [
  'ngRoute'
  ]
);

app.config(function($routeProvider){
  $routeProvider
    .when('/',
    {
      templateUrl: "views/main.html",
      controller: "MainCtrl"
    }
    )
    .when('/search',
      {
        templateUrl: "views/beers.html",
        controller: "BeersCtrl"
      }
    )
});

app.controller('MainCtrl', function($scope, $http){
  $scope.model = {
    message: 'Thirsty?'
  };

  $scope.submitForm = function() {
    $http.post('/', { brewery: $scope.searchTerm })
      .success(function(data, status, headers, config){
        $scope.data = data;
        //console.log('--------DATA------: ', data);
        var parsedBeers = JSON.parse($scope.data.resp.body);
        $scope.beerObj = {
          image: $scope.data.image,
          beers: parsedBeers.data
        }
        var beerArray = [];
        var available = "Unknown Availability";

        $scope.beerObj.beers.sort(function(a,b){ return a.availableId - b.availableId; });

        for(var i = 0; i < $scope.beerObj.beers.length; i++){

          if( $scope.beerObj.beers[i].availableId === 1 ){
            available = 'Year-round';
          } else if( $scope.beerObj.beers[i].availableId === 2 ){
            available = 'Limited Availability';
          }else if( $scope.beerObj.beers[i].availableId === 3 ){
            available = 'No Longer Available';
          }else if( $scope.beerObj.beers[i].availableId === 4 ){
            available = 'Seasonal';
          }else if( $scope.beerObj.beers[i].availableId === 5 ){
            available = 'Seasonal - Spring';
          }else if( $scope.beerObj.beers[i].availableId === 6 ){
            available = 'Seasonal - Summer';
          }else if( $scope.beerObj.beers[i].availableId === 7 ){
            available = 'Seasonal - Fall';
          }else if( $scope.beerObj.beers[i].availableId === 8 ){
            available = 'Seasonal - Winter';
          }

          beerArray.push({
            name: $scope.beerObj.beers[i].name,
            availability: available
          });
        }

        $scope.beerObj.beers = beerArray;
      })
      .error(function(data, status, headers, config){
        console.log('-----ERROR-----: ', data);
      });
    }

});

app.controller('BeersCtrl', function($scope, $http){
});
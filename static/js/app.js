 // create the module and name it App
    var app = angular.module('bandApp', ['ngRoute']);

    // configure our routes
    app.config(function($routeProvider) {
        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'static/home.html',
                controller  : 'homeController'
            })
            .when('/home', {
                templateUrl : 'static/home.html',
                controller  : 'homeController'
            })
            // route for the bands
            .when('/bands',{
              templateUrl : 'static/bands.html',
                controller  : 'bandsController'

            })
            // route for the about page
            .when('/about', {
                templateUrl : 'static/about.html',
                controller  : 'aboutController'
            })
            // route for the contact page
            .when('/contact', {
                templateUrl : 'static/contact.html',
                controller  : 'contactController'
            });
    });

    // create the controller and inject Angular's $scope
    app.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    app.controller('bandsController', ['$scope', '$http', 
              function($scope, $http, $window) {
                    $http.get('/bands/get')
                        .success(function(data, status, headers, config) {
                            console.log("success mongo")
                        $scope.bands = data;
                    //$scope.band = data[0];
                }).error(function(data, status, headers, config) {
                    $scope.bands = [];
                });

                    $scope.setCurrentBand = function(band) {
                        $scope.currentBand = band ;
                    }

                    $scope.createBand = function() {
                        // création de données factices
                        var data = { "name":"nom du groupe","city":"ville","style":"punk" } ;  
                                            
                        var res = $http.post('/bands/post', data);
                        res.success(function(data, status, headers, config) {
                            //console.log(data);
                            $scope.bands.push(data) 
                            //$scope.message = data;
                        });
                        res.error(function(data, status, headers, config) {
                            alert( "failure message: " + JSON.stringify({data: data}));
                        });
                    }
                }]);

   app.controller('homeController', function($scope) {
        $scope.message = 'WELCOME';
    });

    app.controller('aboutController', function($scope) {
        $scope.message = 'Hello dudees i am about';
    });

    app.controller('contactController', function($scope) {
        $scope.message = 'Hello dudees i am contact';
    });

                
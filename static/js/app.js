 // create the module and name it App
 var app = angular.module('indizoloApp', ['ngRoute','ngTagsInput','ngLodash','xeditable','ngFileUpload']);

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
            .when('/carousel',{
              templateUrl : 'static/carousel.html',
              controller  : 'carouselController'

          })
            .when('/banners',{
              templateUrl : 'static/banners.html',
              controller  : 'bannersController'

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
            }).
            otherwise({
                    redirectTo: '/'
                });
            ;
        });


 app.run(function(editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme.
    });

    /* 
        create the controller and inject Angular's $scope
        app.controller('mainController', function($scope) {
            // create a message to display in our view
            $scope.message = 'Everyone come and see how good I look!';
        });
    */

 app.controller('carouselController', ['$scope', '$http', '$filter','lodash','$window','$timeout','Upload',
  function($scope, $http , $filter, $window, lodash, $timeout, Upload) {
    $http.get('/carousel/get')
    .success(function(data, status, headers, config) {
        console.log("appjs success carousel")
        $scope.carousel = data ;
    }).error(function(data, status, headers, config) {
                                // $window.alert('vide');
                                $scope.carousel = [] ;
                            });



    $scope.saveCarousel = function(carousel) {
        return $http.post('carousel/put', carousel);
    };

     $scope.upload = function (file) {
        Upload.upload({
            url: 'https://indizolo.s3.amazonaws.com/data.jpg?AWSAccessKeyId=AKIAJPVMMSLWWJYCLDUA&Expires=1475662623&Signature=tiFkLhRw6xer%2BSZDr%2F%2B2n1g3tE0%3D&x-amz-grant-full-control=Me',
            data: {file: file },
            method: 'PUT',
            headers: {'Content-type':'img/jpg'}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };


   /* 
    $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
            $scope.upload($scope.file);
       }
    };
   */
   /*
   $scope.uploadPic = function(file) {
       file.upload = Upload.upload({
         url: 'https://indizobjects.cellar.services.clever-cloud.com/data2.jpg?AWSAccessKeyId=RCITZM0P-3E3TL7YURFD&Content-Type=img%2Fjpg&Expires=1475226292&Signature=HG%2FAbCZYsBDadlglPSCqLQuP9gU%3D',
         //data: {username: $scope.username, file: file},
         data: { file: file } ,
         method: 'PUT',
         headers: {'Content-type':'img/jpg'}
     });
   
   /*
       file.upload.then(function (response) {
         $timeout(
            function () { file.result = response.data; }
         );
        } , function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
         // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    

   } // fin uploadPic  
} */
   }]) // fin controller



 app.controller('bannersController', ['$scope', '$http', '$filter','lodash','$window',
  function($scope, $http , $filter, $window, lodash) {
    $http.get('/banners/get')
    .success(function(data, status, headers, config) {
        $scope.banners = data;
        console.log("appjs success banner",new Date)
    }).error(function(data, status, headers, config) {
                                //$window.alert('vide');
                                $scope.banners = [];
                            });

    $scope.saveBanner = function(banner) {
        return $http.post('banners/put', banner);
    };
}])

 app.controller('bandsController', ['$scope', '$http', '$filter','lodash','$window',
  function($scope, $http , $filter, $window, lodash) {

    $scope.poub = false ;
    $scope.member = false ;
    $scope.album = false ;

    $scope.change = function(){
        $scope.disabled = false ;
    }

    $scope.addMember = function(){  
        ($scope.currentBand.members).push({"name":"member", "instrument":"instrument" });
    }

    $scope.addAlbum = function(){
        ($scope.currentBand.albums).push({    
            "serial_id":0001,
            "type":"CD",
            "title":"title",
            "release_date":new Date,
            "price":6.00,
            "cover":"0000.jpg",
            "tracks":[{ "title":"title1", duration:30 }]
        }); 
    }   

    $http.get('/bands/get')
    .success(function(data, status, headers, config) {
        $scope.bands = data;
    }).error(function(data, status, headers, config) {
        $scope.bands = [];
    });

    $scope.setCurrentBand = function(band) {

        $scope.montreEdition = true ;
        $scope.tags = [];
        $scope.currentBand = band ; 
        _.map(  band.style  , function(o) { 
            $scope.tags.push( { "text":o } ) ;
        } ) ;

        $scope.poub = true ;
    }

    $scope.setCurrentMember = function(member) {
        $scope.member =true ;
        $scope.currentMember = member ;
    }

    $scope.setCurrentAlbum = function(album) {
        $scope.album =true ;
        $scope.currentAlbum = album ;
    }

    $scope.createBand = function() {
                        // création de données factices
                        var data = {    
                            "name":"zzz_groupe",
                            "city":"ville",
                            "abstract":"lorem",
                            "contact":"contact",
                            "weblink":"web",
                            "facebook":"facebook",
                            "twitter":"twitter",
                            "google":"google",
                            "style":[],
                            "members":[] ,
                            "albums":[],
                            "announce":""
                        }; 
                        

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

                    $scope.updateBand = function() {
                        $scope.disabled = true ;
                        // création de données factices
                        // var data = { "name":"nom du groupe","city":"ville","style":"punk" } ; 
                        $scope.currentBand.style = [] ; 
                        _.map($scope.tags,function(tag) {
                            console.log('MAP_TAG:',tag.text) ;
                            
                            ($scope.currentBand.style).push(tag.text);
                        });                   
                        

                        console.log("CURRENT:",$scope.currentBand )

                        var res = $http.post('/bands/put', $scope.currentBand);
                        res.success(function(data, status, headers, config) {
                         console.log(data);
                     });
                        res.error(function(data, status, headers, config) {
                            alert( "failure message: " + JSON.stringify({data: data}));
                        });
                    }


                    $scope.deleteBand = function() {
                        $scope.disabled = true ;                     
                        
                        var res = $http.post('/bands/delete', $scope.currentBand);
                        res.success(function(data, status, headers, config) { 
                            console.log("SUPPRESSION DE", $scope.currentBand);
                            $scope.bands = $filter('filter')($scope.bands, { _id: '!'+$scope.currentBand._id })
                        }) 
                        
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




 // create the module and name it App
 var app = angular.module('indizoloApp', ['ngRoute','ngTagsInput','ngLodash','xeditable','angucomplete']);

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
            })
            .when('/logout',{
                controller: 'logoutController'
            })
            .otherwise({
                    redirectTo: '/'
            });

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

    app.controller('logoutController',['$scope','$http',
    function($scope,$http) {
        $http.get('/logout');
        }
    ]);

    app.controller('carouselController', ['$scope', '$http', '$filter','lodash','$window','$timeout',
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

    $scope.addCarousel = function() {

        var data = { "image" : "http://imageshack.com/a/img921/1337/MoQOQp.png " , "title" : "texte" , "url" : "http" };

        var res = $http.post('/carousel/post', data);
                        res.success(function(data, status, headers, config) {
                            //console.log(data);
                            $scope.carousel.push(data) 
                            //$scope.message = data;
                        });
                        
                        res.error(function(data, status, headers, config) {
                            alert( "failure message: " + JSON.stringify({data: data}));
                        });    
    }


$scope.deleteCarousel = function(car) {
    console.log( "CAR_ID", car._id );
        var res = $http.post('/carousel/delete', { id: car._id } );
                        res.success(function(data, status, headers, config) {
                            
                            $scope.carousel = $filter('filter')($scope.carousel, { _id: '!'+car._id })
                            //$scope.message = data;
                        });
                        
                        res.error(function(data, status, headers, config) {
                            alert( "failure message: " + JSON.stringify({data: data}));
                        });    
    }
  
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

$scope.addBanner = function() {

        var data = { "flyer" : "http://imageshack.com/a/img923/9528/iBD1Ci.png" , "title" : "texte" , "date" : "01/01/2017", "abstract":"annonce" };

        var res = $http.post('/banners/post', data);
                        res.success(function(data, status, headers, config) {
                            //console.log(data);
                            $scope.banners.push(data) 
                            //$scope.message = data;
                        });
                        
                        res.error(function(data, status, headers, config) {
                            alert( "failure message: " + JSON.stringify({data: data}));
                        });    
    }
    


}])

 app.controller('bandsController', ['$scope', '$http', '$filter','lodash','$window',
  function($scope, $http , $filter, $window, lodash ) {

    $scope.poub   = false ;
    $scope.member = false ;
    $scope.album  = false ;



    $scope.addLink = function(id) {
            $scope.currentMember.autres_groupes.push(id)
    }

    $scope.deleteAg = function(id) {
            $scope.currentMember.autres_groupes = $scope.currentMember.autres_groupes.filter(function(el){ 
                    return ( el != id )
            })
            $scope.currentMember.affiche_autres_groupes = $scope.currentMember.affiche_autres_groupes.filter(function(el){ 
                    return ( el.id != id )
            })
    }

    $scope.change = function(){
        $scope.disabled = false ;
    }

    $scope.addMember = function(){  
        ($scope.currentBand.members).push({"name":"member", "instrument":"instrument","autres_groupes":[] });
    }

    $scope.deleteMember = function(id){
        //($scope.currentMember)
        console.log(id)
         $scope.currentBand.members = $filter('filter')($scope.currentBand.members, { _id: '!'+id })
         console.log($scope.currentBand.members)
    }

    $scope.deleteAlbum = function(id){
        //($scope.currentMember)
        //console.log(id)
         $scope.currentBand.albums = $filter('filter')($scope.currentBand.albums, { _id: '!'+id })
         //console.log($scope.currentBand.members)
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
        $scope.currentMember.affiche_autres_groupes = []
         _.map (member.autres_groupes,function(m) {
                var a_g = $http.get("/bands/getOne/"+m).success(function(data, status, headers, config) {
                    console.log("AG:",data);
                    $scope.currentMember.affiche_autres_groupes.push({"id":data._id,"name":data.name})
                })
        })
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
                            "abstract":"Ce groupe n'a pas (encore) de page IndiZolo. Il a été mentionné sur la page d'un autre groupe.",
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
                        // $scope.disabled = true ;
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






 // create the module and name it App
    var app = angular.module('bandApp', ['ngRoute','ngTagsInput','ngLodash','ngFileUpload']);

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
    

    app.controller('uploadController',['Upload','$scope','$window',function(Upload,$scope,$window){
        
    // application jquery pour décorer le type input=file (idéalement créer une directive)
    $(function() {
        $('input[type=file]').bootstrapFileInput();
    })


        $scope.submit = function(){ //function to call on form submit
         //   if ($scope.upload_form.file.$valid && $scope.file) { //check if from is valid
             if ( $scope.file) { //check if from is valid
                $scope.upload($scope.file); //call upload function
            }
        }
        
        $scope.upload = function (file) {
            Upload.upload({
                url: 'http://localhost:8080/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                    $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                } else {
                    $window.alert('an error occured');
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function (evt) { 
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };
    }]);


    app.controller('bandsController', ['$scope', '$http', '$filter','lodash','$window',
              function($scope, $http , $filter, $window, lodash) {

                $scope.poub = false ;
                $scope.member = false ;
                $scope.album = false ;

                    $scope.change = function(){
                        $scope.disabled = false ;
                    }

                    $scope.addMember = function(){
                        
                        ($scope.currentBand.members).push({"name":"member", "instrument":"guitar"});
                    }

                    $scope.addAlbum = function(){
                        $scope.album = true
                        ($scope.currentBand.albums).push({"serial_id":0000,
                                                             "title":"title",
                                                             "release_date":"",
                                                             "price":"6,00",
                                                             "cover":"0000.jpg",
                                                             "tracks":[{"title":"","duration":0.10}]
                                                         });
                    }


                    
                 
                    $http.get('/bands/get')
                            .success(function(data, status, headers, config) {
                                $scope.bands = data;
                            }).error(function(data, status, headers, config) {
                                $window.alert('vide');
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

                
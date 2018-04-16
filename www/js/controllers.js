angular.module('starter.controllers', ['ngResource'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

/**
.controller('ProductlistsCtrl', function($scope) {
  $scope.productlists = [
    { title: 'Product 1', id: 1 },
    { title: 'Product 2', id: 2 }
  ];
})
**/
.controller('ProductlistsCtrl', function($scope , $resource) {
	var theUrl='https://dev.loopspot.com/mymarkit-restapi/product/list';
	//var theUrl='http://localhost:8080/mymarkit-restapi/product/list';
	console.log('ProductlistsCtrl before REST call, theUrl='+theUrl);
	
	$scope.productlists= '[]';
	$scope.searchResultsJson = '';
	
	var productsResourceQuery=$resource(theUrl, {}, {
        query: {
            method: 'GET',
            params: {},
            isArray: false
        }
    });

	//execute query and log response
	productsResourceQuery.query(function(productListResponse){ //function for success
		console.log('ProductlistsCtrl after search --> success productListResponse='+productListResponse);
		$scope.searchResultsJson = productListResponse;  //full JSON response
		$scope.addresses=productListResponse; //array in JSON response
		$scope.showSearchResults=true;
		$scope.showJson=false;
	}, function(err){ //function for errors - address not found
		console.log('ProductlistsCtrl after search --> error err='+err);
		$scope.searchResultsJson = '{ "error": "No data found matching the input" }';
		$scope.showSearchResults=false;
		$scope.showJson=true;
	});
	
	
	
	// $scope.productlists = productsListResponse.productSummaryList; //used by productlists.html
	
})


// s3-image-uploader controller
.controller('UploadController', function ($scope){
  var imageUploader = new ImageUploader()
  $scope.file = {}
  $scope.upload = function() {
    imageUploader.push($scope.file, function(data){
      console.log('File uploaded Successfully', $scope.file, data)
      $scope.uploadUri = data.url
      $scope.$digest()
    })
  }
})

// directive for file - used with s3-image-uploader
.directive('file', function() {
  return {
    restrict: 'AE',
    scope: {
      file: '@'
    },
    link: function(scope, el, attrs){
      el.bind('change', function(event){
        var files = event.target.files
        var file = files[0]
        if(file.size>0){
          scope.file = file
          scope.$parent.file = file
        } else {
          scope.file = {}
          scope.$parent.file = {} 
        }
        scope.$apply()
      })
    }
  }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});



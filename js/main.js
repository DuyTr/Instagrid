(function(){
   var app = angular.module('instagrid',[]);
   app.controller('InstaCtrl',['$scope','$http',function($scope,$http){
     $scope.posts = [];
     $scope.loading = false;
     $scope.getPhotos = function(e){
       $scope.loading = true;
       var searchInput = "https://api.instagram.com/v1/tags/" + $scope.hashtag
                + "/media/recent?count=12&callback=JSON_CALLBACK&client_id=e7c23d1d42974762a329e5dfc09ff86f";
       $http.jsonp(searchInput)
                .then(function(response){
                    $scope.loading = false;
                    $scope.posts = response.data.data;


            }, function(){
                console.log('error');
            });
     };

   }]);
})();

(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunch = "";
  $scope.totalLunchs=0;

  $scope.checkLunchs = function(){
    console.log("aaaa"+typeof($scope.lunch)+"bbbb");
    if($scope.lunch==="") {
      $scope.totalLunchs=-1;
    } else {
      var lunchs = $scope.lunch.split(",");
      $scope.totalLunchs = lunchs.length;
      //console.log(lunchs);
    }
  }; 

  $scope.lunchMessage = function(){
    if($scope.totalLunchs==0){
      return "";
    } else if($scope.totalLunchs>0 && $scope.totalLunchs<=3){
      return "Enjoy!";
    } else if($scope.totalLunchs>3) {
      return "Too much!";
    } else {
      return "Please enter data first";
    }

    
  }

  $scope.lunchMessageClass = function(){
    if($scope.totalLunchs==-1) {
      return "message-red";
    } else {
      return "message-green";
    }
  }

  

}

})();

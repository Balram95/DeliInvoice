app.directive("customerDetails", function() {
  return {
    templateUrl: '/static/ngTemplates/directive/customerDetails.html',
    restrict: 'E',
    replace: true,
    scope: {
      data: '=',
    },
    controller: ["$scope", "$element", "$http",
      function($scope, $element, $http) {
        $scope.currentUser=$scope.data;

        var url='/api/entryclients/?clientId=' + $scope.data.id
        if($scope.data.is_receiver){
          url='/api/entrycustomers/?customerId=' + $scope.data.id
        }
        $http({
         method: 'GET',
         url: url,
        }).then(function(response){
          console.log(response.data);
          $scope.entries=response.data
        })

        $scope.form={
          date:new Date()
        }

        getTotalAmount($scope.currentUser)

        function getTotalAmount(p,month){
          let url='/api/getTotalAmount/?client&pk='+p.id
          if(p.is_receiver){
            url='/api/getTotalAmount/?customer&pk='+p.id
          }
          $http.get(url).
          then(function(response) {
            console.log(response.data);
            $scope.totalAmount=response.data.totalAmount
          })
        }








      }
    ]
  };
});

app.directive("customerEntry", function() {
  return {
    templateUrl: '/static/ngTemplates/directive/customerEntry.html',
    restrict: 'E',
    replace: true,
    scope: {
      data: '=',
      milks:'=',
    },
    controller: ["$scope", "$element", "$http",
      function($scope, $element, $http) {
        $scope.currentUser=$scope.data;
        $scope.form={
          name:$scope.data.name,
          amount:'',
          date:new Date(),
          milk:{
            id:null
          }
        }

        if($scope.milks){
          $scope.form.milk.id=$scope.milks[0].id
        }

        const today = new Date();
        const yesterday = new Date(today.setDate(today.getDate() - 1))

        $scope.fetchYesterdayQuery = function(id,date,isCustomer) {
          var url='/api/entrycustomers/?customerId=' + id+'&date='+date.toJSON().split('T')[0]
          if(!isCustomer){
            url='/api/entryclients/?clientId=' + id+'&date='+date.toJSON().split('T')[0]
          }
          return $http.get(url).
          then(function(response) {
            console.log(response.data);
            if(response.data.length>0){
              $scope.form.amount=response.data[0].amount
            }
          })
        };

        $scope.fetchYesterdayQuery($scope.data.id,yesterday,$scope.data.is_receiver)

        $scope.sendQuery=function(){
          const toSend={
            customer:$scope.data.id,
            milk:$scope.form.milk.id,
            amount:$scope.form.amount,
          }
          var url='/api/entryclients/'
          if($scope.data.is_receiver){
            url='/api/entrycustomers/'
          }
          $http({
          method: 'POST',
          url: url,
          data : toSend,
          }).
          then(function(response) {
            console.log(response.data);
            $scope.form={
              name:$scope.data.name,
              amount:'',
              date:new Date(),
              milk:{
                id:$scope.milks[0].id
              }
            }
          }, function(err) {
            console.log(err.data.detail);
          });
        }




      }
    ]
  };
});

var app = angular.module('app', ['ui.router','ui.bootstrap']);

app.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.withCredentials = true;

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/static/ngTemplates/entries.home.html',
            controller:'entries.home'
        })

        .state('customers', {
            url: '/customers',
            templateUrl: '/static/ngTemplates/entries.customers.html',
            controller:'entries.customers'
        })

        .state('addEdit', {
            url: '/add',
            templateUrl: '/static/ngTemplates/entries.addNew.html',
            controller:'entries.add'
        })

        .state('addEdit.newMilkReceive', {
            url: '/add',
            templateUrl: '/static/ngTemplates/entries.addNew.newmilkreceive.html',
            controller:'entries.add.newMilkReceive'
        })
        .state('addEdit.newMilk', {
            url: '/add',
            templateUrl: '/static/ngTemplates/entries.addNew.newmilk.html',
            controller:'entries.add.newMilk'
        })
        .state('addEdit.newCustomer', {
            url: '/add',
            templateUrl: '/static/ngTemplates/entries.addNew.newcustomer.html',
            controller:'entries.add.newCustomer'
        })



});

app.controller('main',['$scope','$http',function($scope,$http){

  $scope.topBar = '/static/ngTemplates/topBar.html'

}])




app.controller('entries.home',['$scope','$http','$timeout',function($scope,$http,$timeout){

  $http({
   method: 'GET',
   url: '/api/customers/',
  }).then(function(response){
    console.log(response.data)
    $scope.customers=response.data;
    $scope.currentQuery=$scope.customers[0]
    $scope.active=$scope.currentQuery.id
  })

  $scope.isTrue=false;

  $http({
   method: 'GET',
   url: '/api/milk/',
  }).then(function(response){
    console.log(response.data)
    $scope.milks=response.data;
    $scope.isTrue=true
  })

  $http({
   method: 'GET',
   url: '/api/milkreceive/',
  }).then(function(response){
    console.log(response.data)
    $scope.milkReceive=response.data;
    $scope.isTrue=true
  })
  $scope.sideMenu = '/static/ngTemplates/entries.sideMenu.html'

  $scope.setCurrentQuery=function(customer){
    $scope.isTrue=false
    $scope.currentQuery=customer
    $scope.active=customer.id
    $timeout(function() {
        $scope.isTrue=true
    },0);
  }

  $scope.onlyCustomers=true
  $scope.type='Check Clients'

  $scope.setType=function(type){
    $scope.onlyCustomers=!$scope.onlyCustomers
    if($scope.onlyCustomers){
      $scope.type='Check Clients'
    }else{
      $scope.type='Check Customers'
    }
  }

  // function setForumData(object){
  //   // $scope.newForm.name=$scope.customers[0].name,
  //   $scope.newForm.milk.type=$scope.customers[0].name,
  //
  // }

 //  $scope.$watch('newForm.name', function(value) {
 //    if(typeof value='object')
 //    console.log(value);
 // });

  // $scope.customerSearch = function(query) {
  //   return $http.get('/api/customers/?name__contains=' + query).
  //   then(function(response) {
  //     return response.data;
  //   })
  // };

}])





app.controller('entries.customers',['$scope','$http','$timeout',function($scope,$http,$timeout){

  $http({
   method: 'GET',
   url: '/api/customers/',
  }).then(function(response){
    console.log(response.data)
    $scope.customers=response.data
    $scope.currentQuery=$scope.customers[0]
    $scope.active=$scope.currentQuery.id
    $scope.isTrue=true
  })

  $scope.sideMenu = '/static/ngTemplates/entries.sideMenu.html'



  $scope.setCurrentQuery=function(customer){
    $scope.isTrue=false
    $scope.active=customer.id
    $scope.currentQuery=customer
    $timeout(function() {
        $scope.isTrue=true
    },0);
  }

  $scope.onlyCustomers=true
  $scope.type='Check Clients'

  $scope.setType=function(type){
    $scope.onlyCustomers=!$scope.onlyCustomers
    if($scope.onlyCustomers){
      $scope.type='Check Clients'
    }else{
      $scope.type='Check Customers'
    }
  }
}])






app.controller('entries.add',['$scope','$http','$timeout',function($scope,$http,$timeout){

$scope.selectedClick=1;
$scope.setSelected=function(i){
  $scope.selectedClick=i
}

}])
app.controller('entries.add.newMilk',['$scope','$http','$timeout',function($scope,$http,$timeout){
  $scope.newForm={
    name:'',
    price:'',
  }
  $scope.editForm={
    name:'',
    price:'',
  }

  $scope.addNewMilk=function(){
    console.log($scope.newForm);
    if($scope.newForm.price){

      $http({
      method: 'POST',
      url: 'api/milk/',
      data : $scope.newForm,
      }).
      then(function(response) {
        console.log(response.data);
      }, function(err) {
        console.log(err.data.detail);
      });
    }
  }

  $scope.activeTab=1
  $scope.setTab=function(i){
    $scope.activeTab=i
  }

  $scope.editMilk=function(){
    console.log($scope.editForm);
    if($scope.editForm.price){
      $http({
      method: 'PATCH',
      url: 'api/milk/',
      data : $scope.editForm,
      }).
      then(function(response) {
        console.log(response.data);
      }, function(err) {
        console.log(err.data.detail);
      });
    }
  }

  // $scope.newCustomer = '/static/ngTemplates/entries.addNew.newcustomer.html'

  $scope.onSelect=function(value){
    console.log(value);
    $scope.editForm={
      name:value.name,
      price:value.price,

    }
    console.log($scope.editForm);
  }

  $scope.milkSearch = function(query) {
    return $http.get('/api/milk/?name__contains=' + query).
    then(function(response){
      console.log(response.data);
      return response.data.filter((data)=>data.name.includes($scope.editForm.name));
    })
  };

}])



app.controller('entries.add.newMilkReceive',['$scope','$http','$timeout',function($scope,$http,$timeout){

  $scope.newForm={
    name:'',
    price:'',
  }
  $scope.editForm={
    name:'',
    price:'',

  }

  $scope.addNewMilkReceive=function(){
    console.log($scope.newForm);
    if($scope.newForm.price){

      $http({
      method: 'POST',
      url: 'api/milkreceive/',
      data : $scope.newForm,
      }).
      then(function(response) {
        console.log(response.data);
      }, function(err) {
        console.log(err.data.detail);
      });
    }
  }

  $scope.activeTab=1
  $scope.setTab=function(i){
    $scope.activeTab=i
  }

  $scope.editMilkReceive=function(){
    console.log($scope.editForm);
    if($scope.editForm.price){
      $http({
      method: 'POST',
      url: 'api/milkreceive/',
      data : $scope.editForm,
      }).
      then(function(response) {
        console.log(response.data);
      }, function(err) {
        console.log(err.data.detail);
      });
    }
  }

  $scope.onSelect=function(value){
    console.log(value);
    $scope.editForm={
      name:value.name,
      price:value.price,

    }
    console.log($scope.editForm);
  }

  $scope.milkReceiveSearch = function(query) {
    return $http.get('/api/milkreceive/?name__contains=' + query).
    then(function(response){
      console.log(response.data);
      return response.data.filter((data)=>data.name.includes($scope.editForm.name));
    })
  };

}])



app.controller('entries.add.newCustomer',['$scope','$http','$timeout',function($scope,$http,$timeout){
  $scope.newForm={
    name:'',
    phoneNumber:'',
    street:'',
    city:'Sri Ganganagar',
    state:'Rajasthan',
    is_receiver:false,
    client:null
  }
  $scope.editForm={
    name:'',
    phoneNumber:'',
    street:'',
    city:'',
    state:'',
    is_receiver:false,
    client:null
  }

  $scope.addNewCustomer=function(){
    console.log($scope.newForm);
    if($scope.newForm.client){
      $scope.newForm.client=$scope.newForm.client.id
      $http({
      method: 'POST',
      url: 'api/customers/',
      data : $scope.newForm,
      }).
      then(function(response) {
        console.log(response.data);
      }, function(err) {
        console.log(err.data.detail);
      });
    }
  }

  $scope.activeTab=1
  $scope.setTab=function(i){
    $scope.activeTab=i
  }

  $scope.editCustomer=function(){
    console.log($scope.editForm);
    if($scope.editForm.client){
      $scope.editForm.client=$scope.editForm.client.id
      $http({
      method: 'POST',
      url: 'api/customers/',
      data : $scope.editForm,
      }).
      then(function(response) {
        console.log(response.data);
      }, function(err) {
        console.log(err.data.detail);
      });
    }
  }

  // $scope.newCustomer = '/static/ngTemplates/entries.addNew.newcustomer.html'

  $scope.onSelect=function(value){
    console.log(value);
    $scope.editForm={
      name:value.name,
      phoneNumber:value.phoneNumber,
      street:value.street,
      city:value.city,
      state:value.state,
      is_receiver:value.is_receiver,
      client:value.client
    }
    console.log($scope.editForm);
  }

  $scope.customerSearch = function(query) {
    return $http.get('/api/customers/?name__contains=' + query).
    then(function(response){
      console.log(response.data);
      return response.data.filter((data)=>data.name.includes($scope.editForm.name));
    })
  };
  // $scope.userNewSearch = function(query) {
  //   return $http.get('/api/users/?name__contains=' + query).
  //   then(function(response){
  //     console.log(response.data);
  //     return response.data.filter((data)=>data.username.includes($scope.newForm.client));
  //   })
  // };
  $scope.userSearch = function(query ,form) {
    return $http.get('/api/users/?name__contains=' + query).
    then(function(response){
      console.log(response.data);
      return response.data.filter((data)=>data.username.includes(form.client));
    })
  };


}])

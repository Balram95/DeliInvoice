app.filter('getMilkPrice' , function($http){
  return function(input){
    var httpRequest = new XMLHttpRequest()
    httpRequest.open('GET', '/api/milk/?id=' + input , false);
    httpRequest.send(null);
    if (httpRequest.status == 200) { // successfully
      user = JSON.parse(httpRequest.responseText);
      return user[0].price
    }
  }
})

app.filter('getMilkReceivePrice' , function($http){
  return function(input){
    var httpRequest = new XMLHttpRequest()
    httpRequest.open('GET', '/api/milkreceive/?id=' + input , false);
    httpRequest.send(null);
    if (httpRequest.status == 200) { // successfully
      user = JSON.parse(httpRequest.responseText);
      return user[0].price
    }
  }
})

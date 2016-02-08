// app.js
angular.module('weatherApp', [])
  .directive('currentWeather', currentWeather);

function currentWeather() {
  var directive = {
    restrict: 'E',
    scope: {
      city: '@'
    },
    template: '<div class="current-weather"><h4>Weather for {{city}}</h4>{{wCtrl.weather.main.temp}}</div>',
    // templateUrl: 'templates/currentWeatherTemplate.html',
    // transclude: true,
    controller: weatherController,
    controllerAs: 'wCtrl',
    link: function (scope, element, attributes, controller) {
      scope.wCtrl.getWeather(attributes.city);
    }
  };

  return directive;
}

weatherController.$inject = ['$http'];
function weatherController($http) {
  var vm = this;
  var url = "http://api.openweathermap.org/data/2.5/weather?mode=json&cnt=7&units=imperial&callback=JSON_CALLBACK&q=";
  // ask Justin for an API key or go to openweathermap.org to acquire your own!
  var apiKey = "&appid=xxxxxxxxxxxxxx";
  vm.getWeather = getWeather;

  function getWeather(city) {
    $http({ method: 'JSONP', url: url + city + apiKey })
      .success(function(data) {
        vm.weather = data;
      });
  }
}

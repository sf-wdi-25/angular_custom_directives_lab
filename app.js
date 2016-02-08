// app.js
angular.module('weatherApp', [])
  .directive('currentWeather', currentWeather);

function currentWeather() {
  vm = this;
  return {
    restrict: 'E',
    scope: {
      city: '@'
    },
    template: '<div class="current-weather"><h4>Weather for {{city}}</h4>{{weather.main.temp}}</div>',
    // templateUrl: 'templates/currentWeatherTemplate.html',
    // transclude: true,
    controller: ['$scope', '$http',
      function (vm, $http) {
        var url = "http://api.openweathermap.org/data/2.5/weather?mode=json&cnt=7&units=imperial&callback=JSON_CALLBACK&q=";
        // ask Justin for an API key or go to openweathermap.org to acquire your own!
        var apiKey = "&APPID=0d6ff01ce151dad29810a492dea78b0f"

        vm.getWeather = function(city) {
          $http({ method: 'JSONP', url: url + city + apiKey })
            .success(function(data) {
              vm.weather = data;
            });
        }
    }],
    link: function (vm, element, attrs) {
      vm.weather = vm.getWeather(attrs.city);
    }
  }
};

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
        // Go to openweathermap.org to acquire your own API!
        var apiKey = "&APPID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

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

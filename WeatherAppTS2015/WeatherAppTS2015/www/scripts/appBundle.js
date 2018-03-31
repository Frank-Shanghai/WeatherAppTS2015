// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var WeatherAppTS2015;
(function (WeatherAppTS2015) {
    "use strict";
    var Application;
    (function (Application) {
        function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }
        Application.initialize = initialize;
        function onDeviceReady() {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            $('#get-weather-btn').click(WeatherAppTS2015.Weather.instance.getWeatherWithZipCode);
        }
        function onPause() {
            // TODO: This application has been suspended. Save application state here.
        }
        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
        }
    })(Application = WeatherAppTS2015.Application || (WeatherAppTS2015.Application = {}));
    window.onload = function () {
        Application.initialize();
    };
})(WeatherAppTS2015 || (WeatherAppTS2015 = {}));
var WeatherAppTS2015;
(function (WeatherAppTS2015) {
    var OpenWeatherAppKey = "e5a5b82f4ad41f1978ed64d3e580efbd";
    var Weather = (function () {
        function Weather() {
            this.showWeatherData = function (results) {
                if (results.weather.length) {
                    $('#error-msg').hide();
                    $('#weather-data').show();
                    $('#title').text(results.name);
                    $('#temperature').text(results.main.temp);
                    $('#wind').text(results.wind.speed);
                    $('#humidity').text(results.main.humidity);
                    $('#visibility').text(results.weather[0].main);
                    var sunriseDate = new Date(results.sys.sunrise * 1000);
                    $('#sunrise').text(sunriseDate.toLocaleTimeString());
                    var sunsetDate = new Date(results.sys.sunset * 1000);
                    $('#sunset').text(sunsetDate.toLocaleTimeString());
                }
                else {
                    $('#weather-data').hide();
                    $('#error-msg').show();
                    $('#error-msg').text("Error retrieving data. ");
                }
            };
        }
        Object.defineProperty(Weather, "instance", {
            get: function () {
                if (Weather._instance == null)
                    Weather._instance = new Weather();
                return Weather._instance;
            },
            enumerable: true,
            configurable: true
        });
        //#endregion
        Weather.prototype.getWeatherWithZipCode = function () {
            var zipcode = $('#zip-code-input').val();
            var queryString = 'http://api.openweathermap.org/data/2.5/weather?zip='
                + zipcode + ',us&appid=' + OpenWeatherAppKey + '&units=imperial';
            $.getJSON(queryString, function (results) {
                Weather.instance.showWeatherData(results);
            }).fail(function (jqXHR) {
                $('#error-msg').show();
                $('#error-msg').text("Error retrieving data. " + jqXHR.statusText);
            });
            return false;
        };
        return Weather;
    }());
    WeatherAppTS2015.Weather = Weather;
})(WeatherAppTS2015 || (WeatherAppTS2015 = {}));
//# sourceMappingURL=appBundle.js.map
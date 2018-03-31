module WeatherAppTS2015 {
    var OpenWeatherAppKey = "e5a5b82f4ad41f1978ed64d3e580efbd";
    export class Weather {     

        //#region instance
        private static _instance: Weather;

        public static get instance(): Weather {
            if (Weather._instance == null)
                Weather._instance = new Weather();
            return Weather._instance;
        }
        //#endregion

        public getWeatherWithZipCode() {
            var zipcode = $('#zip-code-input').val();
            var queryString =
                'http://api.openweathermap.org/data/2.5/weather?zip='
                + zipcode + ',us&appid=' + OpenWeatherAppKey + '&units=imperial';
            $.getJSON(queryString, function (results) {
                Weather.instance.showWeatherData(results);
            }).fail(function (jqXHR) {
                $('#error-msg').show();
                $('#error-msg').text("Error retrieving data. " + jqXHR.statusText);
            });
            return false;
        }

        private showWeatherData = (results: any) => {
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

            } else {
                $('#weather-data').hide();
                $('#error-msg').show();
                $('#error-msg').text("Error retrieving data. ");
            }
        }
    }
}
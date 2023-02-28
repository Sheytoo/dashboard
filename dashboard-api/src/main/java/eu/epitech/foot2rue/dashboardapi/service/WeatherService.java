package eu.epitech.foot2rue.dashboardapi.service;

import eu.epitech.foot2rue.dashboardapi.dto.weather.CurrentWeatherDto;
import eu.epitech.foot2rue.dashboardapi.dto.weather.ForecastWeatherDto;

import java.util.List;

public interface WeatherService {

    CurrentWeatherDto getCurrentWeather(String city);

    List<ForecastWeatherDto> getForecastWeather(String city);

}

package eu.epitech.foot2rue.dashboardapi.controller;

import eu.epitech.foot2rue.dashboardapi.dto.weather.CurrentWeatherDto;
import eu.epitech.foot2rue.dashboardapi.dto.weather.ForecastWeatherDto;
import eu.epitech.foot2rue.dashboardapi.service.WeatherService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/weather")
@Api(tags = {"Weather"})
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    @GetMapping("/current")
    @ApiOperation("Get current weather for a city")
    public CurrentWeatherDto getCurrentWeather(@RequestParam String city) {
        return weatherService.getCurrentWeather(city);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    @GetMapping("/forecast")
    @ApiOperation("Get forecast weather for a city")
    public List<ForecastWeatherDto> getForecastWeather(@RequestParam String city) {
        return weatherService.getForecastWeather(city);
    }
}

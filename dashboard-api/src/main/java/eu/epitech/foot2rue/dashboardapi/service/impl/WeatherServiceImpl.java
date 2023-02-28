package eu.epitech.foot2rue.dashboardapi.service.impl;

import eu.epitech.foot2rue.dashboardapi.dto.weather.CurrentWeatherDto;
import eu.epitech.foot2rue.dashboardapi.dto.weather.ForecastWeatherDto;
import eu.epitech.foot2rue.dashboardapi.service.WeatherService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WeatherServiceImpl implements WeatherService {

    @Value("${openweathermap.api.key}")
    private String apiKey;

    @Override
    public CurrentWeatherDto getCurrentWeather(String city) {
        final String url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);
        JSONObject json = new JSONObject(result);
        CurrentWeatherDto currentWeatherDto = new CurrentWeatherDto();
        currentWeatherDto.setIcon(json.getJSONArray("weather").getJSONObject(0).getString("icon"));
        currentWeatherDto.setTemp(json.getJSONObject("main").getDouble("temp"));
        if (json.has("rain")) {
            currentWeatherDto.setRain(json.getJSONObject("rain").getDouble("1h"));
        } else {
            currentWeatherDto.setRain(0.0);
        }
        currentWeatherDto.setHumidity(json.getJSONObject("main").getInt("humidity"));
        currentWeatherDto.setWindSpeed(json.getJSONObject("wind").getDouble("speed"));
        return currentWeatherDto;
    }

    @Override
    public List<ForecastWeatherDto> getForecastWeather(String city) {
        final String url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=metric";
        String result = new RestTemplate().getForObject(url, String.class);
        JSONObject json = new JSONObject(result);
        List<ForecastWeatherDto> forecastWeatherList = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            ForecastWeatherDto forecastWeatherDto = new ForecastWeatherDto();
            forecastWeatherDto.setIcon(json.getJSONArray("list").getJSONObject(i).getJSONArray("weather").getJSONObject(0).getString("icon"));
            forecastWeatherDto.setTemp(json.getJSONArray("list").getJSONObject(i).getJSONObject("main").getDouble("temp"));
            forecastWeatherDto.setDate(json.getJSONArray("list").getJSONObject(i).getString("dt_txt"));
            forecastWeatherList.add(forecastWeatherDto);
        }
        return forecastWeatherList;
    }
}

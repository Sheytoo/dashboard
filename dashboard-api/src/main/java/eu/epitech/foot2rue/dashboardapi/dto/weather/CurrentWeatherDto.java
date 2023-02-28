package eu.epitech.foot2rue.dashboardapi.dto.weather;

import lombok.Data;

@Data
public class CurrentWeatherDto {

    private String icon;
    private Double temp;
    private Double rain;
    private Integer humidity;
    private Double windSpeed;
}

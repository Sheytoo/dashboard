package eu.epitech.foot2rue.dashboardapi.dto.weather;

import lombok.Data;

@Data
public class ForecastWeatherDto {

    private String icon;
    private Double temp;
    private String date;
}
